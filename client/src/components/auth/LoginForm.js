import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import AlertMessage from '../layout/AlertMessage'
const LoginForm = () => {
    const [loginForm, setLoginForm] = useState({
        username: '',
        password: ''
    })
    const { loginUser } = useContext(AuthContext);
    const [alert, setAlert] = useState(null);
    const { username, password } = loginForm;


    const handleChangeText = (e) => {
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value })
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const loginData = await loginUser(loginForm);
            if (!loginData.success) {
                setAlert({ type: 'danger', message: loginData.message });
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Form className='my-4' onSubmit={handleLogin}>
                <AlertMessage info={alert} />
                <Form.Group className='my-3'>
                    <Form.Control
                        type='text'
                        placeholder='Enter username...'
                        name='username'
                        required
                        value={username}
                        onChange={handleChangeText}
                    />
                </Form.Group>
                <Form.Group className='my-3'>
                    <Form.Control
                        type='password'
                        placeholder='Enter password...'
                        name='password'
                        required
                        value={password}
                        onChange={handleChangeText}
                    />
                </Form.Group>
                <Button variant='success' type='submit'>Login</Button>
            </Form>
            <p>
                Don't you have account?
                <Link to={'/register'}>
                    <Button variant='info' size='sm' className='ml-2'>Register</Button>
                </Link>
            </p>
        </>
    )
}

export default LoginForm