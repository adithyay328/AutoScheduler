import './App.less';
//import 'antd/dist/antd.css'; - Not needed now
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Auth from './components/auth/Auth';
import Landing from './components/landing/Landing';
import Home from './components/home/Home';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/auth">
            <Auth />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
          {/* change homeauth to home with redirect once we have auth complete */}
          <Route path="/homeauth"> 
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
