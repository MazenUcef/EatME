import { Navigate, Route, Routes } from "react-router-dom"
import Layout from "./layouts/Layout"

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={
                <Layout>
                    Home Page
                </Layout>}
            />
            <Route path="/user-profile" element={<span>User Profile Page</span>} />
            <Route path="*" element={<Navigate to='/' />} />
        </Routes>
    )
}