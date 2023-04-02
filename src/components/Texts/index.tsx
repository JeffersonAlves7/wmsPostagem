import { PropsWithChildren } from "react"

export const SubTitle = ({children}: PropsWithChildren) => {
    return (
        <h2 className="text-center text-4xl font-bold">
            {children}
        </h2>
    )
}