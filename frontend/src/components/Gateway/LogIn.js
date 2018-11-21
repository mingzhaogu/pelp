import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginUser } from '../../redux/session.actions';
import Gateway from './Gateway';

const mapStateToProps = ({ errors }) => ({
    errors: errors.session,
    formType: 'login',
    navLink: <Link to='/signup'>Sign up instead.</Link>
});

const mapDispatchToProps = dispatch => ({
  processForm: user => dispatch(loginUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(Gateway);