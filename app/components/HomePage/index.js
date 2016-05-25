/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import Player from '../../containers/Player';
import VideoPlyr from '../VideoPlyr';
import { Mark } from '../VideoTimeline';

import styles from './styles.css';

export function HomePage() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>Title.</h1>
        </header>
        <VideoPlyr playing played={38} loaded={93} duration={183}>
          <Mark time={42} />
        </VideoPlyr>
      </div>
    </div>
  );
}

export default HomePage;
