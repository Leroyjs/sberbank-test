import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import todoApp from './redux/reducers.js';

let store = createStore(todoApp);
const storage = localStorage;

store.subscribe(
    () => (storage.initialState = JSON.stringify(store.getState()))
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
