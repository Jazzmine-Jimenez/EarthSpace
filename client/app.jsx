import React from 'react';
import Home from './pages/home';
import Header from './components/header';
import UsersPosts from './pages/users-posts';
// import NotFound from './pages/not-found';
// import { parseRoute } from './lib';
// import UsersPosts from './pages/users-posts';
// import Header from './components/header';

export default class App extends React.Component {
  // constructor(props) {
  //   super(props);
  // this.state = {
  //   route: parseRoute(window.location.hash)
  // };
  // }

  // componentDidMount() {
  //   window.addEventListener('hashchange', event => {
  //     const change = parseRoute(window.location.hash);
  //     this.setState({ route: change });
  //   });
  // }

  render() {
    return (
      <>
        <Header />
        <UsersPosts />
      </>
    );
  }
}
