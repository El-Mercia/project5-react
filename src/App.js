import React from 'react';
import Nav from 'react-bootstrap/Nav';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';
import Home          from './pages/Home';
import CreateArticle from './pages/CreateArticle';
import DeleteArticle from './pages/DeleteArticle';
import NotFound      from './pages/NotFound';


const App = () => {
  return (
    <Router>
      <Nav>
        <Nav.Item>
          <Nav.Link as={Link}  to="/">
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/articles/create">
            Create article
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to="/articles/delete">
            Delete article
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Switch>
        <Route exact path="/"          component={Home} />
        <Route path="/articles/create" component={CreateArticle}  />
        <Route path="/articles/delete" component={DeleteArticle}  />  
        <Route path="*"                component={NotFound} /> 
      </Switch>
    </Router>
 );
}

export default App;
