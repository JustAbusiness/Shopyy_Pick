// ** React Imports
import { ReactNode } from 'react'

// ** Types
import { buildAbilityFor, AppAbility, type ACLObj } from 'src/configs/acl'
import BlankLayout from 'src/views/layouts/BlankLayout'
import NotAuthorized from 'src/pages/401'
import { useAuth } from 'src/hooks/useAuth'
import { useRouter } from 'next/router'
import { AbilityContext } from '../acl/Can'

interface AclGuardProps {
  children: ReactNode
  authGuard?: boolean
  guestGuard?: boolean
  aclAbilities: ACLObj
}

const AclGuard = (props: AclGuardProps) => {
  // ** Props
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const { aclAbilities, children, guestGuard = false, authGuard = true } = props

  const auth = useAuth()
  const permissionUser = auth.user?.role.permissions ?? []
  const router = useRouter()

  let ability: AppAbility

  if (auth.user && !ability) {
    ability = buildAbilityFor(permissionUser, aclAbilities.subject)
  }

  // If Guest Guard Or No Guard is true or error page
  if (guestGuard || router.route === '/500' || router.route === '/404' || !authGuard) {
    if (auth.user && ability) {
      return <AbilityContext.Provider value={ability}>{children} </AbilityContext.Provider>
    } else {
      return <>{children}</>
    }
  }

  // Check the access of current user
  if (ability && auth.user && ability.can(aclAbilities.action, aclAbilities.subject)) {
    return <AbilityContext.Provider value={ability}>{children} </AbilityContext.Provider>
  }

  return (
    <>
      <BlankLayout>
        <NotAuthorized />
      </BlankLayout>
    </>
  )
}

export default AclGuard
