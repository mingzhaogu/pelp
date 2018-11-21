import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { registerUser } from '../../redux/session.actions';
import Gateway from './Gateway';

const mapStateToProps = ({ errors }) => ({
    errors: errors.session,
    formType: 'signup',
    navLink: <Link to='/login'>Log in instead.</Link>
});

const mapDispatchToProps = dispatch => ({
    processForm: user => dispatch(registerUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Gateway);