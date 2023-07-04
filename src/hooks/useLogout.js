import { useAuthContext } from "./useAuthContext"
import { auth } from "../firebase/config"
import { signOut } from "firebase/auth"
import { useNavigate } from "react-router-dom"

export const useLogout = () => {

    const { dispatch } = useAuthContext()
    const navigate = useNavigate()

    // create logout function
    const logout = () => {

        // built-in function of Firebase
        signOut(auth)
            .then(() => {
                // dispatch 'LOGOUT' type to AuthContext
                dispatch({ type: 'LOGOUT' })
                // return to 'login' page 
                navigate('/account/login')
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    return { logout }
}