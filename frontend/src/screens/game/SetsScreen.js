import * as React from 'react';
import {
  StyleSheet,
  View,
  Button,
  TextInput,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Text
} from 'react-native';
import { PlayListItem } from '../../components/game/PlayListItem'
import { BACKEND_URL } from '@env'
import { AuthContext } from '../../context/AuthContext'
import { useTheme } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/core';

import { Feather } from '@expo/vector-icons';

export function SetsScreen ({ navigation }) {
  let [sets, setSets] = React.useState([])
  const { colors } = useTheme();
  // console.log('colors')
  // console.log(colors)
// let a = 0
  const [newSetName, setNewSetName] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)
  const { userToken } = React.useContext(AuthContext)

  useFocusEffect(
    React.useCallback(() => {
      try {
        fetchSets()
      } catch (e) {
        console.log(e)
      }
      return () => {
      }
    }, [])
  )

  const fetchSets = () => {
    setIsLoading(true)
    fetch(`${BACKEND_URL}/sets`, {
      headers: {
        Authorization: userToken
      }
    })
      .then((res) => res.json()).then((res) => {
      // console.log('res')
      // console.log(res)
      setSets(res)
    })
      .finally(() => {
        setIsLoading(false)
      })
      .catch(e => {
        console.log('error ?')
        console.log(e)
      })
  }

  const createSet = async () => {
    await fetch(`${BACKEND_URL}/set`, {
      method: 'POST', headers: {
        'Content-Type': 'application/json', Authorization: userToken
      }, body: JSON.stringify({
        'name': newSetName
      })
    })
      .then((res) => res.json()).then((res) => {
        // console.log('res')
        // console.log(res)
        // setSets(res)
      })
      .catch((e) => {
        console.log('ee')
        console.log(e)
      })

    setNewSetName('')
    fetchSets()
  }

  const deleteSet = async (setId) => {
    await fetch(`${BACKEND_URL}/set/${setId}`, {
      method: 'DELETE', headers: {
        'Content-Type': 'application/json', Authorization: userToken
      }
    })
      .then((res) => res.json()).then((res) => {
        // console.log('res')
        // console.log(res)
        // setSets(res)
      })
      .catch((e) => {
        console.log('ee')
        console.log(e)
      })

    fetchSets()
  }

  const navigateToSettings = () => {
    navigation.navigate('Settings')
  }

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.settingsWrapper}
                          onPress={navigateToSettings}>
          <Feather style={styles.settingsIcon} name="settings" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.createSetContainer}>
        <TextInput
          style={styles.textInput}
          value={newSetName}
          onChangeText={setNewSetName}
          placeholder={'Nazwa zestawu'}
        />
      </View>

      <Button
        onPress={createSet}
        title="Stwórz nowy zestaw"
        color="#000"
        accessibilityLabel="Stwórz nowy zestaw"
        disabled={!newSetName}
      />


      {isLoading ? <View style={styles.activityIndicatorWrapper}><ActivityIndicator size="large" color="#000" /></View>
        :
        <View style={styles.setsContainer}>
          {sets && sets.map((set) => <PlayListItem set={set} key={set.id} navigation={navigation} style={styles.item}
                                                   deleteSet={deleteSet} />)}
        </View>
      }
    </View>
  );
}

const screenWidth = Dimensions.get('window').width;
const width50 = (screenWidth / 2) - 16 - 8;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingHorizontal: 16
  },
  settingsWrapper: {
    display: 'flex',
    alignItems: 'flex-end'
  },
  settingsIcon: {},
  createSetContainer: {
    marginBottom: 16
  },
  textInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  activityIndicatorWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32
  },
  setsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  item: {
    flexBasis: width50
  }
})
