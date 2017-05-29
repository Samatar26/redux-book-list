# Redux
Redux is a predictable state container for JavaScript apps. It allows us to seperate the _**data**_ (Redux) contained in the application and the _**view**_(React) of our application. We centralize all of the application's data inside of a single object which is reffered to as _**state**_.

![redux-example](https://cloud.githubusercontent.com/assets/22747985/26550145/4e4b1d84-4474-11e7-8f83-6782d56104f2.png)

### Reducers
A reducer is a function that returns a piece of the application state. Our application can have many pieces of state, you can have many different reducers. In the image above, we have 2 pieces of state; A list of books and the currently selected book. We can therefore have 2 different reducers for this, one which is responsible for producing the list of books and the other would be responsible for producing the currently selected book.
![reducer example](https://cloud.githubusercontent.com/assets/22747985/26550518/0c02bc46-4476-11e7-9469-7a94837bf341.png)

The application state is just a plain JavaScript object. In the image above, the books piece of state would be produced by the Books Reducer, whereas the activeBook would be produced by the ActiveBook Reducer. _Reducers produce the value of our state_. The keys can be anything you want it to be.
```js
import { combineReducers } from 'redux';
import BooksReducer from './reducer_books';
const rootReducer = combineReducers({
  books: BooksReducer,
});

export default rootReducer;
```

Reducers get 2 arguments, the current state and action. Reducers only get called when an action occurs. The state argument is not the application state, but only the state the reducer is responsible for. The same state produced by these reducers is flowing back into it whenever an action occurs, e.g. BooksReducer is only responsible for the books piece of state. When no book is selected and the app is booted up for the first time, state doesn't exist yet, therefore we will set state to null initially when it's undefined.
```js
export default function(state = null, action) {
  switch (action.type) {
    case 'BOOK_SELECTED':
      return action.payload;
  }
  return state;
}
```


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

### Actions
![Actions](https://cloud.githubusercontent.com/assets/22747985/26552802/a611b22e-4480-11e7-87fc-ca06a5785f80.png)
An event, e.g. a user clicking on a button, or an Ajax request finishing loading up can call an action creator. An action creator is function which returns an action and an action is just an object that flows throughall of our different reducers.

E.g. user clicks on book 2, causes the action creator to be called, which is just a function that returns an object. This object is sent to all the reducers within our application. Reducers can choose depending on the action to return a different piece of state depending on the action. That newly returned piece of state gets piped into the application state and that application state is pumped back into our react application whih causes all of our components to rerender.

## Binding Action creators
In our container the frst thing we want to do is import the action creator.
Second thing we want to do is import a function called bindActionCreators from Redux which makes sure that the action generated by the action creator (return value form selectBook) flows through all of our different reducers.

Inside of mapDispatchToProps, bindActionCreators knows that we are going to call our action creator selectBook and the dispatch function is what takes all of the actions(return value of action creators) and passes it down to all of our different reducers in our application. So the purpose of bindActionCreators and dispatch is to take the return value of our action creator and pass it down to all of our different reducers.

The return value from mapDispatchToProps, whatever the first argument is will end up as props on our BookList container.


```js
/// Action creator
export function selectBook(book) {
  return {
    type: 'BOOK_SELECTED',
    payload: book,
  }
}


//BookList container
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectBook } from '../actions/index';
import { bindActionCreators } from 'redux';
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

//Anything returned from this function will end up as props/
// on the BookList container
function mapDispatchToProps(dispatch) {
  // Whenever selectBook is called, the result should be passed
  //To all of our reducers
  return bindActionCreators({ selectBook: selectBook }, dispatch);
}

//Promote BookList from a component to a container - it needs to know
// about this new dispatch method, selectBook. Make it available as a prop
export default connect(mapStateToProps, mapDispatchToProps)(BookList);

```

The action creator returns an object which is our actual action. An action usually has two values, a _**type**_ and a _**payload**_. The type describes the purpose of the action and the payload further describes/clarifies the conditions of the action being triggered.

Conclusion of Redux Cycle - We tied an action creator to our book list items. Whenever a user clicks on a book list item it called an action creator which dispatched an action. That actions was automatically sent to all of our different reducers, for the reducers that carried that particular action they returned a piece of state that was assembled as the global application state. This global application state was injected back into all of the different containers inside of our application which caused them to rerender and caused our view to update! 
