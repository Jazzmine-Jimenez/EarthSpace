import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class UsersPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    const { user } = this.context;
    if (user === null) {
      return null;
    } else {
      console.log('mounting component');
      const userId = this.context.user.userId;
      fetch(`/api/users-posts/${userId}`)
        .then(res => res.json())
        .then(posts => {
          this.setState({ posts });
        });
    }
  }

  render() {
    console.log(this.post);
    const user = this.context.user;
    console.log(user);
    if (user === null) return <Redirect to="" />;

    return (
      <div className="container">
        <h3 className="heading my-sm-4">What you&apos;ve Shared with Other Earthlings </h3>
            {
              this.state.posts.map(post => {
                console.log(post);
                return (
                  <div key={post.postId}>
                    <OnePost post={post} />
                  </div>
                );
              })
            }
      </div>
    );
  }
}

function OnePost(props) {
  const { title, tags, image, username, postId } = props.post;
  const tagsString = tags.join(', ');
  console.log('inside onePost function');
  return (
  // <a href={`#post?postId=${postId}`} className="anchor-styling text-muted post-container">
      <div className="shadow p-3 mb-4 bg-white rounded">
      <div className="row align-items-center">
      <div className="col-sm-6 py-sm-5 px-sm-5">
        <h4 className="title"> { title } </h4>
        <p className="sub-title"> { tagsString } </p>
          <h6><i className="fas fa-user"></i> { username } </h6>
      </div>
      <div className="col-sm-6">
        <div className="image-container pr-sm-5">
          <img className="photo border img-thumbnail rounded my-sm-5" src={ image } alt="" />
        </div>
      </div>
      </div>
    </div>
    // </a>
  );
}

UsersPosts.contextType = AppContext;
