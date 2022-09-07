import React, { useContext } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Redirect } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import { AuthContext } from '../context/AuthContext'

const Auth = ({ authRoute }) => {
    const { state } = useContext(AuthContext);
    const { isAuthenticated, isLoading } = state;

    let body;
    if (isLoading) {
        body = (
            <div className='d-flex justify-content-center mt-2'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    }
    else if (isAuthenticated) {
        return <Redirect to={'/dashboard'} />
    }
    else {
        body = (
            <>
                {
                    authRoute === 'login' && <LoginForm />
                }
                {
                    authRoute === 'register' && <RegisterForm />
                }
            </>
        )
    }
    return (
        <div className='landing'>
            <div className='dark-overlay'>
                <div className='landing-inner'>
                    <h1>Learn IT</h1>
                    <h4>Keep focus what you learn</h4>
                    {body}
                </div>
            </div>
        </div>
    )
}

export default Auth;