// ** React Imports
import { ReactNode, ReactElement } from 'react'

interface GuestGuardProps {
  children: ReactNode
  fallback: ReactElement | null
}

const GuestGuard = (props: GuestGuardProps) => {
    /* eslint-disable @typescript-eslint/no-unused-vars */
  const { children, fallback } = props

  return <>{children}</>
}

export default GuestGuard
