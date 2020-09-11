import React, {useEffect, useState} from 'react';
import {auth} from '../services/firebase';
import {withRouter} from 'react-router-dom';
import Firestore from './Firestore';



const Admin = (props) => {
    // Estados
    const[usuario, setUsuario] = useState(null);
   

    useEffect( () =>{
        if (auth.currentUser) {
            console.log('existe un usuario');
            setUsuario(auth.currentUser);
        }else{
            console.log('no existe el usuario');
            props.history.push('/login');
        }
    }, [props.history]);


    return (
        <div>
            <h2 className="text-center mt-2 mb-4">Rutas protegidas</h2>
            {
                usuario && (
                    <Firestore user = {usuario}/>
                )
            }

        </div>
    )
}

export default withRouter(Admin);
