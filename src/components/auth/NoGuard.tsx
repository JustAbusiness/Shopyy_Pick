// ** React Imports
import { ReactNode, ReactElement } from 'react'
import { useAuth } from 'src/hooks/useAuth'

interface NoGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const NoGuard = (props: NoGuardProps) => {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { children, fallback } = props
  const auth = useAuth()

  // Avoid loading page of login view if user is already logged in
  if (auth.loading) {
    return <>{fallback}</>
  }

  return <>{children}</>
}

export default NoGuard
