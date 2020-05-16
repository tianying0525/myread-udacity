import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './components/Shelf'

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.updateBook = this.updateBook.bind(this);
        this.state = {
            allBooks: []
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

    updateBook(book, shelf) {
        var books = this.state.allBooks;
        books.forEach((elem, idx) => {
            if (elem.id === book.id) {
                books[idx].shelf = shelf;
            }
        })

        this.setState({
            allBooks: books
        })
    }
    render() {
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <div className="list-books-content">
                    <div>
                        <Shelf status="Currently Reading"
                            books={this.state.allBooks.filter((book) => book.shelf === 'currentlyReading')}
                            update={this.updateBook} />
                        <Shelf status="Currently Reading"
                            books={this.state.allBooks.filter((book) => book.shelf === 'wantToRead')}
                            update={this.updateBook} />
                        <Shelf status="Currently Reading"
                            books={this.state.allBooks.filter((book) => book.shelf === 'read')}
                            update={this.updateBook} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home