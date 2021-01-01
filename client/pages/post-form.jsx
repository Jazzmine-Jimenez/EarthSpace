import React from 'react';

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      file: '',
      imagePreviewUrl: 'placeholder-image.png'
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch('/api/post-form', {
      method: 'POST',
      body: formData
    })
      .then(res => {
        event.target.reset();
      })
      .catch(err => console.error(err));
    this.setState({
      file: '',
      imagePreviewUrl: 'placeholder-image.png'
    });

  }

  handleChange(event) {
    const reader = new FileReader();
    const file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(file);
  }

  render() {
    const { imagePreviewUrl } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="heading mt-sm-4">Share With Other Earthlings </h3>
          </div>
        </div>
        <form id="post-form" onSubmit={this.handleSubmit} className="text-muted">
          <div className="row form-group">
            <div className="col-sm-12">
              <label htmlFor="title">Title: </label>
              <input required type="text" className="form-control" name="title" id="title"/>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-12">
                <label>Tags (Choose all that apply):</label>
              </div>
            </div>
            <div className="tags-container ml-sm-3">
              <div className="row">
                <div className="col-sm-4 ">
                  <label className="tags">
                    <input type="checkbox" id="option1" name="tags" value="reduce" /> Reduce
                  </label>
                </div>
                <div className="col-sm-4">
                  <label className="tags">
                    <input type="checkbox" id="option2" name="tags" value="recycle" /> Recycle
                  </label>
                </div>
                <div className="col-sm-4">
                  <label className="tags">
                    <input type="checkbox" id="option3" name="tags" value="reuse" /> Reuse
                  </label>
                </div>
              </div>
              <div className="row">
                <div className="col-sm-4">
                  <label className="tags">
                    <input type="checkbox" id="option4" name="tags" value="simple" /> Simple
                  </label>
                </div>
                <div className="col-sm-4">
                  <label className="tags">
                    <input type="checkbox" id="option5" name="tags" value="consumers" /> Consumers
                  </label>
                </div>
                <div className="col-sm-4">
                  <label className="tags">
                    <input type="checkbox" id="option6" name="tags" value="buisnesses" /> Buisnesses
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-sm-12">
              <label htmlFor="content">What would you like to share?</label>
              <textarea required className="form-control" name="content" id="content" cols="30" rows="10"></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <label> Upload image: </label>
            </div>
          </div>
          <div className="row border rounded py-sm-3 align-items-center">
            <div className="col-sm-6">
              <label htmlFor="image" className="mx-sm-3"> Image: </label>
              <input required onChange={this.handleChange} type="file" name="image" id="image" />
            </div>
            <div className="col-sm-6">
              <img className="image-preview border img-thumbnail rounded" src={imagePreviewUrl} alt="placeholder" />
            </div>
          </div>
          <a href="#users-posts">
            <button type="submit" className="button my-sm-3">Post</button>
          </a>
        </form>
      </div>
    );
  }
}
