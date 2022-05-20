import useLoading from 'hooks/UseLoading'
import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {

  const isLoading = useLoading()

  return (
    <div className='h-full'>
      <Head>
        <title>MELI frontend challenge</title>
        <meta name="description" content="MELI frontend challenge" />
        <link rel="icon" href="/favicon.svg" />
        <meta property="og:title" content="MELI frontend challenge" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og.jpeg" />
        <meta property="og:url" content="https://jarraga-meli-challenge.vercel.app" />
      </Head>

      <div className='w-full h-full flex justify-center items-center'>
        <p className='text-lg'>Escribe algo para empezar a buscar</p>
      </div>

    </div>
  )
}

export default Home
