import Head from 'next/head'
import { api } from 'helpers/api'
import type { GetServerSideProps, NextPage } from 'next'
import { ItemResult } from 'types/ItemResult'
import Item from 'components/Item'

interface Props {
  itemResult: ItemResult
}

const Home: NextPage<Props> = ({ itemResult }) => {

  const { item } = itemResult

  return (
    <div>
      <Head>
        <title>{item.title} | MELI frontend challenge</title>
        <meta name="description" content="MELI frontend challenge" />
        <link rel="icon" href="/favicon.svg" />
        <meta property="og:title" content={`${item.title} | MELI frontend challenge`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={item.picture} />
        <meta property="og:url" content={`https://jarraga-meli-challenge.vercel.app/items/${item.id}`} />
      </Head>

      <div className='w-full'>
        <Item data={item} />
      </div>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const itemResult = await api<ItemResult>(`${process.env.BFF_API_BASE_URL}items/${context.params?.id}`)
  return { props: { itemResult } }
}

export default Home