import CalendarDemo from "@/features/home/components/calendar-demo.tsx";
import {useState} from "react";
import {useAuth} from "@/features/authentication/context/auth-context.tsx";
import {Calendar, LogOut, UserPlus} from "lucide-react";
import {AddFriendForm} from "@/features/home/components/add-friend.tsx";
import {Modal} from "@/features/home/components/modal.tsx";

export default function Home() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const {logout} = useAuth();
    const [refresh, setRefresh] = useState(false);


    return (
        <>

            <nav className="bg-white shadow-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">

                        {/* Left Side: Title */}
                        <div className="flex-shrink-0">
              <span className="text-2xl font-extrabold text-red-600 tracking-tight flex items-center">
                <Calendar className="w-6 h-6 mr-2"/>
                Birthday Calendar App
              </span>
                        </div>

                        {/* Right Side: Buttons */}
                        <div className="flex items-center space-x-3">

                            {/* Add Friend Button */}
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 transition duration-150 ease-in-out shadow-lg shadow-red-200/50"
                            >
                                <UserPlus className="w-4 h-4 mr-2"/>
                                Add Friend
                            </button>

                            {/* Logout Button */}
                            <button
                                onClick={logout}
                                className="flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition duration-150 ease-in-out shadow-sm"
                            >
                                <LogOut className="w-4 h-4 mr-2"/>
                                Logout
                            </button>

                        </div>
                    </div>
                </div>
            </nav>

            <div className="min-w-[100vh] m-20">
                <CalendarDemo refresh={refresh}/>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => {
                setIsModalOpen(false)
                setRefresh(prev => !prev)
            }}>
                <AddFriendForm onClose={() => {
                    setIsModalOpen(false)
                    setRefresh(prev => !prev)
                }}/>
            </Modal>
        </>


    )
}