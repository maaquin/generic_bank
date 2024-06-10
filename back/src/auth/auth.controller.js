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
      password: encryptedPassword,
    });

    return res.status(200).json({
      msg: "Usuario registrado. Revisa tu correo para confirmar tu cuenta.",
      userDetails: {
        id: user.id,
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

const generarNumeroCuenta = () => {
<<<<<<< HEAD
  return Math.floor(1000000000 + Math.random() * 9000000000).toString(); // Genera un número de 10 dígitos
=======
  return Math.floor(1000000000 + Math.random() * 9000000000).toString(); 
>>>>>>> developer
};

export const continuar = async (req, res) => {
  try {
    const {
      email,
      dpi,
      nombre,
      direccion,
      telefono,
      trabajo,
      ingresos,
      monto,
<<<<<<< HEAD
    } = req.body;

    const cuenta = generarNumeroCuenta();

    let usuarioExistente = await User.findOne({ email });

    if (usuarioExistente) {
      usuarioExistente.dpi = dpi;
      usuarioExistente.nombre = nombre;
      usuarioExistente.direccion = direccion;
      usuarioExistente.telefono = telefono;
      usuarioExistente.trabajo = trabajo;
      usuarioExistente.ingresos = ingresos;
      usuarioExistente.monto = monto;
      usuarioExistente.cuenta = cuenta;

      usuarioExistente = await usuarioExistente.save();

      return res.status(200).json({
        msg: "Usuario actualizado exitosamente",
        usuario: usuarioExistente,
      });
    } else {
      const nuevoUsuario = new User({
        email,
        dpi,
        nombre,
        direccion,
        telefono,
        trabajo,
        ingresos,
        monto,
        cuenta,
      });

=======
      montoAhorro,
      montoCredito,
    } = req.body;

    if (!email || !dpi || !nombre || !direccion || !telefono || !trabajo || !ingresos || !monto || !montoAhorro || !montoCredito) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    const cuenta = generarNumeroCuenta();
    const cuentaAhorro = generarNumeroCuenta();
    const cuentaCredito = generarNumeroCuenta();

    let usuarioExistente = await User.findOne({ email });

    if (usuarioExistente) {
      usuarioExistente.dpi = dpi;
      usuarioExistente.nombre = nombre;
      usuarioExistente.direccion = direccion;
      usuarioExistente.telefono = telefono;
      usuarioExistente.trabajo = trabajo;
      usuarioExistente.ingresos = ingresos;
      usuarioExistente.monto = monto;
      usuarioExistente.cuenta = cuenta;
      usuarioExistente.montoAhorro = montoAhorro;
      usuarioExistente.cuentaAhorro = cuentaAhorro;
      usuarioExistente.montoCredito = montoCredito;
      usuarioExistente.cuentaCredito = cuentaCredito;

      usuarioExistente = await usuarioExistente.save();

      return res.status(200).json({
        msg: "Usuario actualizado exitosamente",
        usuario: usuarioExistente,
      });
    } else {
      const nuevoUsuario = new User({
        email,
        dpi,
        nombre,
        direccion,
        telefono,
        trabajo,
        ingresos,
        monto,
        cuenta,
        montoAhorro,
        cuentaAhorro,
        montoCredito,
        cuentaCredito,
      });

>>>>>>> developer
      const usuarioGuardado = await nuevoUsuario.save();

      return res.status(200).json({
        msg: "Usuario creado exitosamente",
        usuario: usuarioGuardado,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("No se pudo registrar el usuario");
  }
};
<<<<<<< HEAD
=======


>>>>>>> developer

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //verificar si el email existe:
    const user = await User.findOne({ email: email.toLowerCase() });

    if (user && (await bcryptjs.compare(password, user.password))) {
      const token = await generarJWT(user.id, user.email);

      res.status(200).json({
        msg: "Login Ok!!!",
        userDetails: {
          email: user.email,
          id: user.id,
<<<<<<< HEAD
          token: token,
=======
          token: token
>>>>>>> developer
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
