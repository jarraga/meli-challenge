import Head from 'next/head'
import { api } from 'helpers/api'
import type { GetServerSideProps, NextPage } from 'next'
import { ItemResult } from 'types/ItemResult'

interface Props {
  itemResult: ItemResult
}

const Home: NextPage<Props> = ({ itemResult }) => {

  const { item } = itemResult

  return (
    <div>
      <Head>
        <title>{itemResult.item.title} | MELI frontend challenge</title>
        <meta name="description" content="MELI frontend challenge" />
        <link rel="icon" href="/favicon.svg" />
        <meta property="og:title" content={`${itemResult.item.title} | MELI frontend challenge`} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={itemResult.item.picture} />
        <meta property="og:url" content={`https://jarraga-meli-challenge.vercel.app/items/${itemResult.item.id}`} />
      </Head>

      <p>{item.title}</p>
      <img className='aspect-square w-[100px] object-contain' src={item.picture} />

    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const itemResult = await api<ItemResult>(`${process.env.BFF_API_BASE_URL}items/${context.params?.id}`)
  return { props: { itemResult } }
}

export default Home