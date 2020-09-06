import React, {useEffect, useState} from 'react';
import {auth} from '../services/firebase';
import {withRouter} from 'react-router-dom';



const Admin = (props) => {
    // Estados
    const[usuario, setUsuario] = useState(null);
   

    useEffect( () =>{
        if (auth.currentUser) {
            console.log('existe un usuario');
            setUsuario(auth.currentUser);
        }else{
            console.log('no existe el usuario');
            setUsuario(null);
            props.history.push('/login');
        }
    }, [props.history]);


    return (
        <div>
            <h2>Rutas protegidas</h2>
            {
                usuario && (
                    <h3>{usuario.email}</h3>
                )
            }

        </div>
    )
}

export default withRouter(Admin);
