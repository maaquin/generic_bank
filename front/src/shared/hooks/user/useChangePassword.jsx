import toast from "react-hot-toast"
import { patchChangePassword as changePasswordRequest } from "../../../services"

const userId = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : null;

export const useChangePassword = () => {
    const changePassword = async (password, newPassword) => {
        const responseData = await changePasswordRequest({password, newPassword, userId})

        if(responseData.error){
            return toast.error(responseData.e?.response?.data || 'No se pudo actualizar el password')
        }

        toast.success('Password Actualizado exitosamente')
    }
  return {
    changePassword
  }
}