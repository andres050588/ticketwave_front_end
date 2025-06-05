import axios_api from "../api/api"

export const axiosTokenInterceptor = () => {
    axios_api.interceptors.response.use(
        response => response,
        error => {
            const currentPath = window.location.pathname

            // Evita redirect se già nella pagina di login
            if (error.response && error.response.status === 401 && currentPath !== "/login") {
                console.warn("Accesso negato, redirect al login...")
                localStorage.removeItem("token")
                window.location.href = "/login"
            }

            return Promise.reject(error)
        }
    )
}
