import LayoutHome from "../components/LayoutHome"


export default function BoardPageLayout({
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