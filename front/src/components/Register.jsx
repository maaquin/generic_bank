import { useState } from 'react'
import { Input } from './Input'
import {
    validationEmail,
    validatePassword,
    validateUsername,
    validateConfirmPassword
} from '../shared/validators'
import { useRegister } from '../shared/hooks'

export const Register = ({ switchAuthHandler }) => {
    const { register, isLoading } = useRegister();

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

    const handleRegister = (event) => {
        event.preventDefault()

        register(formState.username.value, formState.password.value, formState.email.value)
    }

    const isSubmitButtonDisable = isLoading || !formState.username.isValid || !formState.email.isValid || !formState.password.isValid || !formState.passwordConfirm.isValid

    return (
        <div className="register-container">
            <span className='logo-text'>Register</span>
            <form className='auth-form'>
                <div className="input-box">
                    <Input
                        field='email'
                        placeholder='Email'
                        className='login-input'
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
                <div className="input-box">
                    <Input
                        field='username'
                        placeholder='User name'
                        className='login-input'
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
                <div className="input-box">
                    <Input
                        field='password'
                        placeholder='Password'
                        className='login-input'
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
                <div className="input-box">
                    <Input
                        field='passwordConfirm'
                        placeholder='Password Confirmation'
                        className='login-input'
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
                <button onClick={handleRegister} disabled={isSubmitButtonDisable}>
                    Continue
                </button>
            </form>
            <span onClick={switchAuthHandler} className="auth-form-switch-label">
                Already have you an account? log in now!
            </span>
        </div>
    )
}