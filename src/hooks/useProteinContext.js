import { useContext } from "react"
import { ProteinContext } from "../context/ProteinContext"

export const useProteinContext = () => {
    const context = useContext(ProteinContext)

    if(!context){
        throw Error('useProteinContext must be inside an ProteinContextProvider')
    }

    return context
}