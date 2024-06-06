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
