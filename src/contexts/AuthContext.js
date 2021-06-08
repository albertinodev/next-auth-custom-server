import { createContext, useEffect, useState } from "react";
import { setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

import { recoverUserInformation, signInRequest } from "../services/auth";
import { api } from "../services/api";


export const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  const isAuthenticated = !!user; // Says if user is Is Authenticated or not receives true or false

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies()

    if (token) {
      recoverUserInformation().then(response => { // Get logged user data. (Gets evertime for better experience, is importante to get updated data from user)
        setUser(response.user)
      })
    }
  }, [])

  const signIn = async ({ email, password }) => {
    const { token, user } = await signInRequest({ email, password}) // Make request and return's the user and token

    setCookie(undefined, 'nextauth.token', token, { maxAge: 60 * 60 * 1, /* 1 hour*/})

    api.defaults.headers['Authorization'] = `Bearer ${token}`; // Set's the token in axios Bearer for evertime he makes the request
    setUser(user) // Set's user data to the main state
    Router.push('/dashboard'); // Call the next page to be called
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}
