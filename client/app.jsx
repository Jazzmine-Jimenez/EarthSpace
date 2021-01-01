import React from 'react';
// import Home from './pages/home';
import Header from './components/header';
import PostForm from './pages/post-form';
import UsersPosts from './pages/users-posts';
import NotFound from './pages/not-found';
import parseRoute from './lib/parse-route';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      const change = parseRoute(window.location.hash);
      this.setState({ route: change });
    });
  }

  renderPage() {
    const { route } = this.state;

    if (route.path === '') {
      return <PostForm />;
    }
    if (route.path === 'users-posts') {
      return <UsersPosts />;
    }
    return <NotFound />;
  }

  render() {
    return (
      <>
        <Header />
        {this.renderPage()}
      </>
    );
  }
}
