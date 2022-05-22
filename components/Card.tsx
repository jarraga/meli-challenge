import Image from "next/image"
import Link from "next/link"
import { FC } from "react"
import { SearchResult } from "types/SearchResult"

interface Props {
    data: SearchResult['items'][0]
}

const Card: FC<Props> = ({ data }) => {

    return (
        <Link href={`/items/${data.id}`}>
            <div className="p-4 grid md:grid-cols-[auto_1fr_15%] first:border-t-0 border-t border-gray1 cursor-pointer">
                <img className="object-contain rounded aspect-square w-[180px] mx-auto md:mx-0" src={data.picture} alt={data.title} />
                <div className="md:ml-4 md:mt-0 mt-4">
                    <div className="flex items-center">
                        <p className="text-[24px]">$ {data.price.amount.toLocaleString('de-DE')}</p>
                        {!data.free_shipping &&
                            <div className="ml-4 flex items-center" >
                                <img src="/images/freeShipping.svg" alt="free shipping" />
                                <p className="ml-2 text-[#00a650]">Envío gratis</p>
                            </div>}
                    </div>
                    <h3 className="text-[18px] mt-[32px] text-gray3">{data.title}</h3>
                </div>
                <h3 className="text-[14px] text-gray3 mt-[16px]">{data.state_name}</h3>
            </div>
        </Link>
    )
}

export default Card