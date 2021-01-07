import React from 'react';

export default class SignIn extends React.Component {
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
          <form>
            <div className="shadow border border-1 rounded p-4">
              <div className="row mb-3 form-group">
                <div className="col-12">
                  <input type="text" className="form-control form-control-lg border border-1 rounded"
                    name="username" placeholder="Username" />
                </div>
              </div>
              <div className="row mb-3 form-group">
                <div className="col-12">
                  <input type="password" className="form-control form-control-lg border border-1 rounded"
                    name="password" placeholder="Password" />
                </div>
              </div>
              <div className="row">
                <div className="col-12 mb-3">
                  <button type="submit" className="btn button btn-lg w-100"> Sign-in </button>
                </div>
              </div>
              <hr/>
              <div className="row">
                <div className="col-12 mt-3">
                  <button type="button" className="btn btn-dark btn-lg w-100"> Create An Account </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
