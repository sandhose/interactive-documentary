/**
*
* CommentForm
*
*/

import React from 'react';
import marked from 'marked';

import styles from './styles.css';

class CommentForm extends React.Component {
  constructor() {
    super();
    this.state = { brief: '', content: '' };
  }

  render() {
    const { onAdd, timestamp } = this.props;
    const { content, brief } = this.state;
    return (
      <div className={styles.wrapper}>
        <form
          className={styles.form}
          onSubmit={e => {
            e.preventDefault();
            onAdd({ timestamp, ...this.state });
            this.setState({ brief: '', content: '' });
          }}
        >
          <h2>Ajouter un commentaire</h2>
          <input value={brief} placeholder="Brief…" onChange={e => this.setState({ brief: e.target.value })} />
          <textarea value={content} rows={12} placeholder="Content…" onChange={e => this.setState({ content: e.target.value })} />
          <button type="submit">Add</button>
        </form>
        <div className={styles.preview} dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  onAdd: React.PropTypes.func.isRequired,
  timestamp: React.PropTypes.number.isRequired,
};

export default CommentForm;
