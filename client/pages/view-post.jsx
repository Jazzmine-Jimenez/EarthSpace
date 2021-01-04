import React from 'react';

export default class ViewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null
    };
  }

  componentDidMount() {
    fetch(`/api/post/${this.props.postId}`)
      .then(res => res.json())
      .then(post => this.setState({ post }));
  }

  render() {
    if (!this.state.post) return null;
    const { title, content, tags, image, username } = this.state.post;
    const tagsString = tags.join(', ');

    return (
      <div className="container">
        <h3 className="title heading my-sm-4">What you&apos;ve Shared with Other Earthlings </h3>
        <div className="post-container shadow p-3 mb-4 bg-white rounded">
          <div className="row align-items-center">
            <div className="col-sm-7 py-sm-5 px-sm-5">
              <h3 className="title mb-sm-4"> {title} </h3>
              <p> {content} </p>
            </div>
            <div className="col-sm-5">
              <div className="image-container pr-sm-5">
                <img className="photo border img-thumbnail rounded mb-2"
                  src={image} alt="" />
                <p className="sub-title mx-sm-2">
                  <i className="fas fa-hashtag mx-sm-1"></i>
                  {tagsString} </p>
              </div>
            </div>
          </div>
          <hr />
          <div className="row">
            <div className="col py-sm-3 px-sm-5">
              <h6 className="float-end"><i className="fas fa-user"></i> {username} </h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
