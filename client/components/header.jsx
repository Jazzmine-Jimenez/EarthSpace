import React from 'react';

export default function Header(props) {
  return (
    <header>
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand text-white" href="#">Earth</a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li className="dropdown"><a className="dropdown-toggle" data-toggle="dropdown" href="#">
              <i className="fas fa-bars menu-icon text-white"></i></a>
              <ul className="dropdown-menu">
                <li><a href="#">Create a post</a></li>
                <li><a href="#">View your a posts</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
