import Authication from "./Componets/Authication";
import {Route,Switch} from "react-router-dom";
import './App.css';
import Welcome from './Componets/Pages/Welcome';

function App() {
  return (
    <>
    <Switch>
    <Route path="/auth" exact>
    <Authication/>
    
    </Route>
    <Route path="/">
      <Welcome/>
    </Route>
    </Switch>
    </>
  );
}

export default App;
