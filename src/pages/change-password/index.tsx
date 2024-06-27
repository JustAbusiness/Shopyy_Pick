import { NextPage } from 'next'
import Head from 'next/head'
import BlankLayout from 'src/views/layouts/BlankLayout'
import LayoutNotApp from 'src/views/layouts/LayoutNotApp'
import ChangePasswordPage from 'src/views/pages/change-password'


type TProps = {}

const ChangePassword: NextPage<TProps> = () => {
  return (
    <>
      <Head>
        <title>Shoppy Pick | 2024 </title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ChangePasswordPage />
    </>
  )
}

export default ChangePassword

ChangePassword.getLayout = (page: React.ReactNode) => <LayoutNotApp>{page}</LayoutNotApp>

