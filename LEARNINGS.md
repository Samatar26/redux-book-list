# Redux
Redux is a predictable state container for JavaScript apps. It allows us to seperate the _**data**_ (Redux) contained in the application and the _**view**_(React) of our application. We centralize all of the application's data inside of a single object which is reffered to as _**state**_.

![redux-example](https://cloud.githubusercontent.com/assets/22747985/26550145/4e4b1d84-4474-11e7-8f83-6782d56104f2.png)

### Reducers
A reducer is a function that returns a piece of the application state. Our application can have many pieces of state, you can have many different reducers. In the image above, we have 2 pieces of state; A list of books and the currently selected book. We can therefore have 2 different reducers for this, one which is responsible for producing the list of books and the other would be responsible for producing the currently selected book.
![reducer example](https://cloud.githubusercontent.com/assets/22747985/26550518/0c02bc46-4476-11e7-9469-7a94837bf341.png)

The application state is just a plain JavaScript object. In the image above, the books piece of state would be produced by the Books Reducer, whereas the activeBook would be produced by the ActiveBook Reducer. _Reducers produce the value of our state_. The keys can be anything you want it to be.
