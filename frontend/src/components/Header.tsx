import { Link } from "react-router-dom"
import logo from "../assets/Logo2.png"
import { MobileNav } from "./MobileNav"
import { MainNav } from "./MainNav"

export const Header = () => {
    return (
        <div className="border-b bg-secondaryy border-b-primaryy py-6 ">
            <div className="container mx-auto flex justify-between items-center">
                <Link className="" to={'/'}>
                    <img src={logo} className="h-8" alt="logo" />
                </Link>
                <div className="md:hidden">
                    <MobileNav />
                </div>
                <div className="hidden md:block">
                    <MainNav />
                </div>
            </div>
        </div>
    )
}

