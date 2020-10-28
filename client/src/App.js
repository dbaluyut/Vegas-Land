import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';


function Dashboard() {
  return (
    <h1>dash</h1>
  )
}

function App() {
  return (
    <div >
      
    </div>
  );
}

<Router>
  <Switch>
    <Route exact path="/login">
      <Login />
    </Route>
    <AuthRoute path="/dashboard">
      <Dashboard />
    </AuthRoute>
  </Switch>
</Router>


export default App;
