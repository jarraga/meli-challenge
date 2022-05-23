import { FC, ReactNode, useEffect, useState } from "react"

const Breadcrumb: FC<{ paths: string[] }> = ({ paths }) => {

    const [nodes, setNodes] = useState<JSX.Element[] | null>(null)

    useEffect(() => {

        const temp: JSX.Element[] = []
        paths.forEach((path, i) => {
            temp.push(<p className={`text-gray3 ${i == paths.length - 1
                ? 'font-bold' : ''}`} key={path + i}>{path}</p>)
            if (i < paths.length - 1) {
                temp.push(<img width={6} height={8} key={i} alt="majorSymbol" src="/images/majorSymbol.svg" />)
            }
        })
        setNodes(temp)
    }, [paths])

    return (
        <div className="flex items-center space-x-2 py-4 px-4 md:px-0 flex-wrap">
            {nodes && nodes.map(node => node)}
        </div>
    )
}

export default Breadcrumb