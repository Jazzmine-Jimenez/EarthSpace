import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

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
    const { user } = this.context;

    if (!user) {
      return <Redirect to="" />;
    } else {
      const { title, content, tags, image, username, postId } = this.state.post;
      const tagsString = tags.join(', ');

      return (
        <>
        <h3 className="title heading my-4">What you&apos;ve Shared with Other Earthlings </h3>
          <div className="shadow p-3 mb-4 bg-white rounded">
            <div className="row align-items-center">
              <div className="col-sm-7 py-sm-5 px-sm-5">
                <h3 className="title mb-sm-4"> {title} </h3>
                <p className="sub-title">
                <i className="fas fa-hashtag mx-sm-1"></i>
                {tagsString} </p>
                <p> {content} </p>
              </div>
              <div className="col-sm-5 mh-100 d-flex justify-content-center">
                <img className="image border rounded my-5 mw-100"
                  src={image} alt="post image" />
              </div>
            </div>
            <hr />
            <div className="row py-3 px-5 text-muted">
              <div className="col-sm-6">
                <a href={`#edit-post?postId=${postId}`} className="text-decoration-none text-muted">
                  <p> <i className="fas fa-edit"></i> Edit </p>
                </a>
              </div>
              <div className="col-sm-6 text-sm-end">
                <p ><i className="fas fa-user"></i> {username} </p>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}

ViewPost.contextType = AppContext;
