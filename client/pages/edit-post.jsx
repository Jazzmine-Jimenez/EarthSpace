import React from 'react';

export default class EditPost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
  }

  componentDidMount() {
    fetch(`/api/post/${this.props.postId}`)
      .then(res => res.json())
      .then(post => this.setState({ post }));
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
    event.preventDefault();
    const formData = new FormData(event.target);
    fetch(`/api/post/${this.props.postId}/user/1`, {
      method: 'PUT',
      body: formData
    })
      .then(res => {
        window.location.hash = '#users-posts';
        res.json();
      })
      .then(post => this.setState({ post }));
  }

  render() {
    if (!this.state.post) return null;

    const { title, content, image } = this.state.post;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <h3 className="heading mt-4">Share With Other Earthlings </h3>
          </div>
        </div>
        <form id="post-form" onSubmit={this.handleSubmit} className="text-muted">
          <div className="row">
            <div className="col-sm-12 mb-3">
              <label htmlFor="title">Title: </label>
              <input required type="text" className="form-control" name="title"
                id="title" onChange={this.handleChange} value={title} />
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-sm-12">
                <label>Tags (Choose all that apply):</label>
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
                    checked={this.state.post.tags.includes('buisnesses')}
                    value="buisnesses" /> Buisnesses
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-sm-12 mb-3">
              <label htmlFor="content">What would you like to share?</label>
              <textarea required className="form-control" name="content"
                id="content" onChange={this.handleChange} value={content} cols="30" rows="10"></textarea>
            </div>
          </div>
          <div className="row form-group">
            <div className="col-sm-12">
              <label> Upload image: </label>
            </div>
          </div>
          <div className="row border rounded py-sm-3 align-items-center">
            <div className="col-sm-6">
              <label htmlFor="image" className="mx-sm-3"> Image: </label>
              <input onChange={this.handleCheck} type="file"
                name="image" id="image"/>
            </div>
            <div className="col-sm-6">
              <img className="image-preview border img-thumbnail rounded" src={image} alt="placeholder" />
            </div>
          </div>
          <button type="submit" className="button my-sm-3">Update</button>
        </form>
      </div>
    );
  }
}
