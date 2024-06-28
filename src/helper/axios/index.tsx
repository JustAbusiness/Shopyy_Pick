import axios from 'axios'
import { BASE_URL, CONFIG_API } from 'src/configs/api'
import {
  clearLocalUserData,
  clearTemporaryToken,
  getLocalUserData,
  getTemporaryToken,
  setLocalUserData,
  setTemporaryToken
} from '../storage'
import { jwtDecode } from 'jwt-decode'
import { FC } from 'react'
import { NextRouter, useRouter } from 'next/router'
import { UserDataType } from 'src/contexts/types'
import { useAuth } from 'src/hooks/useAuth'

type TAxiosInterceptor = {
  children: React.ReactNode
}

const instanceAxios = axios.create({ baseURL: BASE_URL })

const handleRedirectLogin = (router: NextRouter, setUser: (data: UserDataType | null) => void) => {
  if (router.asPath !== '/') {
    router.replace({ pathname: '/login', query: { returnUrl: router.asPath } })
  } else {
    router.replace('/login')
  }

  setUser(null)
  clearLocalUserData()
  clearTemporaryToken()
}

const AxiosInterceptor: FC<TAxiosInterceptor> = ({ children }) => {
  const router = useRouter()
  const { setUser, user } = useAuth()

  instanceAxios.interceptors.request.use(async config => {
    const { accessToken, refreshToken } = getLocalUserData() // Make sure always get new token
    const { temporaryToken } = getTemporaryToken()

    if (accessToken || temporaryToken) {
      let decodeAccessToken: any = {}
      if (accessToken) {
        decodeAccessToken = jwtDecode(accessToken)
      } else if (temporaryToken) {
        decodeAccessToken = jwtDecode(temporaryToken)
      }

      if (decodeAccessToken?.exp > Date.now() / 1000) {
        // check if token is expired
        config.headers['Authorization'] = `Bearer ${accessToken ? accessToken : temporaryToken}`
      } else {
        if (refreshToken) {
          const decodeRefreshToken: any = jwtDecode(refreshToken)
          if (decodeRefreshToken?.exp > Date.now() / 1000) {
            await axios
              .post(
                `${CONFIG_API.AUTH.INDEX}/refresh-token`,
                {},
                {
                  headers: {
                    Authorization: `Bearer ${refreshToken}`
                  }
                }
              )
              .then(response => {
                const newAccessToken = response.data?.data?.access_token
                if (newAccessToken) {
                  config.headers['Authorization'] = `Bearer ${response.data.data.accessToken}`
                  if (accessToken) {
                    // When Remember Me is checked
                    setLocalUserData(JSON.stringify(user), newAccessToken, refreshToken)
                  } else {
                    // When Remember Me is not checked
                    setLocalUserData(JSON.stringify(user), '', refreshToken)
                    setTemporaryToken(newAccessToken)
                  }
                } else {
                  handleRedirectLogin(router, setUser)
                }
              })
              .catch(error => {
                handleRedirectLogin(router, setUser)
              })
          } else {
            handleRedirectLogin(router, setUser)
          }
        } else {
          handleRedirectLogin(router, setUser)
        }
      }
    } else {
      handleRedirectLogin(router, setUser)
    }

    return config
  })

  instanceAxios.interceptors.response.use(response => {
    return response
  })

  return <>{children}</>
}

export default instanceAxios
export { AxiosInterceptor }
