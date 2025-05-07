import { Outlet } from "react-router-dom"
import AppNavbar from "./Navbar.js"
import Footer from "./Footer.js"

export default function Layout() {
    return (
        <>
            <AppNavbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}
