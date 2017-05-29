# Redux
Redux is a predictable state container for JavaScript apps. It allows us to seperate the _**data**_ (Redux) contained in the application and the _**view**_(React) of our application. We centralize all of the application's data inside of a single object which is reffered to as _**state**_.

![redux-example](https://cloud.githubusercontent.com/assets/22747985/26550145/4e4b1d84-4474-11e7-8f83-6782d56104f2.png)

### Reducers
A reducer is a function that returns a piece of the application state. Our application can have many pieces of state, you can have many different reducers. In the image above, we have 2 pieces of state; A list of books and the currently selected book. We can therefore have 2 different reducers for this, one which is responsible for producing the list of books and the other would be responsible for producing the currently selected book.
![reducer example](https://cloud.githubusercontent.com/assets/22747985/26550518/0c02bc46-4476-11e7-9469-7a94837bf341.png)

The application state is just a plain JavaScript object. In the image above, the books piece of state would be produced by the Books Reducer, whereas the activeBook would be produced by the ActiveBook Reducer. _Reducers produce the value of our state_. The keys can be anything you want it to be.

### Containers
In order to pass in our application state from redux to react we have to use a library called react-redux which acts as bridge between React and Redux.
In order to make use of this library we have to change our component to a _container_.
A container is a React component that has a direct connection to the state that is managed by Redux. They're also called _Smart_ components.

You might be wondering which components should be turned into containers. _**In general you want the most parent component that cares about a particular piece of state to be a container.**_ This may not necessarily have to be App.js, because it doesn't really care about the list of books. Booklist does. The only job of App.js is to render BookList and BookDetail. Therefore App should be a dumb component, and BookList and BookDetail should be smart components.
![smart_components](https://cloud.githubusercontent.com/assets/22747985/26551532/f41d7a94-447a-11e7-8429-871340112652.png)

How do we create a smart component?

First we will have to import the connect method from the react-redux library which acts as a bridge between the two libraries.

Beneath the component class we will have to create a function whose first argument is the state and it returns an object that is available to our component as this.props.

We then want to export the container by calling the connect method which takes a function and a component and produces a _**container**_. A component that is aware of the state that is contained by Redux.


```js
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

```
