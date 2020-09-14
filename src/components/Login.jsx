import React, {useState, useCallback} from 'react';
import {auth, db} from '../services/firebase';
import {withRouter} from 'react-router-dom';


const Login = (props) => {
    // Estados
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [esRegistro, setEsRegistro] = useState(false);
    
    
    //funciones
    const handleSubmit = e => {
        e.preventDefault();

        if(!email.trim()){
            //console.log('Ingrese email');
            setError('Ingrese email');
            return;
        }

        if(!password.trim()){
            //console.log('Ingrese contraseña');
            setError('Ingrese contraseña');
            return;
        }

        if(password.length < 6){
            //console.log('Password debe tener al menos 6 carácteres');
            setError('La contraseña debe tener al menos 6 carácteres');
            return;
        }

        console.log('pasando todas las validaciones...');
        setError(null);
        
        if(esRegistro){
            registrar();
        }else{
            login();
        }
        
    }


    const login = useCallback( async() => {
        try {
            const res = await auth.signInWithEmailAndPassword(email, password);
            //console.log(res.user);

            // Reiniciamos los estados
            setEmail('');
            setPassword('');
            setError(null);
            // Redirecionamos a la pagina de Administador
            props.history.push('/admin');
            /* setInterval(() => {
                props.history.push('/admin');
            }, 1000) */
            
        } catch (error) {
            console.log(error);
            //console.log(error.code);
            if (error.code === 'auth/user-not-found') {
                setError('El email no existe');
            }

            if (error.code === 'auth/invalid-email') {
                setError('Email no válido');
            }

            if (error.code === 'auth/wrong-password') {
                setError('La constraseña es incorrecta'); 
            }
        }
    }, [email, password, props.history]);


    const registrar = useCallback( async() => {
        try {
            // registramos un nuevo usuario 
            const res = await auth.createUserWithEmailAndPassword(email, password);
            //console.log(res.user);
            
            // Guardamos en Firebase: creamos una bbdd llamada 'usuarios' y guardamos el usuario
            await db.collection('usuarios').doc(res.user.email).set({
                email : res.user.email,
                uid : res.user.uid
            })

            // Coleccion especifica para el usuario que se este registrando
            await db.collection(res.user.uid).add({
                name : `Tarea de ejemplo para ${res.user.email}`,
                date : Date.now()
            })
            // Reiniciamos los estados
            setEmail('');
            setPassword('');
            setError(null);

            // Redirecionamos a la pagina de login
            props.history.push('/admin');
            /* setInterval(() => {
                props.history.push('/admin');
            }, 1000) */


        } catch (error) {
            console.log(error.code);
            if (error.code === 'auth/invalid-email') {
                setError('Email no válido');
            }
            
            if (error.code === 'auth/email-already-in-use') {
                setError('El email ya está registrado'); 
            }
        }
    }, [email, password, props.history]);
    

    return (
        <div className="mt-5">
            <h3 className="text-center">
                {
                    esRegistro ? 'Registro de usuario' : 'Iniciar sesión'
                }
            </h3>
            <hr/>

            <div className="row justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-xl-4">
                    <form onSubmit={handleSubmit}>
                        {
                            error && (
                                <div className="alert alert-danger">
                                    {error}
                                </div>
                            )
                        }
                        <input 
                            type="email" 
                            className="form-control mb-2" 
                            placeholder="Ingrese un email"
                            onChange={ e => setEmail(e.target.value) }
                            value={email}
                        />

                        <input 
                            type="password" 
                            className="form-control mb-2" 
                            placeholder="Ingrese un password"
                            onChange = { e => setPassword(e.target.value) }
                            value={password}
                        />
                        
                        <button className="btn btn-dark btn-lg btn-block" type="submit">
                            {
                                esRegistro ?  'Registrarse' : 'Accerder'
                            }
                        </button>

                        <button 
                            className="btn btn-info btn-sm btn-block"
                            type="button"
                            onClick={() => {
                                setEsRegistro(!esRegistro)
                                setError(null)
                                setPassword('')
                            }}
                        >
                            {
                                esRegistro ? '¿Ya tiene una cuenta?' : '¿No tiene una cuenta?'
                            }
                        </button>
                        {
                            !esRegistro && 
                                <button 
                                    className="btn btn-danger btn-lg btn-sm mt-2" 
                                    type="button"
                                    onClick={() => props.history.push('/reset')}
                                >
                                    Recuperar contraseña    
                                </button>
                        }
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withRouter(Login); // withRouter: Nos va a generar props, history.push
