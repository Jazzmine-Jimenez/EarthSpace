import React from 'react';

export default class UsersPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };
  }

  componentDidMount() {
    fetch('/api/users-posts')
      .then(res => res.json())
      .then(posts => {
        console.log(posts);
        this.setState({ posts });
      });
  }

  render() {
    // if (!this.state.post) {
    //   return null;
    // }
    return (
      <div className="container">
        <h3 className="heading my-sm-4">What you&apos;ve Shared with Other Earthlings </h3>
        <div className="post-container shadow p-3 mb-4 bg-white rounded">
          <div className="row align-items-center">
            <div className="col-sm-6 py-sm-5 px-sm-5">
              <h4 className="title">Title of the Post</h4>
              <p className="sub-title">tags, reduce, reuse</p>
              <h6><i className="fas fa-user"></i> JazzyWazzy</h6>
            </div>
            <div className="col-sm-6">
              <div className="image-container pr-sm-5">
                <img className="photo border img-thumbnail rounded my-sm-5" src="images\image-1609220205537.png" alt=""/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
