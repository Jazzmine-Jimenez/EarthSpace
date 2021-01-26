import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

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
    const { token } = this.context;
    const formData = new FormData(event.target);
    fetch('/api/post-form', {
      method: 'POST',
      headers: {
        'X-Access-Token': `${token}`
      },
      body: formData
    })
      .then(res => {
        event.target.reset();
        window.location.hash = '#users-posts';
        this.setState({
          file: '',
          imagePreviewUrl: 'placeholder-image.png'
        });
      })
      .catch(err => console.error(err));

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
    const { user, token } = this.context;
    const { imagePreviewUrl } = this.state;

    if (!user || !token) return <Redirect to="sign-in" />;

    return (
      <>
        <div className="row">
          <div className="col-sm-12">
            <h3 className="heading mt-4">Share With Other Earthlings </h3>
          </div>
        </div>
        <form id="post-form" onSubmit={this.handleSubmit} className="text-muted">
          <div className="row">
            <div className="col-sm-12 mb-3">
              <label className="text-body" htmlFor="title">Title: </label>
              <input required type="text" className="form-control" name="title" id="title"/>
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-12">
                <label className="text-body">Tags (Choose all that apply):</label>
              </div>
            </div>
            <div className="tags-container ms-3">
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
              <div className="row mb-3">
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
            <div className="col-sm-12 mb-3">
              <label className="text-body" htmlFor="content">What would you like to share?</label>
              <textarea required className="form-control" name="content" id="content" cols="30" rows="10"></textarea>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-sm-12">
              <label className="text-body"> Upload image: </label>
            </div>
          </div>
          <div className="row border rounded py-3 align-items-center image-preview-container">
            <div className="col-sm-7">
              <label htmlFor="image" className="mx-3"> Image: </label>
              <input required onChange={this.handleChange} type="file" name="image" id="image" />
            </div>
            <div className="col-sm-5 mh-100 d-flex justify-content-center">
              <img className="image border rounded my-5 mw-100" src={imagePreviewUrl} alt="placeholder" />
            </div>
          </div>
            <button type="submit" className="btn button my-3">Post</button>
        </form>
      </>
    );
  }
}

PostForm.contextType = AppContext;
