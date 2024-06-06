import { useState, useEffect } from "react"
import toast from "react-hot-toast"
import { getUserSetting, putUserSettings } from "../../../services"

export const useUserSettings = () => {
    const [userSettings, setUserSettings] = useState()
    const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;


    const fetchUserSettings = async () => {
        const response = await getUserSetting({userId})
        if(response.error){
            return toast.error(
                response.e?.response?.data ||
                'Ocurrión un error al obtener los datos del user'
            )
        }
        setUserSettings({
            username: response.data.username,
            email: response.data.email,
            role: response.data.role,
        })
    }

    const saveSettings = async (data) => {
        const response = await putUserSettings(data)

        if(response.error){
            return toast.error(
                response.e?.response?.data ||
                'Error al actualizar la información'
            )
        }

        toast.success('Información actualizada exitosamente')
    }

    useEffect(() =>{
        fetchUserSettings()
    }, [])

  return {
    isFetching: !userSettings,
    userSettings,
    saveSettings
  }
}