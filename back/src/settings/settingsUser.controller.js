import User from '../users/user.model.js'
import Fav from '../users/fav.model.js'
import bcryptjs from 'bcryptjs'

export const listUser = async (req, res) => {
    try {
        const user = await User.find();
        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
};

export const listEmail = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.find({ email: { $regex: email, $options: 'i' } });

        return res.status(200).json(user);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Something went wrong');
    }
};

export const getUserSetting = async (req, res) => {
    try {
        const { userId } = req.body

        console.log(userId)

        const userData = await User.findById(userId)

        return res.status(200).json({
            id: userData.id,
            nombre: userData.nombre,
            username: userData.username,
            email: userData.email,
            role: userData.role,
            cuenta: userData.cuenta,
            dpi: userData.dpi,
            direccion: userData.direccion,
            telefono: userData.telefono,
            trabajo: userData.trabajo,
            monto: userData.monto,
            cuentaAhorro: userData.cuentaAhorro,
            cuentaCredito: userData.cuentaCredito
        })
    } catch (e) {
        return res.status(500).send('Something went wrong')
    }
}

export const usuariosPut = async (req, res) => {
    const { userId, username, email, telefono } = req.body;

    const actualizaciones = { username: username, email: email, telefono: telefono };
    const usuarioActualizado = await User.findByIdAndUpdate(userId, actualizaciones, { new: true });

    console.log(usuarioActualizado)

    res.status(200).json({
        msg: 'Tu usuario ha sido actualizado',
        usuario_nuevo: usuarioActualizado.usuario
    });
}

export const transferencia = async (req, res) => {
    const { userId, monto, signo } = req.body;

    const user = await User.findById(userId)
    const newMonto = ''

    if (signo === 'suma') {
        newMonto = user.monto + monto
        return newMonto;
    }
    if (signo === 'resta') {
        newMonto = user.monto - monto
        return newMonto;
    }

    const actualizaciones = { monto: newMonto };
    const usuarioActualizado = await User.findByIdAndUpdate(userId, actualizaciones, { new: true });

    console.log(usuarioActualizado)

    res.status(200).json({
        msg: 'Tu usuario ha sido actualizado',
        usuario_nuevo: usuarioActualizado.usuario
    });
}

export const passwordPatch = async (req, res) => {
    try {
        const { userId, password, newPassword } = req.body

        const userData = await User.findById(userId, { password: 1 })

        const isPasswordCorrect = await bcryptjs.compare(password, userData.password)

        if (!isPasswordCorrect) {
            return res.status(400).send('Invalid password. Please try again')
        }

        const encryptedPassword = await bcryptjs.hash(newPassword, 10)

        await User.updateOne({ _id: userId }, { password: encryptedPassword })

        return res.status(200).send('Password changed succesfully')
    } catch (e) {
        return res.status(500).send('Somthing went wrong')
    }
}

export const listFav = async (req, res) => {
    try {
        const { id } = req.params;
        
        const favs = await Fav.find({ user1: id }).populate({
            path: 'user2',
            select: 'nombre cuenta'
        });

        return res.status(200).json(favs);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Algo salió mal');
    }
};

export const addFav = async (req, res) => {
    try {
        const { user1, user2 } = req.body;

        const fav = await Fav.create({
            user1,
            user2
        });

        return res.status(200).json({
            fav
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send("No se pudo :(");
    }
};

export const deleteFav = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('id: ', id)
        const fav = await Fav.findByIdAndDelete(id);
        console.log(fav)
        return res.status(200).json({
            fav
        });
    } catch (e) {
        console.log(e);
        return res.status(500).send("No se pudo :(");
    }
};

export const getAdditionalUserInfo = async (req, res) => {
    try {

        const { userId } = req.body;
        console.log(userId)

        const userData = await User.findById(userId)

        if (!userData) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        console.log(userData.monto)

        return res.status(200).json({
            userData
        })

    } catch (error) {
        console.error('Error al obtener la información adicional del usuario:', error);
        res.status(500).json({ message: 'Error del servidor' });
    }
};