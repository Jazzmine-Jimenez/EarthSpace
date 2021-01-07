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
import PageContainer from './components/page-container';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: null,
      isAuthorizing: true,
      route: parseRoute(window.location.hash)
    };

    this.handleSignIn = this.handleSignIn.bind(this);
  }

  componentDidMount() {
    window.addEventListener('hashchange', () => {
      const change = parseRoute(window.location.hash);
      this.setState({ route: change });
    });
    const token = window.localStorage.getItem('earth-jwt');
    console.log('token:', token);
    const userId = token ? decodeToken(token) : null;
    this.setState({ userId, isAuthorizing: false });
  }

  handleSignIn(result) {
    const { userId, token } = result;
    console.log(result);
    window.localStorage.setItem('earth-jwt', token);
    this.setState({ userId });
    window.location.hash = '#users-posts';
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
    const { userId, route } = this.state;
    const { handleSignIn } = this;
    const contextValue = { userId, route, handleSignIn };
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

App.contextType = AppContext;
