import axios from "axios"

export const axiosTokenInterceptor = () => {
    axios.interceptors.response.use(
        response => response,
        error => {
            if (error.response && error.response.status === 403) {
                console.warn("Accesso negato, redirect al login...")
                localStorage.removeItem("token") // Si elimina il token vecchio
                window.location.href = "/login" // Redirezione manuale
            }
            return Promise.reject(error)
        }
    )
}
