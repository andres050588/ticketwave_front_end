import axios_api from "../api/api"

export const axiosTokenInterceptor = () => {
    axios_api.interceptors.response.use(
        response => response,
        error => {
            const token = localStorage.getItem("token")
            const currentPath = window.location.pathname

            // Redirect solo se token presente, errore 401 se non siamo già in /login
            if (error?.response?.status === 401 && token && currentPath !== "/login") {
                console.warn("🔒 Accesso negato. Token scaduto o invalido, redirect al login...")
                localStorage.removeItem("token")
                window.location.href = "/login"
            }

            return Promise.reject(error)
        }
    )
}
