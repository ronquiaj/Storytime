import Home from './Home';
import Signin from './Signin';
import AppNav from './AppNav';
import Error from './Error';
import { Container } from 'react-bootstrap';
import { Route, Switch } from 'react-router';

function App() {
  
  return (
    <div>
      <AppNav/>
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: '400px' }}>
          <Switch>
            <Route exact path="/" render={() => <Home/>}/>
            <Route exact path="/signin" render={() => <Signin/>}/>
            <Route path = "*" render={() => <Error/>}/>
          </Switch>
        </div>
      </Container>
    </div>
   
  )
}

export default App;
