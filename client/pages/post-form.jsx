import React from 'react';

export default class PostForm extends React.Component {
  render() {
    return (
    <div className="container">
      <h3>Share With Other Earthlings </h3>
      <form>
        <div className="form-group">
          <label htmlFor="Title">Title: </label>
          <input type="text" name="title" id="title"/>
        </div>
        <div className="form-group">
          <label htmlFor="tags">Tags (Choose all that apply):
            <div className="tags-container">
              <input type="checkbox" name="option1" id="tags" value="reduce"/>
              <label htmlFor="option1">Reduce</label>

              <input type="checkbox" name="option2" id="tags" value="reuse" />
              <label htmlFor="option1">Reuse</label>
            </div>
          </label>
        </div>
      </form>
    </div>
    );
  }
}
