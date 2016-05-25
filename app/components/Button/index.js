/**
*
* Button
*
*/

import React from 'react';

// import styles from './styles.css';

const Button = ({ name, icon, tooltip, ...props }) => (
  <button {...props}>
    <svg><use xlinkHref={icon} /></svg>
    <span className={tooltip ? 'plyr__tooltip' : 'plyr__sr-only'}>{name}</span>
  </button>
);

Button.propTypes = {
  icon: React.PropTypes.string.isRequired,
  name: React.PropTypes.string.isRequired,
  tooltip: React.PropTypes.bool,
};

export default Button;
