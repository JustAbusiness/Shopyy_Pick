// ** React Imports
import { useRouter } from 'next/router'
import { ReactNode, ReactElement, useEffect } from 'react'
import { ACCESS_TOKEN, USER_DATA } from 'src/configs/auth'
import { clearLocalUserData, clearTemporaryToken, getTemporaryToken } from 'src/helper/storage'
import { useAuth } from 'src/hooks/useAuth'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { children, fallback } = props
  const authContext = useAuth()
  const router = useRouter()

  useEffect(() => {
    const { temporaryToken } = getTemporaryToken()
    if (!router.isReady) return
    if (
      authContext.user === null &&
      !window.localStorage.getItem(ACCESS_TOKEN) &&
      !window.localStorage.getItem(USER_DATA) &&
      !temporaryToken
    ) {
      if (router.asPath !== '/' && router.asPath !== '/login' && router.asPath !== '/register') {
        router.replace({
          pathname: '/login',
          query: { returnUrl: router.asPath }
        })
      } else {
        router.replace('/login')
      }

      // Clear token
      authContext.setUser(null)
      clearLocalUserData()
    }
  }, [router.route])

  // Clear temporary token
  useEffect(() => {
    const handleUnload = () => {
      clearTemporaryToken()
    }

    window.addEventListener('beforeunload', () => handleUnload())
    
return () => {
      window.addEventListener('beforeunload', () => handleUnload())
    }
  }, [])

  // Not loading UI when user is not authenticated
  if (authContext.loading || authContext.user === null) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

export default AuthGuard
