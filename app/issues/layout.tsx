import LayoutHome from "../components/LayoutHome"


export default function IssuesPageLayout({
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