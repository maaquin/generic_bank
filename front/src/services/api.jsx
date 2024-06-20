import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8080/banco/v1',
    timeout: 1000
})

//User
export const login = async (data) => {
    try{
        return await apiClient.post('/auth/login', data)
    }catch(e){
        console.log(e)
        return{
            error: true,
            e
        }
    }
}
export const first = async () => {
    try{
        return await apiClient.post('/auth/first')
    }catch(e){
        console.log(e)
        return{
            error: true,
            e
        }
    }
}
export const register = async (data) => {
    try{
        return await apiClient.post('/auth/register', data)
    }catch(e){
        console.log(e)
        return{
            error: true,
            e
        }
    }
}
export const continuar = async (data) => {
    try{
        return await apiClient.put('/auth/continuar', data)
    }catch(e){
        console.log(e)
        return{
            error: true,
            e
        }
    }
}
export const newUser = async (data) => {
    console.log(data)
    try{
        return await apiClient.post('/auth/new', data)
    }catch(e){
        console.log(e)
        return{
            error: true,
            e
        }
    }
}
export const extra = async (data) => {
    console.log('userId: ', data) ;
    try {
       return await apiClient.post('/settings/additionalUserInfo', data);
    } catch (e) {
        console.error('Error sending additional user info:', e);
        return {
            error: true,
            e
        };
    }
}
export const updateUser = async (data, token) => {
    try{
        const response = await apiClient.put('/settings/update', data, {
            headers: {
                'x-token': `${token}`
            }
        });
        return response;
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const deleteUser = async (id) => {
    console.log(id)
    try{
        return await apiClient.delete(`/settings/user/${id}`)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const putUserSettings = async (data) => {
    try{
        return await apiClient.put('/settings/user', data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const getUserSetting = async (data) => {
    try{
        return await apiClient.post('/settings/user', data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const patchChangePassword = async (data) => {
    try{
        return await apiClient.patch('/settings/user', data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const email = async (data) => {
    try{
        return await apiClient.post('/settings/email', data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const users = async () => {
    try{
        return await apiClient.get('/settings/user')
    }catch(e){
        return{
            error: true,
            e
        }
    }
}

//fav
export const listFav = async (id) => {
    try{
        return await apiClient.get(`/settings/fav/${id}`)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const addFav = async (data) => {
    try{
        return await apiClient.post('/settings/fav', data)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}
export const deleteFav = async (id) => {
    console.log(id)
    try{
        return await apiClient.delete(`/settings/fav/${id}`)
    }catch(e){
        return{
            error: true,
            e
        }
    }
}

// Producto
export const getCanjear = async () => {
    try {
        return await apiClient.get('/product', {
            headers: {
                'Cache-Control': 'no-cache'
            }
        });
    } catch (e) {
        console.log(e);
        return {
            error: true,
            e
        };
    }
};

export const getCanjearDetails = async (productId) => {
    try {
        return await apiClient.get(`/product/${productId}`);
    } catch (e) {
        return {
            error: true,
            e
        };
    }
};