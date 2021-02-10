import { Route, Switch } from "react-router";
import { AuthenticatedProvider } from "../contexts/AuthenticatedContext";
import { UpdatedUserProvider } from "../contexts/UpdatedUserContext";
import { AlertProvider } from "../contexts/AlertContext";
import Login from "./Login";
import Home from "./Home";
import Signup from "./Signup";
import AppNav from "./AppNav";
import Error from "./Error";
import Story from "./Story";
import User from "./User";
import ArchivedStories from "./ArchivedStories";
import ArchivedStory from "./ArchivedStory";
import Landing from "./Landing";

function App() {
  return (
    <div style={{ fontFamily: "Work Sans, sans-serif", fontWeight: 100 }}>
      <AuthenticatedProvider>
        <UpdatedUserProvider>
          <AlertProvider>
            <AppNav />
            <Switch>
              <Route exact path='/' render={() => <Home />} />
              <Route exact path='/landing' render={() => <Landing />} />
              <Route exact path='/signup' render={() => <Signup />} />
              <Route exact path='/login' render={() => <Login />} />
              <Route exact path='/archive' render={() => <ArchivedStories />} />
              <Route exact path='/users/:user' render={(routeProps) => <User {...routeProps} />} />
              <Route
                exact
                path='/archive/:title'
                render={(routeProps) => <ArchivedStory {...routeProps} />}
              />
              <Route
                exact
                path='/stories/:title'
                render={(routeProps) => <Story {...routeProps} />}
              />
              <Route path='*' render={() => <Error />} />
            </Switch>
          </AlertProvider>
        </UpdatedUserProvider>
      </AuthenticatedProvider>
    </div>
  );
}

export default App;
