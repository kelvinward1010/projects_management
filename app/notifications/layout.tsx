import LayoutHome from "../components/LayoutHome"


export default function NotificationsPageLayout({
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