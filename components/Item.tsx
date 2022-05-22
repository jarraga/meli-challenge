import { FC } from "react"
import { ItemResult } from "types/ItemResult"

interface Props {
    data: ItemResult['item']
}

const Item: FC<Props> = ({ data }) => {

    const parseHtml = (html: string) => {
        const urlMatches = html.match(/http[^ ,]*/g) || []
        const htmlWithLinks = urlMatches.reduce((acum, m) =>
            acum.replace(m, `<a title="link" href="${m}" target="_blank">${m}</a>`), html)
        return htmlWithLinks.replace(/\n/g, '<br>')
    }

    return (
        <div className="p-4 flex flex-col bg-white md:rounded md:shadow md:max-w-cont mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr]  gap-4">
                <div className="order-2 md:order-1">
                    <img className="object-contain rounded aspect-square w-full md:w-[680px] mx-auto" src={data.picture} alt={data.title} /> <p className="text-[28px] mt-[32px]">Descripción del producto</p>
                    <div className="text-[16px] mt-[32px] text-gray4" dangerouslySetInnerHTML={{ __html: parseHtml(data.description) }} />
                </div>
                <div className="md:order-2">
                    <h3 className="text-[24px] ">{data.title}</h3>
                    <p className="text-[46px] mt-[32px]">$ {data.price.amount.toLocaleString('de-DE')}</p>
                    <button className="text-white bg-primary hover:bg-primaryHover transition mt-[32px] p-4 w-full rounded">Comprar</button>
                </div>
            </div>
        </div>
    )
}

export default Item