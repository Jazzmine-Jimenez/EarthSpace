import React from 'react';
// import Redirect from '../components/redirect';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';

export default class SignIn extends React.Component {
  render() {
    console.log(this.context);

    const { userId, route, handleSignIn } = this.context;

    // if (userId) return <Redirect to="sign-up" />;

    return (
      <>
        <div className="heading text-center mt-5">
          <div className="row">
            <div className="col-12">
              <h1>Connect With Other Earthlings</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <p>A place to share your conservation ideas and find new ones.</p>
            </div>
          </div>
        </div>
        <AuthForm
          key={route.path}
          // action={route.path}
          onSignIn={handleSignIn} />
        </>
    );
  }
}

SignIn.contextType = AppContext;
