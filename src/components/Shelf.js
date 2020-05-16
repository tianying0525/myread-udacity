import React from 'react'
import Book from './Book'

class Shelf extends React.Component {
    render() {



        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.props.status}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {this.props.books.map((book) => (
                            <Book key={book.id} {...book} updateFunction={this.props.update} />
                        ))}
                    </ol>
                </div>
            </div>

        )

    }



}


export default Shelf