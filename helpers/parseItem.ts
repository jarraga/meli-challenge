import { ItemResult } from "types/ItemResult";
import { ItemResponse } from "types/ItemResponse";
import { DescriptionResponse } from "types/DescriptionResponse";

export const parseItem = (
    item: ItemResponse,
    description: DescriptionResponse,
    categories: string[]
): ItemResult => {

    return {
        author: {
            name: String(process.env.NAME),
            lastname: String(process.env.LASTNAME)
        },
        item: {
            id: item.id,
            title: item.title,
            price: {
                currency: item.currency_id,
                amount: item.price,
                decimals: 0,
            },
            picture: item.pictures[0].secure_url,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping,
            sold_quantity: item.sold_quantity,
            description: description.plain_text,
            url: item.permalink,
            categories
        }
    }
}