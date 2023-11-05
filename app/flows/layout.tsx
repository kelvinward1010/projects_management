import LayoutHome from "../components/LayoutHome"


export default function FlowsPageLayout({
    children
}: {
    children: React.ReactNode
}){
    return (
        <LayoutHome>
            {children}
        </LayoutHome>
    )
}