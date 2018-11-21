import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from 'jwt-decode';
import './index.css';
import * as APIUtil from './redux/session.actions';

import configureStore from './store';
import Root from './components/Root';
import * as serviceWorker from './serviceWorker';

document.addEventListener('DOMContentLoaded', () => {
    let store = configureStore();

    // check for token
    if (localStorage.jwtToken) {
        // set AuthToken
        APIUtil.setAuthToken(localStorage.jwtToken);

        // decode token
        const decoded = jwt_decode(localStorage.jwtToken);

        // set user & isAuthenticated
        store.dispatch(APIUtil.setCurrentUser(decoded));

        // check for expired token
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
            // logout user
            store.dispatch(APIUtil.logoutUser());

            // redirect to login page
            window.location.href = '/login';
        }
    };

    ReactDOM.render(<Root store={store} />, document.getElementById("root"));
    serviceWorker.unregister();
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() above. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
