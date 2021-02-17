import React from 'react';
import AppContext from './lib/app-context';
import parseRoute from './lib/parse-route';
import decodeToken from './lib/decode-token';
import Header from './components/header';
import SignUp from './pages/sign-up';
import SignIn from './pages/sign-in';
import Home from './pages/home';
import PostForm from './pages/post-form';
import UsersPosts from './pages/users-posts';
import ViewPost from './pages/view-post';
import EditPost from './pages/edit-post';
import NotFound from './pages/not-found';
import PageContainer from './components/page-container';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      token: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };

    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const change = parseRoute(window.location.hash);
      this.setState({ route: change });
    });
    const token = window.localStorage.getItem('earth-jwt');
    const user = token ? decodeToken(token) : null;
    this.setState({ user, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { payload, token } = result;
    window.localStorage.setItem('earth-jwt', token);
    this.setState({
      user: payload,
      token: token
    });
    window.location.hash = '#';
  }

  handleSignOut() {
    window.localStorage.removeItem('earth-jwt');
    this.setState({
      user: null,
      token: null
    });
  }

  renderPage() {
    const { route } = this.state;

    if (route.path === 'sign-in') {
      return <SignIn />;
    }
    if (route.path === 'sign-up') {
      return <SignUp />;
    }
    if (route.path === 'post-form') {
      return <PostForm />;
    }
    if (route.path === 'users-posts') {
      const postId = route.params.get('postId');
      return <UsersPosts postId={postId}/>;
    }
    if (route.path === '') {
      const postId = route.params.get('postId');
      return <Home postId={postId} />;
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

    const { user, route, token } = this.state;
    const { handleSignIn, handleSignOut } = this;
    const contextValue = { user, token, route, handleSignIn, handleSignOut };

    return (
    <AppContext.Provider value={contextValue}>
        <>
          <Header />
          <PageContainer>
          {this.renderPage()}
          </PageContainer>
        </>
    </AppContext.Provider>
    );
  }
}
