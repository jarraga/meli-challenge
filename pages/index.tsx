import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>MELI frontend challenge</title>
        <meta name="description" content="MELI frontend challenge" />
        <link rel="icon" href="/favicon.svg" />
        <meta property="og:title" content="MELI frontend challenge" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og.jpeg" />
        <meta property="og:url" content="https://jarraga-meli-challenge.vercel.app" />
      </Head>


    </div>
  )
}

export default Home
