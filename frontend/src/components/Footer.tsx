import { Link } from "react-router-dom"
import logo from "../assets/Logo2.png"

export const Footer = () => {
    const currentYear = new Date().getFullYear()
    return (
        <div className="bg-secondaryy py-10">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <Link className="" to={'/'}>
                    <img src={logo} className="h-8" alt="logo" />
                </Link>
                <span className="text-primaryy text-sm font-bold flex gap-4">
                    &copy; {currentYear} Mazen Afifi. All rights reserved.
                </span>
                <span className="text-primaryy font-bold flex gap-4">
                    <span>Privacy Policy</span>
                    <span>Terms of service</span>
                </span>
            </div>
        </div>
    )
}
