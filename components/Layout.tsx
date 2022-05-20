import useLoading from "hooks/UseLoading"
import { FC, useEffect, useRef } from "react"
import SearchBox from "./SearchBox"

interface Props {
    children: React.ReactNode
}

const Layout: FC<Props> = ({ children }) => {

    const scrollContainter = useRef<HTMLDivElement>(null)
    const isLoading = useLoading()

    useEffect(() => {
        scrollContainter.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, [isLoading])

    return (
        <>
            {isLoading && <div className="fixed top-0 left-0 bg-white/90 sm:bg-white/50 w-full h-full flex justify-center items-center text-lg sm:backdrop-blur z-50">
                <p className="bg-white px-4 py-2 rounded shadow">Cargando...</p>
            </div>}
            <div className="grid grid-rows-[auto_1fr] h-screen">
                <SearchBox />
                <div ref={scrollContainter} className={`overflow-y-scroll bg-gray1`}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout