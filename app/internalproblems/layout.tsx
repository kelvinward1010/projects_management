import LayoutHome from "../components/LayoutHome"


export default function InternalProblemsPageLayout({
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