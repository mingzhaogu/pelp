import axios from 'axios';
import jwt_decode from 'jwt-decode';

const $ = window.$;

export const GET_ERRORS = 'GET_ERRORS';
export const CLEAR_ERRORS = 'CLEAR_ERRORS';
export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';


// SET REQUEST HEADER
export const setAuthToken = token => {
    if (token) {
        // Apply to every request
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        // Delete auth header
        delete axios.defaults.headers.common['Authorization'];
    }
};

// REGISTER USER
export const registerUser = (userData, history) => dispatch => {
    axios
        .post('api/users/register', userData)
        .then(res => {
            // extract token
            const { token } = res.data;

            // save token to localStorage
            localStorage.setItem('jwtToken', token);

            // setAuthToken with extracted token
            setAuthToken(token);

            // decode token for userData
            const decoded = jwt_decode(token);

            // set currentUser
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// LOGIN USER - get user token
export const loginUser = userData => dispatch => {
    axios
        .post('api/users/login', userData)
        .then(res => {
            const { token } = res.data;
            localStorage.setItem('jwtToken', token);
            setAuthToken(token);
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        })
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};

// SET CURRENTUSER
export const setCurrentUser = decoded => {
    return {
        type: RECEIVE_CURRENT_USER,
        payload: decoded
    };
};

// LOGOUT CURRENTUSER
export const logoutUser = () => dispatch => {
    // remove token from localStorage
    localStorage.removeItem('jwtToken');

    // remove AuthToken from headers;
    setAuthToken(false);

    // set currentUser to {}
    dispatch(setCurrentUser({}));
};