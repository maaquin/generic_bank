import { useState } from "react"
import { Login } from '../../components/Login'
import { Register } from '../../components/Register'
import { Continuar } from '../../components/Continuar'
import { Route, Routes } from "react-router-dom";

import './authPage.css'

export const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  const handlerAuthPageToggle = () => {
    setIsLogin((prev) => !prev)
  }
  return (
    <div>
      <Routes>
        <Route path="/" element={
          <div className="container">
            <div className="auth-container">
              {isLogin ? (
                <Login switchAuthHandler={handlerAuthPageToggle} />
              ) : (
                <Register switchAuthHandler={handlerAuthPageToggle} />
              )}
            </div>
          </div>
        } />
        <Route path="/continuar" element={
          <div className="container-extra">
            <Continuar />
          </div>}
          />
      </Routes>
    </div>
  )
}
