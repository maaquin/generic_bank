import React, { useEffect, useState } from 'react';

import { useNewUser } from "../../shared/hooks";
import { Input } from '../Input';

import {
    validationEmail,
    validatePassword,
    validateUsername,
    validateConfirmPassword,
    validateTitle,
    validateDescription,
    validateDpi,
    validateIngresos
} from '../../shared/validators'


export const NewUser = (onFavUpdate) => {
    const [newAdded, setNewAdded] = useState(false);

    const { newUser, isLoading } = useNewUser();

    const [formState, setFormState] = useState({
        username: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        },
        passwordConfirm: {
            value: '',
            isValid: false
        },
        email: {
            value: '',
            isValid: false
        },
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
        },
        montoAhorro: {
            value: '',
            isValid: false
        },
        montoCredito: {
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
            case 'email':
                isValid = validationEmail(value)
                break
            case 'password':
                isValid = validatePassword(value)
                break
            case 'passwordConfirm':
                isValid = validateConfirmPassword(formState.password.value, value)
                break
            case 'username':
                isValid = validateUsername(value)
                break
            case 'dpi':
                isValid = validateDpi(value);
                break;
            case 'nombre':
                isValid = validateTitle(value);
                break;
            case 'direccion':
                isValid = validateDescription(value);
                break;
            case 'telefono':
                isValid = validateTitle(value);
                break;
            case 'trabajo':
                isValid = validateTitle(value);
                break;
            case 'ingresos':
                isValid = validateIngresos(value);
                break;
            case 'monto':
                isValid = validateIngresos(value);
                break;
            case 'montoAhorro':
                isValid = validateIngresos(value);
                break;
            case 'montoCredito':
                isValid = validateIngresos(value);
                break;

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

    useEffect(() => {
        if (newAdded) {
            onFavUpdate();
            setNewAdded(false);
        }
    }, [newAdded, onFavUpdate]);

    const handleNewUser = async (event) => {
        event.preventDefault();

        await newUser(
            formState.username.value,
            formState.password.value,
            formState.email.value,
            formState.dpi.value,
            formState.nombre.value,
            formState.direccion.value,
            formState.telefono.value,
            formState.trabajo.value,
            formState.ingresos.value,
            formState.monto.value,
            formState.montoAhorro.value,
            formState.montoCredito.value
        );

        setNewAdded(true);
    };

    const isSubmitButtonDisable = isLoading || !formState.username.isValid ||
        !formState.email.isValid || !formState.password.isValid ||
        !formState.passwordConfirm.isValid || !formState.dpi.isValid ||
        !formState.nombre.isValid || !formState.direccion.isValid ||
        !formState.telefono.isValid || !formState.trabajo.isValid ||
        !formState.ingresos.isValid || !formState.monto.isValid ||
        !formState.montoAhorro.isValid || !formState.montoCredito.isValid;

    return (
        <div className="">
            <form className=''>
                <div className="input-box2">
                    <Input
                        field='email'
                        placeholder='Email'
                        className='login-input2'
                        value={formState.email.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                    />
                    {formState.email.showError && !formState.email.isValid && (
                        <i className="fa-solid fa-triangle-exclamation" style={{ color: 'red' }}></i>
                    )}
                    {!formState.email.showError && (
                        <i className="fa-solid fa-envelope"></i>
                    )}
                </div>
                <div className="input-box2">
                    <Input
                        field='username'
                        placeholder='User name'
                        className='login-input2'
                        value={formState.username.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                    />
                    {formState.username.showError && !formState.username.isValid && (
                        <i className="fa-solid fa-triangle-exclamation" style={{ color: 'red' }}></i>
                    )}
                    {!formState.username.showError && (
                        <i className="fa-solid fa-user"></i>
                    )}
                </div>
                <div className="input-box2">
                    <Input
                        field='dpi'
                        placeholder='Número de dpi'
                        className='login-input2'
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
                <div className="input-box2">
                    <Input
                        field='nombre'
                        placeholder='Nombre y apellido'
                        className='login-input2'
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
                <div className="input-box2">
                    <Input
                        field='direccion'
                        placeholder='Dirección'
                        className='login-input2'
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
                <div className="input-box2">
                    <Input
                        field='telefono'
                        placeholder='Teléfono celular'
                        className='login-input2'
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
                <div className="input-box2">
                    <Input
                        field='trabajo'
                        placeholder='Trabajo actual'
                        className='login-input2'
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
                <div className="input-box2">
                    <Input
                        field='ingresos'
                        placeholder='Ingresos mensuales'
                        className='login-input2'
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
                <div className="input-box2">
                    <Input
                        field='monto'
                        placeholder='Monto inicial'
                        className='login-input2'
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
                <div className="input-box2">
                    <Input
                        field='montoAhorro'
                        placeholder='Monto de ahorro inicial'
                        className='login-input2'
                        value={formState.montoAhorro.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                    />
                    {formState.montoAhorro.showError && !formState.montoAhorro.isValid && (
                        <i className="fa-solid fa-triangle-exclamation" style={{ color: 'red' }}></i>
                    )}
                    {!formState.montoAhorro.showError && (
                        <i className="fa-solid fa-piggy-bank"></i>
                    )}
                </div>
                <div className="input-box2">
                    <Input
                        field='montoCredito'
                        placeholder='Monto de crédito inicial'
                        className='login-input2'
                        value={formState.montoCredito.value}
                        onChangeHandler={handleInputValueChange}
                        type='text'
                        onBlurHandler={handleInputValidationOnBlur}
                    />
                    {formState.montoCredito.showError && !formState.montoCredito.isValid && (
                        <i className="fa-solid fa-triangle-exclamation" style={{ color: 'red' }}></i>
                    )}
                    {!formState.montoCredito.showError && (
                        <i className="fa-solid fa-credit-card"></i>
                    )}
                </div>
                <div className="input-box2">
                    <Input
                        field='password'
                        placeholder='Password'
                        className='login-input2'
                        value={formState.password.value}
                        onChangeHandler={handleInputValueChange}
                        type='password'
                        onBlurHandler={handleInputValidationOnBlur}
                    />
                    {formState.password.showError && !formState.password.isValid && (
                        <i className="fa-solid fa-triangle-exclamation" style={{ color: 'red' }}></i>
                    )}
                    {!formState.password.showError && (
                        <i className="fa-solid fa-key"></i>
                    )}
                </div>
                <div className="input-box2">
                    <Input
                        field='passwordConfirm'
                        placeholder='Password Confirmation'
                        className='login-input2'
                        value={formState.passwordConfirm.value}
                        onChangeHandler={handleInputValueChange}
                        type='password'
                        onBlurHandler={handleInputValidationOnBlur}
                    />
                    {formState.passwordConfirm.showError && !formState.passwordConfirm.isValid && (
                        <i className="fa-solid fa-triangle-exclamation" style={{ color: 'red' }}></i>
                    )}
                    {!formState.passwordConfirm.showError && (
                        <i className="fa-solid fa-lock"></i>
                    )}
                </div>

                <button className='btn-lol' onClick={handleNewUser} disabled={isSubmitButtonDisable}>
                    Nuevo usuario
                </button>
            </form>
        </div>
    );
};