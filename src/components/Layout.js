import { Outlet } from "react-router-dom"
import AppNavbar from "./Navbar"

export default function Layout() {
    return (
        <>
            <AppNavbar />
            <main>
                <Outlet />
            </main>
        </>
    )
}
