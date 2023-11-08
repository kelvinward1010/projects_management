import LayoutHome from "../components/LayoutHome"


export default function StoryPageLayout({
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