import { useRouter } from "next/router"
import { FC } from "react"
import { ItemResult } from "types/ItemResult"
import Breadcrumb from "./Breadcrumb"

interface Props {
    data: ItemResult['item']
}

const CONDITION: Record<string, string> = {
    new: 'Nuevo',
    used: 'Usado'
}

const Item: FC<Props> = ({ data }) => {

    const router = useRouter()

    const parseHtml = (html: string) => {
        const urlMatches = html.match(/http[^ ,]*/g) || []
        const htmlWithLinks = urlMatches.reduce((acum, m) =>
            acum.replace(m, `<a title="link" href="${m}" rel="noreferrer" target="_blank">${m}</a>`), html)
        return htmlWithLinks.replace(/\n/g, '<br>')
    }

    const parseSoldQuantity = (soldQuantity: number) => {
        if (soldQuantity == 0) {
            return 'Sin ventas aún'
        } else {
            return `${soldQuantity} vendidos`
        }
    }

    const parseAmount = (amount: number, decimal?: boolean): string => {

        if (decimal) {
            const decimalValue = amount - Math.trunc(amount)
            if (decimalValue > 0) {
                return (decimalValue * 100).toFixed()
            } else {
                return ``
            }
        } else {
            return `$ ${Math.trunc(amount).toLocaleString('de-DE')}`
        }
    }

    const share = async () => {

        if (navigator.share) {
            await navigator.share({
                title: data.title,
                url: process.env.NEXT_PUBLIC_APP_BASE_URL + router.asPath
            })
        } else {
            await navigator.clipboard.writeText(process.env.NEXT_PUBLIC_APP_BASE_URL + router.asPath);
            alert('Link copiado!')
        }
    }

    return (
        <div className="w-full md:max-w-cont mx-auto md:px-4 md:pb-4 pt-0">
            <Breadcrumb paths={data.categories} />
            <div className="p-4 flex flex-col bg-white md:rounded md:shadow ">
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
                    <div className="order-2 md:order-1">
                        <div className="relative">
                            <img onClick={share} className="absolute right-4 bottom-4 cursor-pointer hover:brightness-95 transition rounded-full shadow-lg" src="/images/share.svg" alt="share" />
                            <img className="object-contain rounded aspect-square w-full md:w-[680px] mx-auto" src={data.picture} alt={data.title} />
                        </div>
                        {data.description && <div className="mt-[32px]">
                            <p className="text-[28px]">Descripción del producto</p>
                            <div className="text-[16px] mt-[32px] text-gray3" dangerouslySetInnerHTML={{ __html: parseHtml(data.description) }} />
                        </div>}
                        {!data.description && <p className="text-[16px] mt-[32px]">Producto sin descripción</p>}
                    </div>
                    <div className="md:order-2">
                        <p className="text-[14px] md:mt-[32px] text-gray3">
                            {CONDITION[data.condition]} - {parseSoldQuantity(data.sold_quantity)}
                        </p>
                        <h3 className="text-[24px] mt-[16px]">{data.title}</h3>
                        <div className="flex items-start mt-[32px]">
                            <p className="text-[46px] leading-[46px]">{parseAmount(data.price.amount)}</p>
                            <p className="text-[24px] ml-2">{parseAmount(data.price.amount, true)}</p>
                        </div>
                        <div className="mt-[32px] md:pr-[32px]">
                            <a href={data.url} target="_blank" rel="noreferrer" title={data.title} >
                                <button className="text-white bg-primary hover:bg-primaryHover transition p-4 w-full rounded">
                                    Comprar
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Item