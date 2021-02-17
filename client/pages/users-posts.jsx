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
    const token = window.localStorage.getItem('earth-jwt');
    const likesArray = [];

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
        likes.forEach(like => likesArray.push(like.postId));
        this.setState({ likes: likesArray });
      });

  }

  handleLikeClick(event) {
    const { likes } = this.state;
    const postId = Number(event.target.getAttribute('data-post-id'));
    const token = window.localStorage.getItem('earth-jwt');

    if (likes.includes(postId)) {
      fetch(`/api/likes/post/${postId}`, {
        method: 'DELETE',
        headers: {
          'X-Access-Token': token
        }
      })
        .then(res => {
          res.json();
        });

      const updatedLikes = likes.filter(like => like !== postId);

      this.setState({ likes: updatedLikes });
      return;
    }

    likes.push(postId);
    this.setState({ likes });

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
    const token = window.localStorage.getItem('earth-jwt');
    const posts = this.state.posts;

    if (!token) return <Redirect to="sign-in" />;

    if (posts.length === 0) {
      return (
        <div>
        <h3 className="heading my-4">What you&apos;ve Shared with Other Earthlings </h3>
        <div className="text-center">
          <p className="text-center">Oh... well you have not shared anything yet!</p>
          <a href="#post-form" role="button" className="btn btn-dark my-3"> Create a Post</a>
        </div>

        </div>
      );
    } else {
      return (
        <div>
        <h3 className="heading my-4">What you&apos;ve Shared with Other Earthlings </h3>
        {
          this.state.posts.map(post => {

            return (
              <div key={post.postId}>
                <OnePost
                  post={post}
                  handleLikeClick={this.handleLikeClick}
                  likes={this.state.likes}
                />
              </div>
            );
          })
        }
      </div>
      );
    }

  }
}

function OnePost(props) {
  const { title, tags, username, postId } = props.post;
  const { likes } = props;

  let buttonStyle;
  if (likes.includes(postId)) {
    buttonStyle = 'text-success fw-bold';
  } else {
    buttonStyle = 'text-muted';
  }

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
        </div>
      </a>
      <hr/>
      <div className="row py-3 px-5 text-muted fs-5">
        <div className="col-sm-6 like-button">
          <p className={buttonStyle} onClick={props.handleLikeClick} data-post-id={postId}><i
            className="fas fa-globe-americas" data-post-id={postId}></i> Like
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
