import { CircleUserRound, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "@radix-ui/react-separator"
import { Button } from "./ui/button"
import { useAuth0 } from "@auth0/auth0-react"
import { MobileNavLinks } from "./MobileNavLinks"


export const MobileNav = () => {
    const { loginWithRedirect, isAuthenticated, user } = useAuth0();
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-primaryy" />
            </SheetTrigger>
            <SheetContent className="bg-gray-300 space-y-3">
                <SheetTitle className="text-center">
                    {
                        isAuthenticated ?
                            (
                                <span className="flex gap-5 items-center font-semibold">
                                    <CircleUserRound className="text-primaryy" />
                                    {user?.email}
                                </span>
                            )
                            :
                            (
                                <span>Will Feed You Better !</span>
                            )
                    }
                </SheetTitle>
                <Separator />
                <SheetDescription className="flex">
                    {
                        isAuthenticated ?
                            (
                                <MobileNavLinks />
                            )
                            :
                            (
                                <Button
                                    onClick={async () => await loginWithRedirect()
                                    }
                                    className="flex-1 mt-10 font-bold bg-secondaryy text-primaryy">
                                    Sign In
                                </Button>
                            )
                    }
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}