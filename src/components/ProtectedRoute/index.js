import {Route, Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'

function ProtectedRoute(props) {
  const jwtToken = Cookie.get('jwt_token')
  if (!jwtToken) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}

export default ProtectedRoute
