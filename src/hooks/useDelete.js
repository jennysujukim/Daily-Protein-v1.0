import { useState, useEffect } from 'react'

import { db } from '../firebase/config'
import { doc, deleteDoc } from 'firebase/firestore'

export const useDelete = () => {

    const [ docId, setDocId ] = useState(null)

    useEffect(() => {
        const deleteDocument = async () => {
            
            try {
                const ref = doc(db, 'intakes', docId)

                await deleteDoc(ref)

                console.log('Document deleted sccueessfully')

            }catch (error) {
                console.error('Error deleting document:', error)
            }
        }

        if (docId){
            deleteDocument()
        }

    }, [docId])

    return { setDocId }
}