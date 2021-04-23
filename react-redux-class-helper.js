// React-Redux Class-Helper by Javier Santo Domingo

import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

const STATE_MAPPERS = {
    ALL_TO_PROPS: () => state => Object.assign({}, state),
    SOME_TO_PROPS: (keys) => state => { const n = {}; keys.forEach(key => n[key] = state[key]); return n; }
};

const CONNECTOR_MAKERS = {
    FULL: () => connect(STATE_MAPPERS.ALL_TO_PROPS()),
    PARTIAL: (keys) => connect(STATE_MAPPERS.SOME_TO_PROPS(keys))
};

const HELPER_ROUTINES = {
    CONNECTOR_SELECTOR: (keys, klass) => (Array.isArray(keys) ? CONNECTOR_MAKERS.PARTIAL(keys) : CONNECTOR_MAKERS.FULL())(klass),
    DEFAULT_PROVIDER: (content) => React.createElement(Provider, { store: RRCH.store }, content), // NOTE: equivalent to the JSX expression (<Provider store={RRCH.store}>{content}</Provider>)
    ASYNC_DISPATCHER: (data) => setTimeout(() => RRCH.store.dispatch(data))
};

class AutobindableReactComponent extends React.Component {
	constructor(props) {
        super(props);
        // NOTE: methods autobinding is provided for convenience
		Object.getOwnPropertyNames(Object.getPrototypeOf(this)).forEach(method => this[method] = this[method].bind(this));
	}
}

export default class RRCH extends AutobindableReactComponent {
    static VERSION = '1.0.1';

    static store = null;

    static actions = null;

    static connected = CONNECTOR_MAKERS.FULL();

    static connecting = HELPER_ROUTINES.CONNECTOR_SELECTOR;

    static asyncDispatch = HELPER_ROUTINES.ASYNC_DISPATCHER;

    static provide = HELPER_ROUTINES.DEFAULT_PROVIDER;

    static initialize(actions, reducer, content) {
        RRCH.actions = actions;
        RRCH.store = createStore(reducer);
        if (content) {
            return RRCH.provide(content);
        }
    }

	componentDidMount() {
        // NOTE: dispatch is provided as parameter just in case you do not "connect" your instance to the store but still want to dispatch an action after mounting ocurrs
        this.afterMounting(this.props.dispatch || RRCH.store.dispatch);
    }

    afterMounting(dispatch) {
        // NOTE: override this method
    }
}
