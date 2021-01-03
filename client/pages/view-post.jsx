import React from 'react';

export default class ViewPost extends React.Component {
  render() {
    return (
      <div className="container">
        <h3 className="title my-sm-4">What you&apos;ve Shared with Other Earthlings </h3>
        <div className="post-container shadow p-3 mb-4 bg-white rounded text-secondary">
          <div className="row align-items-center">
            <div className="col-sm-6 py-sm-5 px-sm-5">
              <h4 className="title">Title of the Post</h4>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna
              aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
              do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
              <br/>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna
                  aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore
                  magna aliqua.
              </p>
            </div>
            <div className="col-sm-6">
              <div className="image-container pr-sm-5">
                <img className="photo border img-thumbnail rounded mb-2"
                src="images\image-1609220205537.png" alt="" />
                  <p className="sub-title center-block">
                <i className="fas fa-hashtag"></i>
                  tags, reduce, reuse </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
