import React from 'react';

export default function Header(props) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark navbar-color">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">Earth</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="#">Create post</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#users-posts">View posts</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
