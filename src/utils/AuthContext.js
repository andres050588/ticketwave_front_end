import { createContext, useContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            try {
                const decoded = jwtDecode(token)

                if (decoded.exp * 1000 < Date.now()) {
                    localStorage.removeItem("token")
                    setUser(null)
                    return
                }

                setUser({ id: decoded.userId, name: decoded.name, email: decoded.email })
            } catch {
                localStorage.removeItem("token")
                setUser(null)
            }
        }
    }, [])

    const login = token => {
        localStorage.setItem("token", token)
        const decoded = jwtDecode(token)
        setUser({ id: decoded.userId, name: decoded.name, email: decoded.email })
    }

    const logout = () => {
        localStorage.removeItem("token")
        setUser(null)
    }

    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
