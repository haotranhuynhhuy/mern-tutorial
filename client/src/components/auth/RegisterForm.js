import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import AlertMessage from '../layout/AlertMessage'
const RegisterForm = () => {
    const { registerUser } = useContext(AuthContext);
    const [alert, setAlert] = useState(null)
    const [registerForm, setRegisterForm] = useState({
        username: '',
        password: '',
        confirmPassword: ''
    })
    const { username, password, confirmPassword } = registerForm;
    const handleChangeText = (e) => {
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value })
    }

    const handleSubmmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setAlert({ type: 'danger', message: 'Password do not match' })
            return;
        }
        try {
            const registerData = await registerUser(registerForm);
            if (!registerData.success) {
                setAlert({ type: 'danger', message: registerData.message })
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <Form className='my-4' onSubmit={handleSubmmit}>
                <AlertMessage info={alert} />
                <Form.Group className='my-3'>
                    <Form.Control
                        type='text'
                        name='username'
                        placeholder='Enter username...'
                        required
                        value={username}
                        onChange={handleChangeText}
                    />
                </Form.Group>
                <Form.Group className='my-3'>
                    <Form.Control
                        type='password'
                        name='password'
                        placeholder='Enter password...'
                        required
                        value={password}
                        onChange={handleChangeText}
                    />
                </Form.Group>
                <Form.Group className='my-3'>
                    <Form.Control
                        type='password'
                        name='confirmPassword'
                        placeholder='Enter confirm password...'
                        required
                        value={confirmPassword}
                        onChange={handleChangeText}
                    />

                </Form.Group>
                <Button variant='success' type='submit' className='ml-3'>Register</Button>
            </Form>
            <p>
                Already have an account?
                <Link to={'/login'}>
                    <Button variant='info' size='sm' className='ml-3'>Login</Button>
                </Link>
            </p>
        </>
    )
}

export default RegisterForm