import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"
import { HomePage } from "./pages/HomePage"
import { AuthCallBackPage } from "./pages/AuthCallBackPage"
import { UserProfilePage } from "./pages/UserProfilePage"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/"
                element={
                    <Layout showHero>
                        <HomePage />
                    </Layout>}
            />
            <Route path="/auth-callback" element={<AuthCallBackPage />} />
            <Route
                path="/user-profile"
                element={
                    <Layout>
                        <UserProfilePage />
                    </Layout>
                } />
            <Route path="*" element={<Navigate to='/' />} />
        </Routes>
    )
}