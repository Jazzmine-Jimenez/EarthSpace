import React from 'react';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      firstName: '',
      lastName: '',
      username: '',
      password: ''
    };

  }

  handleSubmit(event) {
    event.preventDefault();
    fetch('/api/auth/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(this.state)
    })
      .then(res => {
        event.target.reset();
        window.location.hash = '#users-posts';
      })
      .catch(err => console.error(err));
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

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
          <form onSubmit={this.handleSubmit}>
            <div className="shadow border border-1 rounded p-4">
              <div className="row mb-3 form-group">
                <div className="col-sm-6">
                  <input type="text" className="form-control form-control-lg border border-1 rounded"
                    onChange={this.handleChange} value={this.state.firstName}
                    name="firstName" placeholder="First Name"/>
                </div>
                <div className="col-sm-6">
                  <input type="text" className="form-control form-control-lg border border-1 rounded"
                    onChange={this.handleChange} value={this.state.lastName}
                    name="lastName" placeholder="Last Name" />
                </div>
              </div>
              <div className="row mb-3 form-group">
                <div className="col-12">
                  <input type="text" className="form-control form-control-lg border border-1 rounded"
                    onChange={this.handleChange} value={this.state.username}
                    name="username" placeholder="Username"/>
                </div>
              </div>
              <div className="row mb-3 form-group">
                <div className="col-12">
                  <input type="password" className="form-control form-control-lg border border-1 rounded"
                    onChange={this.handleChange} value={this.state.password}
                    name="password" placeholder="Password" />
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <button type="submit" className="btn button btn-lg w-100"> Sign-up </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
