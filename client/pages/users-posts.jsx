import React from 'react';

export default class UsersPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch('/api/users-posts/1')
      .then(res => res.json())
      .then(posts => {
        this.setState({ posts });
      });
  }

  render() {
    return (
      <div className="container">
        <h3 className="heading my-sm-4">What you&apos;ve Shared with Other Earthlings </h3>
            {
              this.state.posts.map(post => {
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
  const { title, image, username } = props.post;
  const { tags } = props.post;
  const tagsString = tags.join(', ');

  return (
    <div className="post-container shadow p-3 mb-4 bg-white rounded">
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
  );
}
