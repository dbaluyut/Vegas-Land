import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  useRouteMatch,
  useParams,
} from "react-router-dom"
import logo from "./logo.svg"
import { Counter } from "./features/counter/Counter"
import "./App.css"

import Login from "./views/admin/Login"
import AuthRoute from "./features/authentication/AuthRoute"

import WelcomeScreen from "./views/WelcomeScreen"
import About from "./views/About"
import Home from "./views/Home"
import Bars from "./views/Bars"
import Restaurants from "./views/Restaurants"
import Experiences from "./views/Experiences"
import Dashboard from "./views/admin/Dashboard"
import HappyHour from "./views/HappyHour"

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <WelcomeScreen />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/bars">
          <Bars />
        </Route>
        <Route path="/restaurants">
          <Restaurants />
        </Route>
        <Route path="/experiences">
          <Experiences />
        </Route>
        <Route path="/happyhour">
          <HappyHour />
        </Route>

        {/* admin */}
        <Route path="/login">
          <Login />
        </Route>
        <AuthRoute path="/dashboard">
          <Dashboard />
        </AuthRoute>
      </Switch>
    </Router>
  )
}

export default App
