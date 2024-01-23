import {Switch, Route, Redirect} from 'react-router-dom'
import Home from './components/Home'
import Bookshelves from './components/Bookshelves'
import BookDetails from './components/BookDetails'
import Login from './components/Login'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/shelf" component={Bookshelves} />
    <Route exact path="/books/:id" component={BookDetails} />
    <Route exact path="/login" component={Login} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect path="/not-found" />
  </Switch>
)

export default App
