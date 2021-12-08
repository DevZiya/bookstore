import './App.css'
import { BrowserRouter as Router, Route,Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from './pages/Cart/Cart';

function App() {
  return (
    <div className='App'>
      <Router>
      <Switch>
        <Route path='/:pageCount' exact component={Home} />
        <Route path='/cart'  component={Cart} />
      </Switch>
    </Router>
    </div>
  );
}

export default App;
