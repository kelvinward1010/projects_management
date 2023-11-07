import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { HiHome, HiArrowLeftOnRectangle } from 'react-icons/hi2';
import { AiFillReconciliation, AiFillSliders, AiTwotoneNotification } from 'react-icons/ai'

const useRoutes = () => {
    const pathname = usePathname();
    const router = useRouter();

    const routes = useMemo(() => [
        {
            label: "Home",
            onClick: () => router.push('/home'),
            icon: HiHome,
            active: pathname === '/home'
        },
        {
            label: 'Notifications',
            onClick: () => router.push('/notifications'),
            isNoti: AiTwotoneNotification,
            active: pathname === '/notifications'
        },
        {
            label: 'Projects',
            onClick: () => router.push('/projects'),
            icon: AiFillReconciliation,
            active: pathname === '/projects'
        },
        {
            label: 'Logout',
            onClick: () => signOut(),
            href: '#',
            icon: HiArrowLeftOnRectangle,
        }
    ],[pathname])

    return routes;
}

export default useRoutes;