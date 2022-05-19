import { FC } from "react"
import SearchBox from "./SearchBox"

interface Props {
    children: React.ReactNode
}

const Layout: FC<Props> = ({ children }) => {

    return (
        <div className="grid grid-rows-[auto_1fr] h-screen">
            <SearchBox />
            {children}
        </div>
    )
}

export default Layout