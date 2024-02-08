import {BrowserRouter, Switch, Route} from 'react-router-dom'

import LoginPage from './components/LoginPage'
import HomePage from './components/HomePage'
import NotFound from './components/NotFound'
import UserProfile from './components/UserProfile'
import MyProfile from './components/MyProfile'
import SearchResults from './components/SearchResults'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={LoginPage} />
      <ProtectedRoute exact path="/" component={HomePage} />
      <ProtectedRoute exact path="/search" component={SearchResults} />
      <ProtectedRoute exact path="/profile" component={MyProfile} />
      <ProtectedRoute exact path="/user/:id" component={UserProfile} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
)

export default App
