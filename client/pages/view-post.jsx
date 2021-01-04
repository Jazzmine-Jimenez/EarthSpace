import { post } from 'jquery';
import React from 'react';

export default class ViewPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: []
    };
  }

  componentDidMount() {
    fetch('/api/post/14/user/1')
      .then(res => {
        console.log('res:', res);
        res.json();
      })
      .then(post => {
        console.log('post:', post);
        this.setState({ post });
      });
  }

  render() {
    // const { title, content, tags, image, username } = this.state.post;
    console.log(this.state.post);
    return (
      <div className="container">
        <h3 className="title heading my-sm-4">What you&apos;ve Shared with Other Earthlings </h3>
        <div className="post-container shadow p-3 mb-4 bg-white rounded">
          <div className="row align-items-center">
            <div className="col-sm-7 py-sm-5 px-sm-5">
              <h3 className="title mb-sm-4"> {post.title} </h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore
              magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.</p>
            </div>
            <div className="col-sm-5">
              <div className="image-container pr-sm-5">
                <img className="photo border img-thumbnail rounded mb-2"
                src="images\image-1609220205537.png" alt="" />
                <p className="sub-title mx-sm-2">
                  <i className="fas fa-hashtag mx-sm-1"></i>
                  tags, reduce, reuse </p>
              </div>
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col py-sm-3 px-sm-5">
              <h6 className="float-end"><i className="fas fa-user"></i> JazzyWazzy</h6>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function APost(props) {
  console.log(props);
}
