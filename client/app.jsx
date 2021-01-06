import React from 'react';
import parseRoute from './lib/parse-route';
import Header from './components/header';
import PostForm from './pages/post-form';
import UsersPosts from './pages/users-posts';
import NotFound from './pages/not-found';
import ViewPost from './pages/view-post';
import EditPost from './pages/edit-post';

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
    if (route.path === 'post') {
      const postId = route.params.get('postId');
      return <ViewPost postId={postId}/>;
    }
    if (route.path === 'edit-post') {
      const postId = route.params.get('postId');
      return <EditPost postId={postId} />;
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
