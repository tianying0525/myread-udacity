import React from 'react'

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.updateBookShelf = this.updateBookShelf.bind(this);
  }

  updateBookShelf(event) {
    var selectedShelf = event.target.value;
    this.props.updateFunction(this.props, selectedShelf);

  }
  render() {

    return (

      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url("${this.props.imageLinks ? this.props.imageLinks.thumbnail : ' '}")` }}></div>
            <div className="book-shelf-changer">
              <select value={this.props.shelf} onChange={this.updateBookShelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{this.props.title}</div>
          <div className="book-authors">{this.props.authors ? this.props.authors.join(', ') : 'No Author'}</div>
        </div>
      </li>
    )

  }



}


export default Book