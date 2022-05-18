import { api } from '../../../helpers/api'
import { parseItem } from 'helpers/parseItem'
import { ItemResult } from 'types/ItemResult'
import { ItemResponse } from 'types/ItemResponse'
import { DescriptionResponse } from 'types/DescriptionResponse'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ItemResult>
) {

    const [item, description] = await Promise.all([
        api<ItemResponse>(`${process.env.API_BASE_URL}items/${req.query.id}`),
        api<DescriptionResponse>(`${process.env.API_BASE_URL}items/${req.query.id}/description`)
    ])

    const result = parseItem(item, description)

    res.status(200).json(result)
}
