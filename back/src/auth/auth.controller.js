import User from "../users/user.model.js";
import bcryptjs from "bcryptjs";
import { generarJWT } from "../helpers/generate-JWT.js";

export const register = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const userExist = await User.find({ email: email });

    if (userExist.length > 0) {
      return res.status(500).send("Correo ya registrado");
    }

    const salt = bcryptjs.genSaltSync();
    const encryptedPassword = bcryptjs.hashSync(password, salt);

    const user = await User.create({
      username,
      email: email.toLowerCase(),
      password: encryptedPassword
    });

    return res.status(200).json({
      msg: "Usuario registrado. Revisa tu correo para confirmar tu cuenta.",
      userDetails: {
        user: user.username,
        email: user.email,
        id: user.id
      },
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send("No se pudo registrar el usuario");
  }
};

export const continuar = async (req, res) => {
  try {
    const { email, dpi, nombre, direccion, telefono, trabajo, ingresos, monto } = req.body;

    const users = await User.find({ email: email });
    if (users.length > 0) {
      const user = users[0];
      const userId = user._id;
      console.log('usuario', user);
      console.log('id', userId);

      const actualizaciones = {
        email: email, dpi: dpi, nombre: nombre, direccion: direccion,
        telefono: telefono, trabajo: trabajo, ingresos: ingresos, monto: monto,
      };
      const usuarioActualizado = await User.findByIdAndUpdate(userId, actualizaciones, { new: true });
      console.log(usuarioActualizado)

      res.status(200).json({
        msg: 'buenasa',
        usuario_nuevo: usuarioActualizado.usuario
      });
    } else {
      console.log('No user found with the provided email.');
    }

  } catch (e) {
    console.log(e);
    return res.status(500).send("No se pudo registrar el usuario");
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //verificar si el email existe:
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await bcryptjs.compare(password, user.password))) {
      const token = await generarJWT(user.id, user.email)

      res.status(200).json({
        msg: "Login Ok!!!",
        userDetails: {
          email: user.email,
          id: user.id,
          token: token
        },
      });
    }

    if (!user) {
      return res
        .status(400)
        .send(`Wrong credentials, ${email} doesn't exists en database`);
    }

    // verificar la contraseña
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).send("wrong password");
    }

  } catch (e) {
    res.status(500).send("Comuniquese con el administrador");
  }
};

