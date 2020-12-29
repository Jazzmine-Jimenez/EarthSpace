import React from 'react';

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch('/api/env', {
      method: 'POST',
      body: formData
    })
      .then(res => {
        const postForm = document.querySelector('form');
        postForm.reset();
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="heading">Share With Other Earthlings </h3>
          </div>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="row form-group">
            <div className="col-sm-12">
              <label htmlFor="Title">Title: </label>
              <input required autoFocus type="text" className="form-control" name="title" id="title"/>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-sm-12">
              <label>Tags (Choose all that apply):</label>
                <div className="col-sm-12">
                  <label className="checkbox-inline tags">
                    <input type="checkbox" name="tags" value="reduce" /> Reduce
                </label>
                  <label className="checkbox-inline tags">
                  <input type="checkbox" name="tags" value="recycle" /> Recycle
                </label>
                  <label className="checkbox-inline tags">
                    <input type="checkbox" name="tags" value="reuse" /> Reuse
                </label>
                </div>
                <div className="col-sm-12">
                  <label className="checkbox-inline tags">
                  <input type="checkbox" name="tags" value="simple" /> Simple
                </label>
                  <label className="checkbox-inline tags">
                    <input type="checkbox" name="tags" value="consumers" /> Consumers
                </label>
                  <label className="checkbox-inline tags">
                  <input type="checkbox" name="tags" value="buisnesses" /> Buisnesses
                </label>
                </div>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-sm-12">
              <label htmlFor="content">What would you like to share?</label>
              <textarea className="form-control" name="content" id="content" cols="30" rows="10"></textarea>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-sm-12">
              <label> Image: </label>
              <div className="row form-group">
                <div className="col-sm-4">
                  <label htmlFor="image">Upload image: </label>
                  <input type="file" name="image" id="image" />
                </div>
                <div className="col-sm-8">
                  <img className="placeholder" src="placeholder-image.png" alt="placeholder" />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="button btn btn-default">Post</button>
        </form>
      </div>
    );
  }
}
