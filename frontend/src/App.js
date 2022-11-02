import React, { Component } from 'react';
import {
  Route,
  Switch,
  withRouter
} from 'react-router-dom';

// Import Components 
import Search from './components/Search';
import Upload from './components/Upload';
import Nav from './components/Nav';
import PhotoContainer from './components/PhotoContainer';
import PageNotFound from './components/PageNotFound';

/**
 * App component handles all routes and rendered elements to the DOM.
 * @namespace App
 * @extends React Component
 */
class App extends Component { 

  /**
   * Renders all components
   * @memberof App component
   * @return {string} - JSX element
   */
  render() {
    return (
      <div className="main_section">
        <div className="sidebar">
          <Nav />
        </div>
        <div className='main_contents'>
          <div className='header_sec'>
            <Search {...this.props}/>
            <Upload {...this.props}/>
          </div>
        </div>
      <div className="container">
          <Switch>
            <Route exact path="/" component={PhotoContainer} />
            <Route path="/search/:query" component={PhotoContainer} />
            <Route component={PageNotFound} />
          </Switch>
      </div>
      </div>
    )
  }
}

export default withRouter(App);
