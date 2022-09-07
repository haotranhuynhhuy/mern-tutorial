import React, { useContext } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import learntItLogo from '../../assets/logo.svg'
import logoutLogo from '../../assets/logout.svg'
import Button from 'react-bootstrap/esm/Button'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
const NavbarMenu = () => {

    const { state, logoutUser } = useContext(AuthContext);
    const { user } = state;
    const logout = () => {
        logoutUser();
    }
    return (
        <Navbar expand='lg' bg='primary' variant='dark' className='shadow'>
            <Navbar.Brand className='font-weight-bolder text-white'>
                <img
                    src={learntItLogo}
                    alt='learnItLogo'
                    width='32'
                    height='32'
                    style={{ marginRight: '20px' }}
                />
                LearnIt
            </Navbar.Brand>

            <Navbar.Toggle aria-controls='basic-navbar-nav' />

            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='mr-auto'>
                    <Nav.Link
                        className='font-weight-bolder text-white'
                        to='/dashboard'
                        as={Link}
                    >
                        Dashboard
                    </Nav.Link>
                    <Nav.Link
                        className='font-weight-bolder text-white'
                        to='/about'
                        as={Link}
                    >
                        About
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className='justify-content-end'>
                <Nav>
                    <Nav.Link className='font-weight-bolder text-white justify-content-end' disabled>
                        Welcome {user.username}
                    </Nav.Link>
                    <Button
                        variant='secondary'
                        className='font-weight-bolder text-white'
                        onClick={logout}
                    >
                        <img
                            src={logoutLogo}
                            alt='logoutIcon'
                            width='32'
                            height='32'
                            style={{ marginRight: '10px' }}
                        />
                        Logout
                    </Button>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default NavbarMenu