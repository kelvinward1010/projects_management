import Header from "./Header";
import Sidebar from "./sidebar/Sidebar";


const LayoutHome: React.FC<{children: React.ReactNode}> = ({children}) => {

    return (
        <div className="min-h-screen bg-white">
            <div className="">
                <Header />
            </div>
            <div className="h-full mx-auto relative">
                <div className="h-full flex flex-row">
                    <div className="basic-64 text-black">
                        <Sidebar />
                    </div>
                    <div className="basic-8/12 w-full">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutHome;