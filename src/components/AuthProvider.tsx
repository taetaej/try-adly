import { createContext, useContext, useState, type ReactNode } from 'react'

const AuthContext = createContext<{
  isLoggedIn: boolean
  toggleAuth: () => void
}>({ isLoggedIn: false, toggleAuth: () => {} })

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const toggleAuth = () => setIsLoggedIn(prev => !prev)

  return (
    <AuthContext.Provider value={{ isLoggedIn, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
