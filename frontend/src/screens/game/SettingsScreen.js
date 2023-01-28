import { View, Text, StyleSheet } from 'react-native'
import Checkbox from '../../components/Checkbox'
import Toggle from '../../components/Toggle'
import { useFocusEffect } from '@react-navigation/core'
import * as React from 'react'
import { AuthContext } from '../../context/AuthContext'
import { BACKEND_URL } from '@env'
import { Loader } from '../../components/Loader'

// const levels = [
//   {
//     id: 0,
//     label: 'prawda / fałsz',
//     isSelected: true
//   },
//   {
//     id: 1,
//     label: 'A / B / C / D',
//     isSelected: false
//   },
//   {
//     id: 2,
//     label: 'wpisz tekst',
//     isSelected: true
//   }
// ]

const response = [
  {
    'id': 0,
    'label': 'levels',
    'options': [
      {
        'id': 0,
        'label': 'prawda / fałsz',
        'is_selected': 1,
        'setting_id': 0
      },
      {
        'id': 1,
        'label': 'A / B / C / D',
        'is_selected': 1,
        'setting_id': 0
      },
      {
        'id': 2,
        'label': 'wpisz tekst',
        'is_selected': 1,
        'setting_id': 0
      }
    ]
  }
]
export const SettingsScreen = () => {
  const { userToken } = React.useContext(AuthContext)
  const [settings, setSettings] = React.useState([])
  const [isLoading, setIsLoading] = React.useState(false)

  useFocusEffect(React.useCallback(() => {
    fetchSettings()
    return () => {
    }
  }, []))

  const fetchSettings = () => {
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

  const saveSettings = (settings) => {
    if (!settings || !Array.isArray(settings)) {
      return
    }

    settings.forEach(setting => {
      setting.options.sort((a, b) => a.id > b.id)
    })
    setSettings(settings)
  }

  const updateLevel = async (levelId) => {
    await fetch(`${BACKEND_URL}/settings/level/${levelId}`, {
      method: 'PUT',
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
      })
  }

  const onPress = async (levelId) => {
    return await updateLevel(levelId)
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve()
    //     // reject('dsa')
    //   }, 1000)
    // })
  }
  return (
    <View style={styles.container}>
      {/*<Text style={styles.title}>Ustawienia</Text>*/}
      {isLoading ? <View style={styles.loadingContainer}>
        <Loader size={15} />
      </View> : <View>
        {settings && settings.map(setting => {
          return (
            <View key={setting.id}>
              <Text style={styles.subTitle}>{setting.label}</Text>
              {
                setting.options && setting.options.map(level =>
                  <Checkbox label={level.label} onPress={() => onPress(level.id)} isSelected={level.is_selected}
                            key={level.id} />)
              }
            </View>
          )
        })}
      </View>}


      {/*<View style={styles.definitionsToggle}>*/}
      {/*  <Toggle label="Pojęcia i definicje są mieszalne" onPress={onPress} />*/}
      {/*</View>*/}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingHorizontal: 16
  },
  loadingContainer: {
    marginLeft: 8,
    width: 20,
    height: 20
  },
  // title: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   // color: '#2D9CDB',
  //   textAlign: 'center',
  //   marginTop: 20,
  //   marginBottom: 20
  // },
  subTitle: {
    fontSize: 18,
    // color: '#2D9CDB',
    textAlign: 'left',
    // marginLeft: 15,
    marginTop: 10
  },
  definitionsToggle: {
    marginTop: 16
  }
})
