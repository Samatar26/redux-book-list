import React, { Component } from 'react';
import { connect } from 'react-redux';
import uuid from 'uuid/v4';

class BookList extends Component {
  renderList() {
    return this.props.books.map(book => {
      return <li className="list-group-item" key={uuid()}>{book.title}</li>;
    });
  }
  render() {
    return (
      <ul className="list-group col-sm-4">
        {this.renderList()}
      </ul>
    );
  }
}

function mapStateToProps(state) {
  // Whatever is returned will show up as props
  //inside of BookList
  return {
    books: state.books,
  };
}

export default connect(mapStateToProps)(BookList);
