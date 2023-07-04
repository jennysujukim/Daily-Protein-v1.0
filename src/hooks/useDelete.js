import { useState, useEffect } from 'react'

import { db } from '../firebase/config'
import { doc, deleteDoc } from 'firebase/firestore'

export const useDelete = () => {

    const [ docId, setDocId ] = useState(null)
    const [ deleteError, setDeleteError ] = useState(null)

    useEffect(() => {
        
        // create delete async function
        const deleteDocument = async () => {
            setDeleteError(null)

            try {
                const ref = doc(db, 'intakes', docId)
                await deleteDoc(ref)
            }catch (error) {
                setDeleteError('Error deleting document:', error)
            }
        }

        if (docId){
            deleteDocument()
        }

    }, [docId])

    return { setDocId, deleteError }
}