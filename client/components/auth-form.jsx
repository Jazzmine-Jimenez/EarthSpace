import React from 'react';

export default class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      signinButton: 'Sign-in'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDemoSignIn = this.handleDemoSignIn.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(result => {
        if (result.payload.userId && result.token) {
          this.props.onSignIn(result);
        }
      });
  }

  handleDemoSignIn(event) {
    this.setState({
      username: 'EarthSpaceLover',
      password: 'password',
      signinButton: 'Sign into Demo Account'
    });
  }

  render() {
    let inputValues;
    if (this.state.username === 'EarthSpaceLover') {
      inputValues = (
        <fieldset disabled>
          <div className="row mb-3 form-group">
            <div className="col-12">
              <input type="text" className="form-control form-control-lg border border-1 rounded"
                onChange={this.handleChange} value={this.state.username} name="username" placeholder="Username" />
            </div>
          </div>
          <div className="row mb-3 form-group">
            <div className="col-12">
              <input type="password" className="form-control form-control-lg border border-1 rounded"
                onChange={this.handleChange} value={this.state.password} name="password" placeholder="Password" />
            </div>
          </div>
        </fieldset>
      );
    } else {
      inputValues = (
        <>
            <div className="row mb-3 form-group">
              <div className="col-12">
                <input type="text" className="form-control form-control-lg border border-1 rounded"
                  onChange={this.handleChange} value={this.state.username} name="username" placeholder="Username" />
              </div>
            </div>
            <div className="row mb-3 form-group">
              <div className="col-12">
                <input type="password" className="form-control form-control-lg border border-1 rounded"
                  onChange={this.handleChange} value={this.state.password} name="password" placeholder="Password" />
              </div>
            </div>
        </>
      );
    }

    return (
      <div className="sign-up-container m-4 mx-auto">
        <form onSubmit={this.handleSubmit}>
          <div className="shadow border border-1 rounded p-4">
            {inputValues}
            <div className="row">
              <div className="col-12 mb-3">
                <button type="submit" className="btn button btn-lg w-100"> {this.state.signinButton} </button>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-12 mt-3">
                <a href="#sign-up">
                  <button type="button" className="btn btn-dark btn-lg w-100"> Create An Account </button>
                </a>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12 mt-3 text-center">
              <p>Don&apos;t want an account just yet? I respect that. <br/>
                <a className="btn text-decoration-underline" onClick={this.handleDemoSignIn}> Sign into Demo Account </a>
              </p>
            </div>
          </div>
        </form>
      </div>
    );
  }
}
