import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { EditableTermList } from '../../components/game/EditableTermList'
import * as React from 'react'
import { AuthContext } from '../../context/AuthContext'
import { BACKEND_URL } from '@env'
import { useFocusEffect } from '@react-navigation/core'
import { Button } from '../../components/Button'

export function SetScreen ({ route, navigation }) {
  const { userToken } = React.useContext(AuthContext)
  /* Get the param */
  const { setId } = route.params;
  const [isLoading, setIsLoading] = React.useState(false)
  const [set, setSet] = React.useState(null)

  useFocusEffect(React.useCallback(() => {
    fetchSet()
    return () => {
    }
  }, []))

  const [isModeAddNewTerm, setModeAddNewTerm] = React.useState(false)

  const fetchSet = () => {
    setIsLoading(true)
    fetch(`${BACKEND_URL}/set/${setId}`, {
      headers: {
        Authorization: userToken
      }
    })
      .then((res) => res.json()).then((res) => {
      setSet(res)
    })
      .finally(() => {
        setIsLoading(false)
      })
      .catch(e => {
        console.log('error')
        console.log(e)
      })
  }

  const playSet = () => {
    if (!set.terms || !set.terms.length) {
      return
    }

    navigation.push('Learn', { setId: set.id })
  }

  const deleteTerm = (termId) => {
    setIsLoading(true)
    fetch(`${BACKEND_URL}/term`, {
      method: 'DELETE', headers: {
        'Content-Type': 'application/json', Authorization: userToken
      }, body: JSON.stringify({
        'set_id': set.id, 'id': termId
      })
    })
      .then((res) => res.json()).then((res) => {
      fetchSet()
      // console.log('res')
      // console.log(res)
      // setSets(res)
    })
      .finally(() => {
        setIsLoading(false)
      })
      .catch((e) => {
        console.log('ee')
        console.log(e)
      })
  }

  const addTerm = (termId, termQuestion, termAnswer) => {
    setIsLoading(true)
    fetch(`${BACKEND_URL}/term`, {
      method: 'POST', headers: {
        'Content-Type': 'application/json', Authorization: userToken
      }, body: JSON.stringify({
        'set_id': set.id, 'question': termQuestion, 'answer': termAnswer, 'positive_points': 0, 'negative_points': 0
      })
    })
      .then((res) => res.json()).then((res) => {
      fetchSet()
      // console.log('res')
      // console.log(res)
      // setSets(res)
    })
      .finally(() => {
        setIsLoading(false)
      })
      .catch((e) => {
        console.log('ee')
        console.log(e)
      })
    setModeAddNewTerm(false)
  }

  const updateTerm = async (termId, termQuestion, termAnswer) => {
    const term = set.terms.find(term => term.id = termId)

    if (!term) {
      return
    }

    setIsLoading(true)
    await fetch(`${BACKEND_URL}/term`, {
      method: 'PUT', headers: {
        'Content-Type': 'application/json', Authorization: userToken
      }, body: JSON.stringify({
        'set_id': set.id,
        'id': termId,
        'question': termQuestion,
        'answer': termAnswer,
        'positive_points': term.positive_points,
        'negative_points': term.negative_points
      })
    })
      .then((res) => res.json()).then((res) => {
        fetchSet()
        // console.log('res')
        // console.log(res)
        // setSets(res)
      })
      .finally(() => {
        setIsLoading(false)
      })
      .catch((e) => {
        console.log('ee')
        console.log(e)
      })
  }

  const setAddTermMode = () => {
    setModeAddNewTerm(true)
  }

  const deleteAddedTerm = () => {
    setModeAddNewTerm(false)
  }

  return (<View style={styles.screenContainer}>
    <View style={styles.editableTermListContainer}>
      {isLoading ? <View style={styles.activityIndicatorWrapper}><ActivityIndicator size="large" color="#000" /></View>
        : set && set.terms && <EditableTermList set={set} deleteTerm={deleteTerm} addTerm={addTerm}
                                                updateTerm={updateTerm}
                                                setAddTermMode={setAddTermMode} isModeAddNewTerm={isModeAddNewTerm}
                                                deleteAddedTerm={deleteAddedTerm} />}
      {/* <Text>setId: {set.id}</Text> */}
    </View>

    <View style={styles.buttonWrapper}>
      <Button
        style={styles.playButton}
        onPress={playSet}
        color="#000">
        <Text>Graj</Text>
      </Button>
    </View>
  </View>)
}

const styles = StyleSheet.create({
  screenContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  editableTermListContainer: {
    height: '90%'
  },
  activityIndicatorWrapper: {
    marginTop: 32
  },
  buttonWrapper: {
    marginHorizontal: 16
  },
  playButton: {
    height: 40,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: '#fff'
  }
})
