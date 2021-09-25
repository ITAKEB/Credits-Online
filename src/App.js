import './App.css';
import CreditsView from './sections/CreditsView';
import CreditForm from './sections/CreditForm';
import CreditUpdate from './sections/CreditUpdate';
import CreditView from './sections/CreditView';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div >
      <Router>
        <Switch>
          <Route path="/create-credit">
            <CreditForm/>
          </Route>
          <Route path="/edit-credit/:type/user/:id" component={CreditUpdate}/>
          <Route path="/credit-view/:type/user/:id" component={CreditView}/>
          <Route path="/">
            <CreditsView />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
