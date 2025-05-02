import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./components/Layout.js"
import HomePage from "./pages/HomePage.js"
import LoginPage from "./pages/LoginPage.js"
import RegisterPage from "./pages/RegisterPage.js"
import TicketPage from "./pages/TicketsPage.js"
import TicketDetailPage from "./pages/TicketDetailPage.js"
import OrdersPage from "./pages/OrdersPage.js"
import SellPage from "./pages/SellPage.js"
import ProfilePage from "./pages/ProfilePage.js"
import { AuthProvider } from "./utils/AuthContext.js"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { path: "profile", element: <ProfilePage /> },
            { path: "sell", element: <SellPage /> },
            { path: "tickets", element: <TicketPage /> },
            { path: "tickets/:id", element: <TicketDetailPage /> },
            { path: "orders", element: <OrdersPage /> }
        ]
    }
])

function App() {
    return (
        <AuthProvider>
            <RouterProvider
                router={router}
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true
                }}
            />
        </AuthProvider>
    )
}

export default App
