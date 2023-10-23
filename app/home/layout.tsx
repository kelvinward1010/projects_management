import LayoutHome from "../components/LayoutHome"


export default function HomePageLayout({
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