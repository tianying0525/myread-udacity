import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Link } from 'react-router-dom'
import Book from './components/Book'


class Search extends React.Component {

  constructor(props) {
    super(props);
    this.updateBook = this.updateBook.bind(this);
    this.updateQuery = this.updateQuery.bind(this);
    this.state = {
      searchBooks: [],
      allBooks: [],
      query: ''
    }
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState({
          allBooks: books
        })
      })
  }

  updateQuery(event) {
    var newQuery = event.target.value;
    this.setState({
      query: newQuery
    })
    let result = []
    if (newQuery.length !== 0) {
      BooksAPI.search(newQuery)
        .then((searchResult) => {
          if (Array.isArray(searchResult)) {
            searchResult.forEach((sBook) => {
              sBook.shelf = "";
              this.state.allBooks.forEach((aBook) => {

                if (sBook.id === aBook.id) {
                  sBook.shelf = aBook.shelf;
                }
              })
              result.push(sBook)
            })

          }
          this.setState({
            searchBooks: result
          })
        })

    } else {
      this.setState({
        searchBooks: []
      })
    }

  }

  updateBook(book, shelf) {
    var books = this.state.allBooks;
    var found = false;
    books.forEach((elem, idx) => {
      if (elem.id === book.id) {
        books[idx].shelf = shelf;
        found = true;
      }
    })

    if (!found) {
      books[book.id] = JSON.parse(JSON.stringify(book))
      books[book.id].shelf = shelf
    }
    this.setState({
      allBooks: books
    })

    BooksAPI.update(book, shelf)
  }
  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input type="text"
              value={this.state.query}
              placeholder="Search by title or author"
              onChange={this.updateQuery} />

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchBooks.map((book) => (
              <Book key={book.id} {...book} updateFunction={this.updateBook} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default Search