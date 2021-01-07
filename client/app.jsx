import React from 'react';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import decodeToken from './lib/decode-token';
import Header from './components/header';
import SignUp from './pages/sign-up';
import SignIn from './pages/sign-in';
import PostForm from './pages/post-form';
import UsersPosts from './pages/users-posts';
import ViewPost from './pages/view-post';
import EditPost from './pages/edit-post';
import NotFound from './pages/not-found';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', event => {
      const change = parseRoute(window.location.hash);
      this.setState({ route: change });
    });
    const token = window.localStorage.getItem('react-context-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { user, token } = result;
    window.localStorage.setItem('react-context-jwt', token);
    this.setState({ user });
  }

  renderPage() {
    const { route } = this.state;
    if (route.path === '') {
      return <SignIn />;
    }
    if (route.path === 'sign-up') {
      return <SignUp />;
    }
    if (route.path === 'post-form') {
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
    if (this.state.isAuthorizing) return null;
    const { user, route } = this.state;
    const { handleSignIn } = this;
    const contextValue = { user, route, handleSignIn };
    return (
    <AppContext.Provider value={contextValue}>
        <>
          <Header />
          {this.renderPage()}
        </>
    </AppContext.Provider>
    );
  }
}

App.contextType = AppContext;
