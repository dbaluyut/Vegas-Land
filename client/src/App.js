import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import "./App.css"

import Login from "./views/admin/Login"
import AuthRoute from "./features/authentication/AuthRoute"
import Logout from "./views/admin/Logout"

import WelcomeScreen from "./views/WelcomeScreen"
import About from "./views/About"
import Home from "./views/Home"
import Bars from "./views/Bars"
import Restaurants from "./views/Restaurants"
import Experiences from "./views/Experiences"
import Dashboard from "./views/admin/Dashboard"
import Update from "./views/admin/Update"
import Recommendations from "./views/Recommendations"
import RecommendationsTable from "./views/admin/RecommendationsTable"
import Feedback from "./views/Feedback"
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

        <Route path="/recommendations">
          <Recommendations />
        </Route>
        <Route path="/formSubmissionFeedback">
          <Feedback />
        </Route>

        {/* admin */}
        <Route path="/login">
          <Login />
        </Route>
        <AuthRoute path="/dashboard">
          <Dashboard />
        </AuthRoute>
        <AuthRoute path="/update">
          <Update />
        </AuthRoute>
        <AuthRoute path="/RecommendationsTable">
          <RecommendationsTable />
        </AuthRoute>
        <Route path="/logout">
          <Logout />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
