import { useAuth0 } from "@auth0/auth0-react"
import { Button } from "./ui/button"
import { UserNameMenu } from "./UserNameMenu";


export const MainNav = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        <span className="flex space-x-2 items-center">
            {
                isAuthenticated ?
                    (<UserNameMenu />)
                    :
                    (
                        <Button
                            onClick={async () => await loginWithRedirect()}
                            variant='ghost'
                            className="font-bold text-lg py-4 text-primaryy hover:text-secondaryy hover:bg-primaryy">
                            Sign In
                        </Button>
                    )
            }
        </span>

    )
}
