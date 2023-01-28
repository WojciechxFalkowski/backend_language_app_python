import { View, Text, StyleSheet } from 'react-native'
import * as React from 'react'
import { ChooseCorrect } from '../../components/game/modes/ChooseCorrect'
import { FinishView } from './../../components/game/FinishView'
import { AuthContext } from '../../context/AuthContext'
import { BACKEND_URL } from '@env'
import { useFocusEffect } from '@react-navigation/core'

export function PlayScreen ({ route, navigation }) {
  /* Get the param */
  const { setId } = route.params;

  const LEVELS = 'levels'
  const [set, setSet] = React.useState(null)
  const { userToken } = React.useContext(AuthContext)

  const [questionCounter, setQuestionCounter] = React.useState(0)
  const [answerModel, setAnswerModel] = React.useState(null)
  const [isSetFinished, setIsSetFinished] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [settings, setSettings] = React.useState([])
  const [activeLevel, setActiveLevel] = React.useState([])
  const [activeLevels, setActiveLevels] = React.useState([])

  const [points, setPoints] = React.useState({
    positive: 0,
    negative: 0
  })

  const [counter, setCounter] = React.useState({
    activeTimerId: null,
    activeSeconds: 0
  })

  useFocusEffect(React.useCallback(() => {
    fetchSet()
    fetchSettings()
    return () => {
    }
  }, []))

  const fetchSettings = async () => {
    setIsLoading(true)
    fetch(`${BACKEND_URL}/settings`, {
      headers: {
        Authorization: userToken
      }
    })
      .then((res) => res.json()).then((settings) => {
      saveSettings(settings)
    })
      .catch((e) => {
        console.log('error')
        console.log(e)
      }).finally(() => {
      setIsLoading(false)
    })
  }

  const fetchSet = () => {
    fetch(`${BACKEND_URL}/set/${setId}`, {
      headers: {
        Authorization: userToken
      }
    })
      .then((res) => res.json()).then((resSet) => {
      setSet(resSet)
      setAnswerModel(resSet.terms[Math.floor(Math.random() * resSet.terms.length)])
    })
      .catch((e) => {
        console.log('error')
        console.log(e)
      })
  }

  const saveSettings = (settings) => {
    if (!settings || !Array.isArray(settings)) {
      return
    }

    settings.forEach(setting => {
      setting.options.sort((a, b) => a.id > b.id)
    })
    setSettings(settings)
    //Set active modes
    const levelsSetting = settings.find(setting => setting.label === LEVELS)
    if (!levelsSetting) {
      return
    }
    console.log('levelsSetting')
    console.log(levelsSetting)

    const activeLevels = levelsSetting.options.filter(level => level.is_selected)
    setActiveLevels(activeLevels)
    changeActiveLevel(activeLevels)
    // console.log('settings')
    // console.log(settings)
  }

  React.useEffect(() => {
    resetTimer()
  }, [])

  const resetTimer = () => {
    setCounter({
      activeTimerId: null,
      activeSeconds: 0
    })
    startActivityTimer();
  };

  const startActivityTimer = () => {
    if (!counter.activeTimerId) {
      const intervalId = setInterval(() => {
        setCounter(prevState => ({
          activeTimerId: prevState.activeTimerId ? prevState.activeTimerId : intervalId,
          activeSeconds: prevState.activeSeconds + 1
        }))
      }, 1000)
    }
  };

  const stopTimer = () => {
    if (counter.activeTimerId) {
      clearInterval(counter.activeTimerId);
      setCounter(prevState => ({ ...prevState, activeTimerId: null }))
    }
  };

  const changeActiveLevel = (activeLevels) => {
    const randomIndex = Math.floor(Math.random() * activeLevels.length)
    const activeLevel = activeLevels[randomIndex]
    setActiveLevel(activeLevel)
    // TODO -> ustawić poziom na podstawiwe aktywnego level'u
  }

  const nextQuestion = () => {
    if (questionCounter === set.terms.length - 1) {
      setIsSetFinished(true)
      stopTimer()
      return
    }

    changeActiveLevel(activeLevels)

    setQuestionCounter(value => value + 1)
    setAnswerModel(set.terms[Math.floor(Math.random() * set.terms.length)])
  }

  const setPositivePoints = () => {
    setPoints(prevState => ({
      ...prevState,
      positive: prevState.positive + 1
    }))
    updateTerm(1, 0)
  }

  const updateTerm = (positivePoints, negativePoints) => {
    const termId = set.terms[questionCounter].id
    const term = set.terms.find(term => term.id === termId)

    if (!term) {
      return
    }

    fetch(`${BACKEND_URL}/term`, {
      method: 'PUT', headers: {
        'Content-Type': 'application/json', Authorization: userToken
      }, body: JSON.stringify({
        'set_id': set.id,
        'id': termId,
        'question': term.question,
        'answer': term.answer,
        'positive_points': term.positive_points + positivePoints,
        'negative_points': term.negative_points + negativePoints
      })
    })
      .then((res) => res.json()).then((res) => {
      // console.log('res')
      // console.log(res)
    })
      .catch((e) => {
        console.log('ee')
        console.log(e)
      })
  }

  const setNegativePoints = () => {
    setPoints((prevState) => ({
      ...prevState,
      negative: prevState.negative + 1
    }))

    updateTerm(0, 1)
  }

  const setPointsValue = (isAnswerCorrect) => {
    if (isAnswerCorrect) {
      setPositivePoints()
    } else {
      setNegativePoints()
    }
  }

  const resetGame = () => {
    setPoints({ negative: 0, positive: 0 })
    setQuestionCounter(0)
    // setAnswerModel(set.terms[Math.floor(Math.random() * set.terms.length)])
    setIsSetFinished(false)
    resetTimer()
  }

  const playAgain = async () => {
    fetchSet()
    // .then(() => {
    resetGame()
    // })
  }

  return (
    <View style={styles.container}>
      {isSetFinished ? <FinishView activeSeconds={counter.activeSeconds} playAgain={playAgain}
                                   positivePoints={points.positive} negativePoints={points.negative}
                                   navigation={navigation} /> :
        <View style={styles.gameContainer}>
          <View style={styles.pointsContainer}>
            <Text style={styles.points}>{points.positive}</Text>
          </View>

          <View style={styles.modeContainer}>
            {set && answerModel &&
              <ChooseCorrect setPointsValue={setPointsValue} set={set} activeQuestion={set.terms[questionCounter]}
                             answerModel={answerModel} nextQuestion={nextQuestion} />}
          </View>

          {set && <View style={styles.questionLengthContainer}>
            <Text>{questionCounter + 1} / {set.terms.length}</Text>
          </View>}
        </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  pointsContainer: {
    height: '10%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingHorizontal: 16
  },
  questionLengthContainer: {
    height: '5%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameContainer: {
    height: '85%'
  },
  modeContainer: {
    padding: 16
  }
})
