import { useState } from 'react'
import { Input } from './Input'
import {
    validateTitle,
    validateDescription,
    validateDpi,
    validateIngresos
} from '../shared/validators'
import { useContinuar } from '../shared/hooks'

export const Continuar = () => {
    const { continuar, isLoading } = useContinuar();

    const [formState, setFormState] = useState({
        dpi: {
            value: '',
            isValid: false
        },
        nombre: {
            value: '',
            isValid: false
        },
        direccion: {
            value: '',
            isValid: false
        },
        telefono: {
            value: '',
            isValid: false
        },
        trabajo: {
            value: '',
            isValid: false
        },
        ingresos: {
            value: '',
            isValid: false
        },
        monto: {
            value: '',
            isValid: false
        }
    })

    const handleInputValueChange = (value, field) => {
        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                value
            }
        }))
    }

    const handleInputValidationOnBlur = (value, field) => {
        let isValid = false
        switch (field) {
            case 'dpi':
                isValid = validateDpi(value)
                break

            case 'nombre':
                isValid = validateTitle(value)
                break

            case 'direccion':
                isValid = validateDescription(value)
                break

            case 'telefono':
                isValid = validateTitle(value)
                break

            case 'trabajo':
                isValid = validateTitle(value)
                break

            case 'ingresos':
                isValid = validateIngresos(value)
                break

            case 'monto':
                isValid = validateIngresos(value)
                break

            default:
                break
        }

        setFormState((prevState) => ({
            ...prevState,
            [field]: {
                ...prevState[field],
                isValid,
                showError: !isValid
            }
        }))
    }

    const handleContinuar = (event) => {
        event.preventDefault()

        continuar(
            formState.dpi.value, 
            formState.nombre.value, 
            formState.direccion.value, 
            formState.telefono.value, 
            formState.trabajo.value, 
            formState.ingresos.value, 
            formState.monto.value)
    }

    const isSubmitButtonDisable = 
    isLoading || !formState.dpi.isValid || 
    !formState.nombre.isValid || !formState.direccion.isValid || 
    !formState.telefono.isValid || !formState.trabajo.isValid || 
    !formState.ingresos.isValid || !formState.monto.isValid

    return (
        <div className="continuar-container">
            <span className='logo-text'>Register</span>
            <form className='auth-form'>
                <div className="input-box">
                    <Input
                        field='dpi'
                        placeholder='Número de dpi'
                        className='login-input'
                        value={formState.dpi.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                    />
                    {formState.dpi.showError && !formState.dpi.isValid && (
                        <i className="fa-solid fa-triangle-exclamation" style={{ color: 'red' }}></i>
                    )}
                    {!formState.dpi.showError && (
                        <i className="fa-solid fa-fingerprint"></i>
                    )}
                </div>
                <div className="input-box">
                    <Input
                        field='nombre'
                        placeholder='Nombre y apellido'
                        className='login-input'
                        value={formState.nombre.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                    />
                    {formState.nombre.showError && !formState.nombre.isValid && (
                        <i className="fa-solid fa-triangle-exclamation" style={{ color: 'red' }}></i>
                    )}
                    {!formState.nombre.showError && (
                        <i className="fa-solid fa-signature"></i>
                    )}
                </div>
                <div className="input-box">
                    <Input
                        field='direccion'
                        placeholder='Dirección'
                        className='login-input'
                        value={formState.direccion.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                    />
                    {formState.direccion.showError && !formState.direccion.isValid && (
                        <i className="fa-solid fa-triangle-exclamation" style={{ color: 'red' }}></i>
                    )}
                    {!formState.direccion.showError && (
                        <i className="fa-solid fa-diamond-turn-right"></i>
                    )}
                </div>
                <div className="input-box">
                    <Input
                        field='telefono'
                        placeholder='Teléfono celular'
                        className='login-input'
                        value={formState.telefono.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                    />
                    {formState.telefono.showError && !formState.telefono.isValid && (
                        <i className="fa-solid fa-triangle-exclamation" style={{ color: 'red' }}></i>
                    )}
                    {!formState.telefono.showError && (
                        <i className="fa-solid fa-mobile-button"></i>
                    )}
                </div>
                <div className="input-box">
                    <Input
                        field='trabajo'
                        placeholder='Trabajo actual'
                        className='login-input'
                        value={formState.trabajo.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                    />
                    {formState.trabajo.showError && !formState.trabajo.isValid && (
                        <i className="fa-solid fa-triangle-exclamation" style={{ color: 'red' }}></i>
                    )}
                    {!formState.trabajo.showError && (
                        <i className="fa-solid fa-building"></i>
                    )}
                </div>
                <div className="input-box">
                    <Input
                        field='ingresos'
                        placeholder='Ingresos mensuales'
                        className='login-input'
                        value={formState.ingresos.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                    />
                    {formState.ingresos.showError && !formState.ingresos.isValid && (
                        <i className="fa-solid fa-triangle-exclamation" style={{ color: 'red' }}></i>
                    )}
                    {!formState.ingresos.showError && (
                        <i className="fa-solid fa-money-bill-wheat"></i>
                    )}
                </div>
                <div className="input-box">
                    <Input
                        field='monto'
                        placeholder='Monto inicial'
                        className='login-input'
                        value={formState.monto.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                    />
                    {formState.monto.showError && !formState.monto.isValid && (
                        <i className="fa-solid fa-triangle-exclamation" style={{ color: 'red' }}></i>
                    )}
                    {!formState.monto.showError && (
                        <i className="fa-solid fa-piggy-bank"></i>
                    )}
                </div>
                <button onClick={handleContinuar} disabled={isSubmitButtonDisable}>
                    Register
                </button>
            </form>
        </div>
    )
}