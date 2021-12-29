import './App.css';
import Homepage from './Homepage';
import {
  BrowserRouter as Router,
  Routes as Switch,
  Route,
} from "react-router-dom";
import Movie from './Movie';
import Header from './Header'

function App() {

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
