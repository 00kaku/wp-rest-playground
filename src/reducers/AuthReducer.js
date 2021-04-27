import React from 'react';
/**
 * The reducer function for the user logged in state.
 *
 * @param {Object} state The state Object.
 * @param {Object} action The action Object.
 * @return {Object}
 */
const AuthReducer = ( state, action ) => {
	switch ( action.type ) {
		case 'LOGIN':
			localStorage.setItem( 'user', JSON.stringify( action.payload ) );
			localStorage.setItem( 'loggedIn', 'true' );
			return {
				...state,
				loggedIn: true,
				user: action.payload,
			};
		case 'LOGOUT':
			localStorage.clear();
			return {
				...state,
				loggedIn: false,
				user: null,
			};
		default:
			return state;
	}
};

export default AuthReducer;
