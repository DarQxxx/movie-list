import './App.css';
import Homepage from './Homepage';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Movie from './Movie';
import Header from './Header'
import { useDispatch } from 'react-redux';
import { dataAction, loginAction, logoutAction } from './actions';
import { useEffect } from 'react';
import firebase from 'firebase/compat/app';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        dispatch(
          dataAction({ name: user.displayName, url: user.photoURL, email: user.email })
        )
        dispatch(loginAction())
        
      } else {
        dispatch(
          dataAction({ name: null, url: null, email: null })
        )
        dispatch(logoutAction())
        
      }
    })
  }, [])

  return (

    <Router>
    <Header></Header>

      <Switch>
        <Route path="/" element={<Homepage/>}/>
        <Route path="/:movieId" element={<Movie/>}/>
      </Switch>
    </Router>
  );
}

export default App;
