import React, {useState, useEffect} from 'react';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Login from './components/Login';
import Admin from './components/Admin';
import{auth} from './services/firebase';

function App() {
  const [firebaseUser, setFirebaseUser] = useState(false); // Nuestro usuario parte en falso

  //Para saber si hay o no un usuario activo
  useEffect( () => {
    auth.onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        setFirebaseUser(user);
      }else{
        //
        setFirebaseUser(null);
      }
    })
  }, []);


  return firebaseUser !== false ? (
    <BrowserRouter>
      <div className="container">
        <Navbar firebaseUser={firebaseUser}/>
        
        <Switch>
          <Route path="/login">
            <Login/>
          </Route>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/">
            inicio...
          </Route>
        </Switch>
      </div>
    
    </BrowserRouter>
  ) : (
    <p>Cargando...</p>
  )
}

export default App;
