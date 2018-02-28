# Building Your First React app

This workshop covers the fundamentals of React.  

This app called "Catch of the Day is an real-time app for a trendy seafood market where price and quantity available are variable and can change at a moment's notice. 


This application is from a great course called [React For Beginners](https://reactforbeginners.com/) by Wes Bos. Please have a look at his training courses [here](http://wesbos.com/courses/).


## **Setup**


### Get the application
```sh
git clone https://github.com/jcdesousa/react-first-app.git react-first-app
```

### Install the dependencies

Go to the project directory and install the dependencies.

```sh
cd react-first-app
npm install
```

## **Commands**

### Serve the application
```sh
npm start
```

Starts the app in development mode, watches the source files, reloads the page if changes are made to the code and shows build errors and lint warnings in the console.

Open `http://localhost:3000` to view it in the browser.

### Build

```sh
npm build
```

Builds the app for production to the build folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
By default, it also includes a service worker so that your app loads from local cache on future visits.

Your app is ready to be deployed.

### Running tests
```sh
npm test
```
Runs the test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

[Read more about testing.](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#running-tests)


----

## **Your First React App**
## 1 - Go to the Store

When the form is submitted, we need to get the text from the input box and transition from the url `/` to `/store/:storeId`.



Open `StorePicker` and change the method `goToStore`.

```js
// src/components/StorePicker.js

  goToStore = (event) => {
    event.preventDefault();
    const storeId = this.storeInput.value;

    this.props.history.push(`/store/${storeId}`);
  }
```


The ref attribute takes a callback function, and the callback will be executed immediately after the component is mounted or unmounted.
Using the ref callback just to set a property on the class is a common pattern for accessing DOM elements.

We need to listen for an submit event on the form and call `goToStore` when it.

```html
<!-- src/components/StorePicker.js -->

<form className="store-selector" onSubmit={this.goToStore}>
```
We need to import the `App` component and create a parameterized route in `index.js` that matches the path pattern to render the component.

```js
// src/index.js
import App from './components/App';

```

```js
// src/index.js

<Route path="/store/:storeId" component={App} />
```
### 2 - Our First Component

#### Create a `Fish` component to show our fish info. 

```js
// src/components/Fish.js

import React from 'react';
import { formatPrice } from '../helpers';


class Fish extends React.Component {
  render() {
    const { details, index } = this.props;
    const isAvailable = details.status === 'available';
    const buttonText = isAvailable ? 'Add To Order' : 'Sold Out!';

    return (
      <li className="menu-fish">
        <img src={details.image} alt={details.name} />
        <h3 className="fish-name">
          {details.name}
          <span className="price">{formatPrice(details.price)}</span>
        </h3>
        <p>{details.desc}</p>
        <button onClick={() => this.props.addToOrder(index)} disabled={!isAvailable}>{buttonText}</button>
      </li>
    )
  }
}

export default Fish;
```

#### List all the Fishes

In our `App` component, we need to show all the fishes in our store. On the `render` method, add an list of `Fish` components. Import the `Fish` component.

```js
// src/components/App.js

import Fish from './Fish';
```

To render multiple items in React, we pass an `array of React elements`. The most common way to build that array is to map over your array of data. Let’s do that in the `render` method of `App`:

```js
// src/components/App.js

<ul className="list-of-fishes">
    {
      Object.keys(this.state.fishes)
        .map(key => (
          <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />
        ))
    }
</ul>
```

`key` is a special property that’s reserved by React. When an element is created, React pulls off the key property and stores the key directly on the returned element. React uses the key automatically while deciding which children to update; there is no way for a component to inquire about its own key.

### 4 - Update the State with Sample Fishes

React components can have state by setting `this.state` in the constructor, which should be considered private to the component. 

In this aplication the state is stored in the `App` component and then passed to the children components via props.

Import the `samplesFishes`.

```js
// src/components/App.js

import sampleFishes from '../sample-fishes';
```

Create a method called `loadSamples` that updates the state with the samples fishes.

```js
// src/components/App.js

loadSamples = () => {
    this.setState({
        fishes: sampleFishes
    });
}
```

Whenever `this.setState` is called, an update to the component is scheduled, causing React to merge in the passed state update and rerender the component along with its descendants. 
When the component rerenders, `this.state.fishes` will be an array of the sample fishes so you’ll see it updated in the list.


We need to add a button to the inventory pannel to load the samples fishes when is clicked.
The usual pattern here is pass down a function from `App` to `Inventory` that gets called when the `Load Samples Fishes` button is clicked.
```js
// src/components/App.js

<Inventory
    addFish={this.addFish}
    removeFish={this.removeFish}
    loadSamples={this.loadSamples}
    fishes={this.state.fishes}
    updateFish={this.updateFish}
  />
```

After the `AddFishForm` component inside of the render method of `Inventory` component, add a `Load Sample Fishes` button with a click event that invokes the method named `loadSamples` passed by the `props`.
```js
// src/components/Inventory.js
    
<button onClick={this.props.loadSamples}>Load Sample Fishes</button>
```


### 5 - Functional Components 
React supports a simpler syntax called **functional components** for component types like `Header` that only consist of a `render` method. Rather than define a `class extending React.Component`, simply write a function that takes `props` and returns what should be rendered.

Replace the whole `Header` class with this function:
```js
// src/components/Header.js

import React from 'react';

const Header = (props) => {
  return (
    <header className="top">
      <h1>
        Catch
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
        Day
      </h1>
      <h3 className="tagline"><span>{props.tagline}</span></h3>
    </header>
  )
}

export default Header;
```

You’ll need to change `this.props.tagline` to `props.tagline`. Many components in your apps will be able to be written as `functional components` these components tend to be easier to write and React will optimize them more in the future.

#### 5 - PropTypes

As your app grows, you can catch a lot of bugs with typechecking. For some applications, you can use JavaScript extensions like Flow or TypeScript to typecheck your whole application. But even if you don’t use those, React has some built-in typechecking abilities. To run typechecking on the props for a component, you can assign the special propTypes property.

Import the `PropTypes`.

```js
// src/components/Header.js

import PropTypes from 'prop-types';
```

On the `Header` component set the prop `tagline` to type `string` and `required`

```js
Header.propTypes = {
  tagline: PropTypes.string.isRequired
};
```

On the `Inventory` component set the prop `loadSamples` as a `function` and `required`

```js
Inventory.propTypes = {
  fishes: PropTypes.object.isRequired,
  updateFish: PropTypes.func.isRequired,
  removeFish: PropTypes.func.isRequired,
  addFish: PropTypes.func.isRequired,
  loadSamples: PropTypes.func.isRequired,
};
```

## See it run
You're at the end of your journey, and you've accomplished a lot. **Congrats, You are awesome!**
