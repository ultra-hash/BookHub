import {Switch, Route, Redirect} from 'react-router-dom'

import ProtectedRoute from './components/ProtectedRoute'
import LoginView from './components/LoginView'
import HomeView from './components/HomeView'
import NotFoundView from './components/NotFoundView'
import BookShelvesView from './components/BookShelvesView'
import BookDetailsView from './components/BookDetailsView'
import './App.css'

const App = () => (
  <Switch>
    <ProtectedRoute exact path="/" component={HomeView} />
    <ProtectedRoute exact path="/shelf" component={BookShelvesView} />
    <ProtectedRoute exact path="/books/:id" component={BookDetailsView} />
    <Route exact path="/login" component={LoginView} />
    <Route exact path="/not-found" component={NotFoundView} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
