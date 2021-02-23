import React from 'react';
import AppContext from '../lib/app-context';

export default class EditPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      updateButton: 'btn btn-lg button me-3',
      deleteButton: 'btn btn-lg btn-secondary'
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    const token = window.localStorage.getItem('earth-jwt');

    if (this.props.postId === '1') {
      this.setState({
        updateButton: 'btn btn-lg button me-3 disabled',
        deleteButton: 'btn btn-lg btn-secondary disabled'
      });
    }

    fetch(`/api/post/${this.props.postId}`, {
      headers: {
        'X-Access-Token': token
      }
    })
      .then(res => res.json())
      .then(post => this.setState({ post }))
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
      newPostState[name] = this.handleCheck(event);
    } else {
      newPostState[name] = value;
    }
    this.setState({ post: newPostState });
  }

  handleSubmit(event) {
    const token = window.localStorage.getItem('earth-jwt');
    const { post } = this.state;

    event.preventDefault();

    fetch(`/api/post/${this.props.postId}`, {
      method: 'PUT',
      headers: {
        'X-Access-Token': token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(post)
    })
      .then(res => {
        window.location.hash = '#users-posts';
        res.json();
      })
      .then(post => this.setState({ post }))
      .catch(err => console.error(err));
  }

  handleDelete() {
    const token = window.localStorage.getItem('earth-jwt');

    fetch(`/api/likes/${this.props.postId}`, {
      method: 'DELETE',
      headers: {
        'X-Access-Token': token
      }
    });

    fetch(`/api/comments/${this.props.postId}`, {
      method: 'DELETE',
      headers: {
        'X-Access-Token': token
      }
    });

    fetch(`/api/post/${this.props.postId}`, {
      method: 'DELETE',
      headers: {
        'X-Access-Token': token
      }
    })
      .then(res => {
        window.location.hash = '#users-posts';
      })
      .catch(err => console.error(err));
  }

  render() {
    if (!this.state.post) return null;

    const { title, content } = this.state.post;

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
              <input required type="text" className="form-control" name="title"
                id="title" onChange={this.handleChange} value={title} />
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-12">
                <label className="text-body">Tags (Choose all that apply):</label>
              </div>
            </div>
            <div className="tags-container ml-3">
              <div className="row">
                <div className="col-sm-4 ">
                  <label className="tags">
                    <input type="checkbox" id="option1" name="tags"
                    onChange={this.handleChange}
                      checked={this.state.post.tags.includes('reduce')}
                    value="reduce" /> Reduce
                  </label>
                </div>
                <div className="col-sm-4">
                  <label className="tags">
                    <input type="checkbox" id="option2" name="tags"
                    onChange={this.handleChange}
                      checked={this.state.post.tags.includes('recycle')}
                    value="recycle" /> Recycle
                  </label>
                </div>
                <div className="col-sm-4">
                  <label className="tags">
                    <input type="checkbox" id="option3" name="tags"
                    onChange={this.handleChange}
                      checked={this.state.post.tags.includes('reuse')}
                    value="reuse" /> Reuse
                  </label>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-sm-4">
                  <label className="tags">
                    <input type="checkbox" id="option4" name="tags"
                    onChange={this.handleChange}
                      checked={this.state.post.tags.includes('simple')}
                    value="simple" /> Simple
                  </label>
                </div>
                <div className="col-sm-4">
                  <label className="tags">
                    <input type="checkbox" id="option5" name="tags"
                    onChange={this.handleChange}
                    checked={this.state.post.tags.includes('consumers')}
                    value="consumers" /> Consumers
                  </label>
                </div>
                <div className="col-sm-4">
                  <label className="tags">
                    <input type="checkbox" id="option6" name="tags"
                    onChange={this.handleChange}
                    checked={this.state.post.tags.includes('businesses')}
                    value="businesses" /> Businesses
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-sm-12 mb-3">
              <label className="text-body" htmlFor="content">What would you like to share?</label>
              <textarea required className="form-control" name="content"
                id="content" onChange={this.handleChange} value={content} cols="30" rows="10"></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col-12 my-3">
              <button type="submit" className={this.state.updateButton}>
                Update</button>
              <button type="button" className={this.state.deleteButton}
              data-bs-toggle="modal" data-bs-target="#exampleModal">
                Delete </button>
            </div>
            <div className="modal fade" id="exampleModal" tabIndex="-1"
              aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Delete Post</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"
                    aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    Are you sure you want to delete this post?</div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary"
                    data-bs-dismiss="modal">Cancel</button>
                    <button onClick={this.handleDelete} type="button" data-bs-dismiss="modal" className="btn button">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </>
    );
  }
}

EditPost.contextType = AppContext;
