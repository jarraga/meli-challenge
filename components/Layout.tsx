import useInnerHeight from "hooks/UseInnerHeight"
import useLoading from "hooks/UseLoading"
import { FC, useEffect, useRef } from "react"
import SearchBox from "./SearchBox"
import { motion, AnimatePresence } from "framer-motion"
import { motionValues } from "helpers/motionValues"

interface Props {
    children: React.ReactNode
}

const Layout: FC<Props> = ({ children }) => {

    const scrollContainter = useRef<HTMLDivElement>(null)
    const isLoading = useLoading()
    const innerHeight = useInnerHeight()

    useEffect(() => {
        scrollContainter.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }, [isLoading])

    return (
        <>
            <AnimatePresence>
                {isLoading && <motion.div {...motionValues} className="fixed top-0 left-0 bg-white/90 sm:bg-white/50 w-full h-full flex justify-center items-center text-lg sm:backdrop-blur z-50"
                >
                    <p className="bg-white px-4 py-2 rounded shadow">Cargando...</p>
                </motion.div>}
            </AnimatePresence>

            <div style={{ height: `${innerHeight}px` }} className="grid grid-rows-[auto_1fr] h-screen">
                <SearchBox />
                <div ref={scrollContainter} className={`overflow-y-scroll bg-gray1 overflow-x-hidden`}>
                    {children}
                </div>
            </div>
        </>
    )
}

export default Layout