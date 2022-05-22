import { api } from 'helpers/api'
import { parseSearch } from 'helpers/parseSearch'
import { SearchResult } from 'types/SearchResult'
import { SearchResponse } from 'types/SearchResponse'
import { CategoryResponse } from 'types/CategoryResponse'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResult>
) {

  const url = new URL(`${process.env.API_BASE_URL}sites/MLA/search`)
  url.searchParams.append('q', String(req.query.q))
  url.searchParams.append('limit', String(process.env.API_SEARCH_LIMIT))

  const searchData = await api<SearchResponse>(url.href)

  if (searchData.results.length == 0) {
    const emptyResponse: SearchResult = {
      author: {
        name: String(process.env.NAME),
        lastname: String(process.env.LASTNAME)
      },
      categories: [],
      items: []
    }
    res.status(200).json(emptyResponse)
    return
  }

  const categoriesQueries = searchData.results.map(item =>
    api<CategoryResponse>(`${process.env.API_BASE_URL}categories/${item.category_id}`))

  const categoriesData = await Promise.all(categoriesQueries)

  const majorTotalItemsCategory = categoriesData
    .reduce((a, b) => a.total_items_in_this_category > b.total_items_in_this_category ? a : b)

  const result = parseSearch(searchData, majorTotalItemsCategory)

  res.status(200).json(result)
}