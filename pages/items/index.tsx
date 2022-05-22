import Head from 'next/head'
import { api } from 'helpers/api'
import { SearchResult } from 'types/SearchResult'
import type { GetServerSideProps, NextPage } from 'next'
import Card from 'components/Card'
import Breadcrumb from 'components/Breadcrumb'

interface Props {
  query: string
  searchResult: SearchResult
}

const Home: NextPage<Props> = ({ query, searchResult }) => {
  return (
    <div className="h-full">
      <Head>
        <title>Resultados para &quot;{query}&quot; | MELI frontend challenge</title>
        <meta name="description" content="MELI frontend challenge" />
        <link rel="icon" href="/favicon.svg" />
        <meta property="og:title" content={`Resultados para "${query}" | MELI frontend challenge`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={searchResult.items?.[0]?.picture || '/images/og.jpeg'} />
        <meta property="og:url" content={`https://jarraga-meli-challenge.vercel.app/items?q=${query}`} />
      </Head>

      {searchResult.items.length == 0 &&
        <div className='w-full h-full flex flex-col space-y-4 justify-center items-center p-12'>
          <img width={80} height={80} alt="Página no encontrada" src="/images/noResults.svg" />
          <p className='text-lg text-center'>No se encontraron resultados, intenta cambiar el término de búsqueda</p>
        </div>}

      {searchResult.items.length > 0 &&
        <div className='w-full'>
          <div className="w-full md:max-w-cont mx-auto md:p-4 md:pt-0">
            <Breadcrumb paths={searchResult.categories} />
            <div className='md:rounded md:shadow bg-white overflow-hidden'>
              {searchResult.items.map(item =>
                <Card key={item.id} data={item} />
              )}
            </div>
          </div>
        </div>}


    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchResult = await api<SearchResult>(`${process.env.BFF_API_BASE_URL}items?q=${context.query.q}`)
  return { props: { query: context.query.q, searchResult } }
}

export default Home