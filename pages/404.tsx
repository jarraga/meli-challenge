import type { NextPage } from 'next'
import Head from 'next/head'

const Home: NextPage = () => {

  return (
    <div className='h-full'>
      <Head>
        <title>Página no encontrada | MELI frontend challenge</title>
        <meta name="description" content="MELI frontend challenge" />
        <link rel="icon" href="/favicon.svg" />
        <meta property="og:title" content="MELI frontend challenge" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og.jpeg" />
        <meta property="og:url" content="https://jarraga-meli-challenge.vercel.app" />
      </Head>

      <div className='w-full h-full flex flex-col space-y-4 justify-center items-center p-12'>
        <img width={251} height={154} alt="Página no encontrada" src="/images/notFound.svg" />
        <p className='text-lg text-center font-bold'>No encontramos la página que buscabas</p>
        <p className='text-lg text-center'>Escribe algo en el buscador para ver los resultados</p>
      </div>

    </div>
  )
}

export default Home
