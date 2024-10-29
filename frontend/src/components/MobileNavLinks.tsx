import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"


export const MobileNavLinks = () => {
    const { logout } = useAuth0()
    return (
        <div className="w-full flex mt-5 flex-col gap-4">
            <Link to={'/user-profile'} className="flex px-3 bg-white items-center py-2 rounded-lg justify-center font-semibold hover:text-primaryy">
                User Profile
            </Link>
            <Button
                className="flex items-center px-3 font-semibold hover:bg-primaryy"
                onClick={() => logout()}>
                Sign Out
            </Button>
        </div>
    )
}
