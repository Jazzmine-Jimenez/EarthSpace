import React from 'react';

export default class SignUp extends React.Component {
  render() {
    return (
      <div className="container">
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
        <div className="sign-up-container m-4 mx-auto">
          <div className="form shadow border border-1 rounded p-4">
            <div className="row mb-3">
              <div className="col-sm-6">
                <input type="text" className="form-control form-control-lg border border-1 rounded"
                  name="firstName" id="firstName" placeholder="First Name"/>
              </div>
              <div className="col-sm-6">
                <input type="text" className="form-control form-control-lg border border-1 rounded"
                name="firstName" id="firstName" placeholder="Last Name" />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <input type="text" className="form-control form-control-lg border border-1 rounded"
                name="username" id="username" placeholder="Username"/>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-12">
                <input type="text" className="form-control form-control-lg border border-1 rounded"
                  name="password" id="password" placeholder="Password" />
              </div>
            </div>
            <div className="row">
              <div className="col-12">
                <button type="submit" className="btn button w-100"> Sign-up </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
