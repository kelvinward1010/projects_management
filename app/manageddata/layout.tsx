import LayoutHome from "../components/LayoutHome"


export default function ManagedDataPageLayout({
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