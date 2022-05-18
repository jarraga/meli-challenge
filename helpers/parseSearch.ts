import { SearchResult } from "types/SearchResult";
import { SearchResponse } from "types/SearchResponse";
import { CategoryResponse } from "types/CategoryResponse";

export const parseSearch = (
    searchData: SearchResponse,
    majorTotalItemsCategory: CategoryResponse
): SearchResult => {

    return {
        author: {
            name: String(process.env.NAME),
            lastname: String(process.env.LASTNAME)
        },
        categories: majorTotalItemsCategory.path_from_root.map(path => path.name),
        items: searchData.results.map(item => ({
            id: item.id,
            title: item.title,
            price: {
                currency: item.currency_id,
                amount: item.price,
                decimals: 0
            },
            picture: item.thumbnail,
            condition: item.condition,
            free_shipping: item.shipping.free_shipping,
        }))
    }
}