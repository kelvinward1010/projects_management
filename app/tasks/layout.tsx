import LayoutHome from "../components/LayoutHome"


export default function TaskPageLayout({
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