import { NextPage } from 'next'
import Head from 'next/head'
import BlankLayout from 'src/views/layouts/BlankLayout'
import LoginPage from 'src/views/pages/login'

type TProps = {}

const Login: NextPage<TProps> = () => {
  return (
    <>
      <Head>
        <title>Shoppy Pick | 2024 </title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <LoginPage />
    </>
  )
}

export default Login

Login.getLayout = (page: React.ReactNode) => <BlankLayout>{page}</BlankLayout>
