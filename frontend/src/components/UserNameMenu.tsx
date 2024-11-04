import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { DropdownMenu } from "./ui/dropdown-menu"
import { CircleUserRound } from "lucide-react"
import { useAuth0 } from "@auth0/auth0-react"
import { Link } from "react-router-dom"
import { Separator } from "@radix-ui/react-separator"
import { Button } from "./ui/button"

export const UserNameMenu = () => {
    const { user, logout } = useAuth0()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex text-white items-center px-3 font-semibold hover:text-primaryy gap-2">
                <CircleUserRound className="text-primaryy" />
                {user?.email}
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white p-5 space-y-5 rounded-lg">
                <DropdownMenuItem>
                    <Link to={'/user-profile'} className="font-semibold hover:text-primaryy">
                        User Profile
                    </Link>
                </DropdownMenuItem>
                <Separator />
                <DropdownMenuItem>
                    <Button
                        onClick={() => logout()}
                        className="flex flex-1 font-semibold bg-primaryy">
                        Sign Out
                    </Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

