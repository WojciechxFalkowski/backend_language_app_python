import React, { createContext } from 'react'
import { useQuery } from 'react-query'
import { BACKEND_URL } from '@env'
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = React.useState(false)
  const [userToken, setUserToken] = React.useState(null)

  React.useEffect(() => {
    const setTokenFromStorage = async () => {
      try {
        const value = await AsyncStorage.getItem('user_token')
        if (value != null) {
          setUserToken(value)
        }
      } catch (e) {
        console.log(e)
      }
    }

    setTokenFromStorage().catch(console.log)
  }, [])

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('user_token', value)
    } catch (e) {
      console.log(e)
    }
  }

  const removeData = async (value) => {
    try {
      await AsyncStorage.removeItem('user_token', value)
    } catch (e) {
      console.log(e)
    }
  }

  const login = async (email, password) => {
    console.log('login')
    setIsLoading(true)
    removeData()

    const loginDetails = {
      'username': email,
      'password': password
    }
    // console.log('loginDetails')
    // console.log(loginDetails)

    const formBody = Object.keys(loginDetails)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(loginDetails[key])).join('&');

    await fetch(`${BACKEND_URL}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: formBody
    })
      .then((res) => res.json()).then((res) => {
        if (res && res.detail) {
          throw new Error(res.detail)
        }
        if (!res.access_token) {
          return
        }
        const token = `Bearer ${res.access_token}`
        storeData(token)
        setUserToken(token)
      })
      .finally(() => {
        setIsLoading(false)
      })

    // const { isLoading, error, data } = await useQuery('repoData', () =>
    //   fetch(`${BACKEND_URL}/token`, {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    //     body: formBody
    //   }).then(res => res.json()).then((res) => {
    //     console.log('res')
    //     console.log(res)
    //     // setSets(res)
    //   })
    // )
    //
    // console.log('?')
    // console.log(data)


    // setTimeout(() => {
    //   console.log('??')
    // setUserToken('custom token')
    // }, 200000000)
  }

  const register = async (email, password) => {
    setIsLoading(true)
    await fetch(`${BACKEND_URL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }).then((res) => res.json())
      .then((res) => {
        // console.log('res')
        // console.log(res)
        if (res && res.detail) {
          throw new Error(res.detail)
        }
        login(email, password)
      })
      .finally(() => {
        setIsLoading(false)
      })
    // .catch((e) => {
    //   console.log('e')
    //   console.log(e)
    // })
  }

  const logout = () => {
    setUserToken(null)
    setIsLoading(false)
    removeData()
  }

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken, register }}>
      {children}
    </AuthContext.Provider>
  )
}
