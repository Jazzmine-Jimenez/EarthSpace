import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      post: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { post } = this.state;
    const token = window.localStorage.getItem('earth-jwt');

    fetch('/api/post-form', {
      method: 'POST',
      headers: {
        'X-Access-Token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
      .then(res => {
        event.target.reset();
        window.location.hash = '#users-posts';

      })
      .catch(err => console.error(err));
  }

  handleCheck(event) {
    const { checked, value } = event.target;
    const tagsArray = this.state.post.tags;

    if (checked) {
      const updatedArray = tagsArray.concat([value]);
      return updatedArray;
    } else {
      const updatedArray = tagsArray.filter(tag => tag !== value);
      return updatedArray;
    }
  }

  handleChange(event) {
    const { name, value } = event.target;
    const postState = this.state.post;
    const newPostState = Object.assign({}, postState);
    if (name === 'tags') {
      if (this.state.post.tags === undefined) {
        newPostState[name] = [value];
      } else {
        newPostState[name] = this.handleCheck(event);
      }
    } else {
      newPostState[name] = value;
    }
    this.setState({ post: newPostState });
  }

  render() {
    const token = window.localStorage.getItem('earth-jwt');

    if (!token) return <Redirect to="sign-in" />;

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
              <input required onChange={this.handleChange} type="text" className="form-control" name="title" id="title"/>
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
                    <input onChange={this.handleChange} type="checkbox" id="option1" name="tags" value="reduce" /> Reduce
                  </label>
                </div>
                <div className="col-sm-4">
                  <label className="tags">
                    <input onChange={this.handleChange} type="checkbox" id="option2" name="tags" value="recycle" /> Recycle
                  </label>
                </div>
                <div className="col-sm-4">
                  <label className="tags">
                    <input onChange={this.handleChange} type="checkbox" id="option3" name="tags" value="reuse" /> Reuse
                  </label>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4">
                  <label className="tags">
                    <input onChange={this.handleChange} type="checkbox" id="option4" name="tags" value="simple" /> Simple
                  </label>
                </div>
                <div className="col-sm-4">
                  <label className="tags">
                    <input onChange={this.handleChange} type="checkbox" id="option5" name="tags" value="consumers" /> Consumers
                  </label>
                </div>
                <div className="col-sm-4">
                  <label className="tags">
                    <input onChange={this.handleChange} type="checkbox" id="option6" name="tags" value="businesses" /> Businesses
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-sm-12 mb-3">
              <label className="text-body" htmlFor="content">What would you like to share?</label>
              <textarea required onChange={this.handleChange} className="form-control" name="content" id="content" cols="30" rows="20"></textarea>
            </div>
          </div>
          <button type="submit" className="btn button my-3">Post</button>
        </form>
      </>
    );
  }
}

PostForm.contextType = AppContext;
