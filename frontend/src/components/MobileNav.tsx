import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet"
import { Separator } from "@radix-ui/react-separator"
import { Button } from "./ui/button"


export const MobileNav = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-primaryy" />
            </SheetTrigger>
            <SheetContent className="bg-gray-300 space-y-3">
                <SheetTitle className="text-center">
                    <span>Will Feed You Better !</span>
                </SheetTitle>
                <Separator />
                <SheetDescription className="flex">
                    <Button className="flex-1 mt-10 font-bold bg-secondaryy text-primaryy">
                        Sign In
                    </Button>
                </SheetDescription>
            </SheetContent>
        </Sheet>
    )
}