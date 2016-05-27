/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Player from '../../containers/Player';
import CommentsList from '../../containers/CommentsList';

import styles from './styles.css';

export function HomePage() {
  return (
    <div>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <header className={styles.header}>
            <h1>Title.</h1>
          </header>
          <Player />
        </div>
      </div>
      <div className={styles.container}>
        <CommentsList />
      </div>
    </div>
  );
}

export default HomePage;
