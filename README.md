# react-redux-class-helper

React-Redux Class-Helper is an experimental simplifier of this popular front-end Javascript libraries combination.

## FEATURES

RRCH allows you to get in one place the actions, the message dispatching capabilities (synchronous and asynchronous) and store access in just one place, plus reducing the code required for all that.

## SETUP

### PREREQUISITES

It uses `react`, `redux` and `react-redux` libraries.

### COPY

Copy the react-redux-class-helper.js to your project and use it.

> In case it gets enough attention I'll create an npm package and create more detailed documentation, otherwise I'll assume it's not of value for the community.

## USAGE

The RRCH requires you to initialize it passing to it's initialization routine the actions, the reducer and the App root you will use, and it's result is what you will pass to the ReactDOM.render routine.

NOTE: the following examples assume you copied the RRCH file to your project's root.

### RRCH Initialization [RRCH.initialize(...)]

A sample RRCH initialization in an hypotetical "index.js" file might look like:

```js

import React from 'react';
import ReactDOM from 'react-dom';
import RRCH from './react-redux-class-helper';
import reducer from './reducer';
import actions from './actions';
import App from './components/App';
import settings from './settings.json';

ReactDOM.render(RRCH.initialize(actions, reducer, <App settings={settings} />), document.getElementById('root'));

```

Note that the actions are just like the regular ones:

```js
export default {
    AN_ACTION: 'AN_ACTION',
    ANOTHER_ACTION: 'ANOTHER_ACTION'
};
```

and the reducer is like the regular one too:

```js
import RRCH from './react-redux-class-helper';
import actions from './actions';

const INITIAL_STATE = ...;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actions.AN_ACTION:
            ... // NOTE: here you can call do async dispatches of messages using RRCH.asyncDispatch({ type: actions.SOME_ACTION, value: "some value" })
            return state;
        ...
        default:
            return state;
    }
}
*/

```

### Class Extension [... extends RRCH]

Following that example, a sample RRCH class extension in a the hypotetical "App.jsx" (note that the dispatch routine is provided on the *afterMounting* override) might look like:

```js

import React from 'react';
import RRCH from '../react-redux-class-helper';
import MainView from './MainView';

export default class App extends RRCH {
	afterMounting = dispatch => dispatch({
		type: RRCH.actions.AN_ACTION, target: "file.txt"
	});

	render = () => (<div className="App"><MainView settings={this.props.settings} /></div>);
};

```

### Store Full-Connection [RRCH.connected(...)]

And for all the views/controls/widgets you want to create you can fully connect the store (accessing it's keys like usual: via *this.props.key*) to them like this:

```js

import React from 'react';
import RRCH from '../react-redux-class-helper';

export default RRCH.connected(class SampleWidget extends RRCH {
	afterMounting = () => this.props.dispatch({
		type: RRCH.actions.ANOTHER_ACTION, aParam: this.props.aField
	});
	...
}

```

### Store Partial-Connection [RRCH.connecting(...)]

Or just to connect some of the keys available in the store (being accessed like usual: via *this.props.key*) like this:

```js

import React from 'react';
import RRCH from '../react-redux-class-helper';

export default RRCH.connecting(['text'], class SampleInput extends RRCH {
	handleChange = (e) => this.props.dispatch({ type: RRCH.actions.SET_TEXT, text: e.target.value });

	render = () => (<input type="text" value={this.props.text} onChange={this.handleChange} />);
});

```

## HISTORY

* 1.0.1 [23 Apr 2021] - adopted isArray
* 1.0.0 [10 Apr 2021] - public release
* 0.1.0 [07 Oct 2020] - last update
* 0.0.1 [17 Sep 2020] - started coding
