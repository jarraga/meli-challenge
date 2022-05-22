import { api } from '../../../helpers/api'
import { parseItem } from 'helpers/parseItem'
import { ItemResult } from 'types/ItemResult'
import { ItemResponse } from 'types/ItemResponse'
import { DescriptionResponse } from 'types/DescriptionResponse'
import type { NextApiRequest, NextApiResponse } from 'next'
import { CategoryResponse } from 'types/CategoryResponse'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ItemResult>
) {

    const [item, description] = await Promise.all([
        api<ItemResponse>(`${process.env.API_BASE_URL}items/${req.query.id}`),
        api<DescriptionResponse>(`${process.env.API_BASE_URL}items/${req.query.id}/description`)
    ])

    const category = await api<CategoryResponse>(`${process.env.API_BASE_URL}categories/${item.category_id}`)
    const categories = category.path_from_root.map(path => path.name)

    const result = parseItem(item, description, categories)

    res.status(200).json(result)
}
