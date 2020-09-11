import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import {auth} from '../services/firebase';
import {withRouter} from 'react-router-dom';


const Navbar = (props) => {

    const cerrarSesion = () => {
        auth.signOut()
            .then(() => {
                props.history.push('/login')
            })
    }


    return (
        <div className="navbar navbar-dark bg-dark">
            
            <Link to="/login" className="navbar-brand">AUTH</Link>

            <div>
                <div className="d-flex">
                    {/* <NavLink to="/" exact className="btn btn-dark mr-2">
                        Inicio
                    </NavLink> */}
                    {
                        props.firebaseUser !== null ? (
                            <NavLink to="/admin" className="btn btn-dark mr-2">
                                Admin
                            </NavLink>
                        ) : null
                    }
                    {
                        props.firebaseUser && ( 
                            <button  className="btn btn-link mr-2">
                                {props.firebaseUser.email}
                            </button>
                        )
                    }
                    {
                        props.firebaseUser !== null ? (
                            <button 
                                className="btn btn-outline-warning btn-sm mr-2"
                                onClick={ () => cerrarSesion() }
                            >
                                Cerrar sesión
                            </button>
                        ) : (
                            <NavLink to="/login" className="btn btn-dark mr-2">
                                Login
                            </NavLink>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default withRouter(Navbar);
