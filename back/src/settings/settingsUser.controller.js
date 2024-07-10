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

    const { uid, nombre, username, email, direccion, telefono, trabajo, monto, cuentaAhorro, cuentaCredito } = req.body;
    console.log(req.body)
    const actualizaciones = {
        nombre, username, email, direccion, telefono, trabajo, monto, cuentaAhorro, cuentaCredito
    };

    try {
        console.log('error')
        const usuarioActualizado = await User.findByIdAndUpdate(uid, actualizaciones, { new: true });

        if (!usuarioActualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        return res.status(200).json({
            msg: 'Tu usuario ha sido actualizado',
            usuario_nuevo: usuarioActualizado
        });
    } catch (error) {
        console.log('error')
        console.error(error);
        return res.status(500).send('Algo salió mal');
    }
};


export const transferencia = async (req, res) => {
    const { userId, monto, signo, cuenta } = req.body;

    try {
        // Verificar que userId esté presente
        if (!userId) {
            return res.status(400).send('El userId es obligatorio');
        }

        // Obtener el usuario de la base de datos
        const user = await User.findById(userId);

        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }

        let newMonto;

        // Determinar la cuenta y realizar la operación correspondiente
        switch (cuenta) {
            case 'cuenta':
                newMonto = signo === 'suma' ? parseFloat(user.monto) + parseFloat(monto) : user.monto - parseFloat(monto);
                break;
            case 'cuentaAhorro':
                newMonto = signo === 'suma' ? parseFloat(user.cuentaAhorro.monto) + parseFloat(monto) : user.cuentaAhorro.monto - parseFloat(monto);
                break;
            case 'cuentaCredito':
                newMonto = signo === 'suma' ? parseFloat(user.cuentaCredito.monto) + parseFloat(monto) : user.cuentaCredito.monto - parseFloat(monto);
                break;
            default:
                return res.status(400).send('Cuenta inválida');
        }

        // Verificar si newMonto es un número válido
        if (isNaN(newMonto)) {
            return res.status(400).send('Operación inválida');
        }

        // Actualizar el monto en el usuario
        let actualizaciones;
        switch (cuenta) {
            case 'cuenta':
                actualizaciones = { monto: newMonto };
                break;
            case 'cuentaAhorro':
                actualizaciones = { 'cuentaAhorro.monto': newMonto };
                break;
            case 'cuentaCredito':
                actualizaciones = { 'cuentaCredito.monto': newMonto };
                break;
        }

        // Realizar la actualización en la base de datos
        const usuarioActualizado = await User.findByIdAndUpdate(userId, actualizaciones, { new: true });

        // Enviar respuesta al cliente
        res.status(200).json({
            msg: 'Tu usuario ha sido actualizado',
            usuario_nuevo: usuarioActualizado
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error en el servidor');
    }
};

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
            select: 'nombre cuenta cuentaAhorro.numeroCuenta cuentaCredito.numeroCuenta'
        });

        // Desglosa los objetos de cuentaAhorro y cuentaCredito y añade los detalles al resultado
        const favsWithDetailedAccounts = favs.map(fav => {
            const { user2 } = fav.toObject(); // Convertimos fav a un objeto simple para modificarlo fácilmente
            if (user2) {
                user2.cuentaAhorro = user2.cuentaAhorro ? user2.cuentaAhorro.numeroCuenta : 'N/A';
                user2.cuentaCredito = user2.cuentaCredito ? user2.cuentaCredito.numeroCuenta : 'N/A';
            }
            return { ...fav, user2 }; // Retornamos el fav modificado
        });

        return res.status(200).json(favsWithDetailedAccounts);
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

export const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('id: ', id)
        const fav = await User.findByIdAndDelete(id);
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