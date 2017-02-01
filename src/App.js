import 'whatwg-fetch';
import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

// css
import './App.css';

// layouts
import AuthLayout from './layouts/AuthLayout';
import EditorLayout from './layouts/EditorLayout';
import MainLayout from './layouts/MainLayout';

// pages
import BrowseDocuments from './pages/BrowseDocuments';
import Editor from './pages/Editor';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import SingleDocument from './pages/SingleDocument';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path="/" component={MainLayout}>
          <IndexRoute component={Landing}></IndexRoute>
          <Route path="/documents" component={BrowseDocuments}></Route>
          <Route path="/documents/:id" component={SingleDocument}></Route>
        </Route>
        <Route path="/auth" component={AuthLayout}>
          <IndexRoute component={Login}></IndexRoute>
          <Route path="/auth/login" component={Login}></Route>
          <Route path="/auth/register" component={Register}></Route>
        </Route>
        <Route path="/editor" component={EditorLayout}>
          <IndexRoute component={Editor}></IndexRoute>
        </Route>
      </Router>
    );
  } // end-render
} // end-App

export default App;
