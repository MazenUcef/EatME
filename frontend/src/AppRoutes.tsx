import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"
import { HomePage } from "./pages/HomePage"
import { AuthCallBackPage } from "./pages/AuthCallBackPage"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/"
                element={
                    <Layout>
                        <HomePage />
                    </Layout>}
            />
            <Route path="/auth-callback" element={<AuthCallBackPage />} />
            <Route path="/user-profile" element={<span>User Profile Page</span>} />
            <Route path="*" element={<Navigate to='/' />} />
        </Routes>
    )
}