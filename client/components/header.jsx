import React from 'react';
import AppContext from '../lib/app-context';

export default class Header extends React.Component {
  render() {
    const { handleSignOut } = this.context;
    const token = window.localStorage.getItem('earth-jwt');

    if (!token) {
      return (
        <nav className="navbar navbar-expand-lg navbar-dark navbar-color">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">EarthSpace</a>
        </div>
      </nav>
      );
    }
    return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-color">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">EarthSpace</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
        data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#">Home</a>
              </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#post-form">Create a Post</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#users-posts">My Posts</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#sign-in" onClick={handleSignOut}> Log Out</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    );
  }
}

Header.contextType = AppContext;
