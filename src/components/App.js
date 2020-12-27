import { Route, Switch } from 'react-router';
import { AuthenticatedProvider } from '../contexts/AuthenticatedContext';
import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import AppNav from './AppNav';
import Error from './Error';
import Story from './Story';


function App() {
  
  return (
    <div>
      <AuthenticatedProvider>
        <AppNav/>
            <Switch>
                <Route exact path="/" render={() => <Home/>}/>
                <Route exact path="/signup" render={() => <Signup/>}/>
                <Route exact path="/login" render={() => <Login/>}/>
                <Route path ="/stories/:title" render={routeProps => <Story {...routeProps}/>}/>
                <Route path = "*" render={() => <Error/>}/>
            </Switch>
      </AuthenticatedProvider>
    </div>
   
  )
}

export default App;
