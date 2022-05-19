import { FC } from "react"
import SearchBox from "./SearchBox"

interface Props {
    children: React.ReactNode
}

const Layout: FC<Props> = ({ children }) => {

    return (
        <div className="grid grid-rows-[auto_1fr] h-screen">
            <SearchBox />
            <div className="overflow-y-scroll bg-gray1">
                {children}
            </div>
        </div>
    )
}

export default Layout