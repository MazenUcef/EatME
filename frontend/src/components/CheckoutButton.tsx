import { useAuth0 } from "@auth0/auth0-react"
import { useLocation } from "react-router-dom"
import { Button } from "./ui/button"
import { LoadingButton } from "./LoadingButton"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./ui/dialog"
import { DialogTrigger } from "@radix-ui/react-dialog"
import UserProfileForm, { userFormData } from "@/forms/user-profile-form/UserProfileForm"
import { useGetMyUser } from "@/api/MyUserApi"


type Props = {
    onCheckout: (userFormData: userFormData) => void;
    disabled: boolean;
    isLoading: boolean;
}

export const CheckoutButton = ({ onCheckout, disabled, isLoading }: Props) => {
    const { isAuthenticated, isLoading: isAuthLoading, loginWithRedirect } = useAuth0()

    const { pathname } = useLocation()

    const { currentUser, isLoading: isGetUserLoading } = useGetMyUser()

    const onLogin = async () => {
        await loginWithRedirect({
            appState: {
                returnTo: pathname,
            }
        })
    }

    if (!isAuthenticated) {
        return <Button className="bg-primaryy flex-1" onClick={onLogin}>Login to checkout</Button>
    }

    if (isAuthLoading || !currentUser || isLoading) {
        return <LoadingButton />
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button disabled={disabled} className="bg-primaryy flex-1">
                    Go To Checkout
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[425px] md:min-w-[700px] bg-secondaryy">
                <DialogTitle className="text-2xl text-white">Checkout</DialogTitle>
                <DialogDescription className="text-white">
                    Please review and confirm your profile information to proceed.
                </DialogDescription>
                <UserProfileForm
                    currentUser={currentUser}
                    onSave={onCheckout}
                    isLoading={isGetUserLoading}
                    title="Confirm dDelivery Details"
                    buttonText="Continue to payment"
                />
            </DialogContent>
        </Dialog>
    )
}
