import React, { useEffect, useState } from 'react';
import Redirect from '../components/redirect';

export default function UsersPosts() {
  const token = window.localStorage.getItem('earth-jwt');
  if (!token) return <Redirect to="sign-in" />;

  const [posts, setPosts] = useState([]);
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    fetch('/api/users-posts', {
      headers: {
        'X-Access-Token': token
      }
    })
      .then(res => res.json())
      .then(allPost => setPosts(allPost))
      .catch(err => console.error(err));

  }, []);

  useEffect(() => {
    const likesArray = [];

    fetch('/api/likes', {
      headers: {
        'X-Access-Token': token
      }
    })
      .then(res => res.json())
      .then(currentLikes => {
        currentLikes.forEach(like => likesArray.push(like.postId));
        setLikes(likesArray);
      })
      .catch(err => console.error(err));
  }, []);

  if (posts.length !== 0) {
    return (
            <div>
              <h3 className="heading my-4">What you&apos;ve Shared with Other Earthlings </h3>
              {
                posts.map(post => {
                  return (
                    <div key={post.postId}>
                      <OnePost
                        post={post}
                        likes={likes}
                        setLikes={setLikes}
                      />
                    </div>
                  );
                })
              }
            </div>
    );
  }

  return (
        <div>
          <h3 className="heading my-4">What you&apos;ve Shared with Other Earthlings </h3>
          <div className="text-center">
            <p className="text-center">Oh... well you have not shared anything yet!</p>
            <a href="#post-form" role="button" className="btn btn-dark my-3"> Create a Post</a>
          </div>

        </div>
  );
}

function OnePost(props) {
  const { title, tags, username, postId } = props.post;
  const { likes, setLikes } = props;
  const tagsString = tags.join(', ');

  const handleLikeClick = () => {
    const token = window.localStorage.getItem('earth-jwt');

    if (likes.includes(postId)) {
      fetch(`/api/likes/post/${postId}`, {
        method: 'DELETE',
        headers: {
          'X-Access-Token': token
        }
      })
        .then(res => res.json())
        .catch(err => console.error(err));

      const updatedLikes = likes.filter(like => like !== postId);
      setLikes(updatedLikes);
      document.getElementById(postId).className = 'text-muted';
    } else {
      fetch(`/api/likes/post/${postId}`, {
        method: 'POST',
        headers: {
          'X-Access-Token': token
        }
      })
        .then(res => res.json())
        .catch(err => console.error(err));

      likes.push(postId);
      setLikes(likes);
      document.getElementById(postId).className = 'text-success fw-bold';
    }

  };

  let buttonStyle = 'text-muted';
  if (likes.includes(postId)) {
    buttonStyle = 'text-success fw-bold';
  }

  return (
    <div className="shadow p-3 mb-4 bg-white rounded">
      <a href={`#post?postId=${postId}`} className="text-decoration-none text-muted">
        <div className="row align-items-center">
          <div className="col-sm-7 py-sm-5 px-sm-5">
            <h5 className="text-body"> {title} </h5>
            <p className="sub-title fw-lighter"> <i className="fas fa-hashtag me-1 "></i>{tagsString} </p>
          </div>
        </div>
      </a>
      <hr/>
      <div className="row py-3 px-5 text-muted fs-5">
        <div className="col-sm-6 like-button">
          <p id={postId} className={buttonStyle} onClick={handleLikeClick}>
            <i className="fas fa-globe-americas" data-post-id={postId}></i> Like
          </p>
        </div>
        <div className="col-sm-6 text-sm-end">
          <p><i className="fas fa-user"></i> {username} </p>
        </div>
      </div>
    </div>
  );
}
