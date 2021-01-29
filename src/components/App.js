import { Route, Switch } from 'react-router';
import { AuthenticatedProvider } from '../contexts/AuthenticatedContext';
import { UpdatedUserProvider } from "../contexts/UpdatedUserContext";
import Login from './Login';
import Home from './Home';
import Signup from './Signup';
import AppNav from './AppNav';
import Error from './Error';
import Story from './Story';
import User from './User';
import EditUser from './EditUser';

function App() {
  
  return (
    <div style={{ fontFamily: "Work Sans, sans-serif", fontWeight: 100 }}>
      <AuthenticatedProvider>
        <UpdatedUserProvider>
          <AppNav />
          <Switch>
            <Route exact path="/" render={() => <Home />} />
            <Route exact path="/signup" render={() => <Signup />} />
            <Route exact path="/login" render={() => <Login />} />
            <Route
              exact
              path="/users/:user"
              render={(routeProps) => <User {...routeProps} />}
            />
            <Route
              exact
              path="/users/:user/edit"
              render={(routeProps) => <EditUser {...routeProps} />}
            />
            <Route
              exact
              path="/stories/:title"
              render={(routeProps) => <Story {...routeProps} />}
            />
            <Route path="*" render={() => <Error />} />
          </Switch>
        </UpdatedUserProvider>
      </AuthenticatedProvider>
    </div>
  );
}

export default App;
