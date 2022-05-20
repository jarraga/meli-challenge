import { FC } from "react"
import { ItemResult } from "types/ItemResult"

interface Props {
    data: ItemResult['item']
}

const Item: FC<Props> = ({ data }) => {

    return (
        <div className="p-4 flex flex-col bg-white md:rounded md:shadow md:max-w-[1100px] mx-auto">
            <div className="grid md:grid-cols-[680px_1fr] gap-4">
                <div className="order-2 md:order-1">
                    <img className="object-contain rounded aspect-square w-[680px] mx-auto md:mx-0 " src={data.picture} alt={data.title} /> <p className="text-[28px] mt-[32px]">Descripción del producto</p>
                    <p className="text-[16px] mt-[32px] text-gray4" dangerouslySetInnerHTML={{ __html: data.description }} />
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