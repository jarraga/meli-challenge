import { api } from 'helpers/api'
import { SuggestionsResponse } from 'types/SuggestionsResponse'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string[]>
) {

  const url = new URL(`${process.env.SUGGESTIONS_API_BASE_URL}resources/sites/MLA/autosuggest`)
  url.searchParams.append('api_version', String(2))
  url.searchParams.append('q', String(req.query.q))
  url.searchParams.append('limit', String(process.env.SUGGESTIONS_API_LIMIT))

  const suggestionsResponse = await api<SuggestionsResponse>(url.href)

  const result = suggestionsResponse.suggested_queries.map(s => s.q)

  res.status(200).json(result)
}