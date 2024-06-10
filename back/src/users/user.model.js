import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  nombre: {
    type: String,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["CLIENT_ROLE", "ADMIN_ROLE"],
    default: 'CLIENT_ROLE',
  },
  cuenta: {
    type: String,
  },
  dpi: {
    type: Number,
  },
  direccion: {
    type: String,
  },
  telefono: {
    type: String,
  },
  email: {
    type: String,
  },
  trabajo: {
    type: String,
  },
  ingresos: {
    type: String,
  },
  monto: {
    type: String,
  },
  cuentaAhorro: {
    numeroCuenta: {
      type: String,
    },
    monto: {
      type: String,
    },
  },
  cuentaCredito: {
    numeroCuenta: {
      type: String,
    },
    monto: {
      type: String,
    },
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

export default mongoose.model('User', UserSchema);