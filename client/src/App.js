import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Landing from './components/layout/Landing';
import Auth from './views/Auth';
import AuthContextProvider from './context/AuthContext';
import Dashboard from './views/Dashboard';
import ProtectedRoute from './components/routing/ProtectedRoute';
import About from './views/About';
import PostContextProvider from './context/PostContext';
function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <Router>
          <Switch>
            <Route exact path={'/'} component={Landing} />
            <Route path={'/login'} render={props => <Auth {...props} authRoute={'login'} />} />
            <Route path={'/register'} render={props => <Auth {...props} authRoute={'register'} />} />
            <ProtectedRoute path={'/dashboard'} component={Dashboard} />
            <ProtectedRoute path={'/about'} component={About} />
          </Switch>
        </Router>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;
