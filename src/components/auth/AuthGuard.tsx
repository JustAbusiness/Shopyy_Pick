// ** React Imports
import { ReactNode, ReactElement } from 'react'

interface AuthGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const AuthGuard = (props: AuthGuardProps) => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { children, fallback } = props

  return <>{children}</>
}

export default AuthGuard
