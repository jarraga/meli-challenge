import Head from 'next/head'
import { api } from 'helpers/api'
import { SearchResult } from 'types/SearchResult'
import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import Card from 'components/Card'

interface Props {
  query: string
  searchResult: SearchResult
}

const Home: NextPage<Props> = ({ query, searchResult }) => {
  return (
    <div>
      <Head>
        <title>Resultados para &quot;{query}&quot; | MELI frontend challenge</title>
        <meta name="description" content="MELI frontend challenge" />
        <link rel="icon" href="/favicon.svg" />
        <meta property="og:title" content={`Resultados para "${query}" | MELI frontend challenge`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={searchResult.items?.[0]?.picture || '/images/og.jpeg'} />
        <meta property="og:url" content={`https://jarraga-meli-challenge.vercel.app/items?q=${query}`} />
      </Head>

      <div className='w-full md:p-4'>
        <div className='md:rounded md:shadow bg-white w-full md:max-w-cont mx-auto overflow-hidden'>
          {searchResult.items.map(item =>
            <Card key={item.id} data={item} />
          )}
        </div>
      </div>


    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const searchResult = await api<SearchResult>(`${process.env.BFF_API_BASE_URL}items?q=${context.query.q}`)
  return { props: { query: context.query.q, searchResult } }
}

export default Home