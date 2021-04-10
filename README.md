# react-redux-class-helper

React-Redux Class-Helper is an experimental simplifier of this popular front-end Javascript libraries combination.

## PREREQUISTES

It uses `react`, `redux` and `react-redux` libraries.

## SETUP

Copy the react-redux-class-helper.jsx to your project and use it.

> In case it gets enough attention I'll create an npm package, otherwise I'll assume it's not of value for the community.

## HOW TO USE IT

A sample RRCH initialization in an hypotetical "index.js" file might look like:

```js

import React from 'react';
import ReactDOM from 'react-dom';
import RRCH from './react-redux-class-helper'
import reducer from './reducer';
import actions from './actions';
import App from './components/App';
import settings from './settings.json';

ReactDOM.render(RRCH.initialize(actions, reducer, <App settings={settings} />), document.getElementById('root'));

```

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

* 1.0.0 [10 Apr 2021] - public release
* 0.1.0 [07 Oct 2020] - last update
* 0.0.1 [17 Sep 2020] - started coding
