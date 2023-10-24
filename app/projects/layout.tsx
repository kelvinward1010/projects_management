import LayoutHome from "../components/LayoutHome"


export default function ProjectsPageLayout({
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