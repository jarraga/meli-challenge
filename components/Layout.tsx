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
        <div className="grid grid-rows-[auto_1fr] h-screen">
            <SearchBox />
            <div ref={scrollContainter} className="overflow-y-scroll bg-gray1">
                {children}
            </div>
        </div>
    )
}

export default Layout