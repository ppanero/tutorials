import React from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

    componentDidMount() {
        // gapi is a variable available in window scope
        window.gapi.load(
            'client:auth2',
            () => {
                window.gapi.client.init({
                    clientId: 'CLIENT_ID',
                    scope: 'email'
                }).then(() => { // init returns a promise
                    this.auth = window.gapi.auth2.getAuthInstance();
                    this.onAuthChange(this.auth.isSignedIn.get());
                    this.auth.isSignedIn.listen(this.onAuthChange);
                })
            }
        )
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn){
            this.props.signIn(this.auth.currentUser.get().getId());
        }
        else {
            this.props.signOut();
        }
    }

    // Helper methods might be a bit of extra work
    // But it makes the flow easier to understand in the future
    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut()
    }

    renderAuthButton() {
        if (this.props.isSignedIn) {
            return (
                <button
                    onClick={ this.onSignOutClick } 
                    className="ui red google button"
                >
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        }
        else if (!this.props.isSignedIn) {
            return (
                <button 
                    onClick={ this.onSignInClick }
                    className="ui red google button"
                >
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
        else {
            return null;
        }
    }

    render() {
        return (
            <div>{ this.renderAuthButton() }</div>
        );
    }
}

const mapStateToProps = (state) => {
 return { isSignedIn: state.auth.isSignedIn }
}

export default connect(
    mapStateToProps,
    { signIn, signOut }
)(GoogleAuth);