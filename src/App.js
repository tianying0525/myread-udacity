import React from 'react'
import './App.css'
import {
  Route,
  Switch
} from 'react-router-dom'
import Home from './Home'
import Search from './Search'
import Page404 from './Page404'

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    allBooks: []
  }

  render() {
    return (
      <div>
        <Switch>
        <Route exact path='/' render={() => (
          <Home />
        )} />

        <Route exact path='/search' render={() => (
          <Search />
        )} />

        <Route exact path='*' render={() => (
          <Page404 />
        )} />
        </Switch>
      </div>
    )
  }
}

export default BooksApp
