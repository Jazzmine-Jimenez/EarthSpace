import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class UsersPosts extends React.Component {
  constructor(props) {
    super(props);

    this.handleLikeClick = this.handleLikeClick.bind(this);

    this.state = {
      posts: [],
      likes: []
    };
  }

  componentDidMount() {
    const { user, token } = this.context;

    if (!user) return <Redirect to="" />;

    fetch('/api/users-posts', {
      headers: {
        'X-Access-Token': token
      }
    })
      .then(res => res.json())
      .then(posts => {
        this.setState({ posts });
      });

    fetch('/api/likes', {
      headers: {
        'X-Access-Token': token
      }
    })
      .then(res => res.json())
      .then(likes => {
        this.setState({ likes });
      });

  }

  handleLikeClick(event) {
    const { user, token } = this.context;
    if (!user) return;

    const postId = event.target.getAttribute('data-post-id');
    console.log('postId:', postId);

    this.state.likes.map(like => {
      if (like.postId === postId) {
        return console.log('already liked');
      } else {
        return console.log('liked for the first time');
      }

    });

    fetch(`/api/likes/post/${postId}`, {
      method: 'POST',
      headers: {
        'X-Access-Token': token
      }
    })
      .then(res => {
        res.json();
      });
  }

  render() {

    const user = this.context.user;

    if (!user) return <Redirect to="" />;

    return (
      <>
        <h3 className="heading my-4">What you&apos;ve Shared with Other Earthlings </h3>
        {
          this.state.posts.map(post => {

            return (
              <div key={post.postId}>
                <OnePost
                  post={post}
                  handleLikeClick={this.handleLikeClick}
                />
              </div>
            );
          })
        }
      </>
    );
  }
}

function OnePost(props) {
  const { title, tags, image, username, postId } = props.post;

  const tagsString = tags.join(', ');

  return (
    <div className="shadow p-3 mb-4 bg-white rounded ">
      <a href={`#post?postId=${postId}`} className="text-decoration-none text-muted">
        <div className="row align-items-center">
          <div className="col-sm-7 py-sm-5 px-sm-5">
            <h5 className="text-body"> {title} </h5>
            <p className="sub-title fw-lighter"> <i className="fas fa-hashtag me-1 "></i>{tagsString} </p>
            <h6 className="fw-lighter"><i className="fas fa-user"></i> {username} </h6>
          </div>
          <div className="col-sm-5 mh-100 d-flex justify-content-center">
            <img className="image border rounded my-5 mw-100" src={image} alt="" />
          </div>
        </div>
      </a>
      <hr/>
      <div className="row py-3 px-5 text-muted">
        <div className="col-sm-6">
          <p><i onClick={props.handleLikeClick} data-post-id={postId}
            className="fas fa-globe-americas"></i> Like
          </p>
        </div>
        <div className="col-sm-6 text-sm-end">
          <p><i className="fas fa-user"></i> {username} </p>
        </div>
      </div>
    </div>
  );
}

UsersPosts.contextType = AppContext;
