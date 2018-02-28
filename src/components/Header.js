import React from 'react';
// #TODO - import propTypes from prop-types
import PropTypes from 'prop-types';

// #TODO - This component is really simple, it only render html to the DOM
//  so it should be an Stateless Function Component.
const Header = (props) => {
  return (
    <header className="top">
      <h1>
        Catch
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
        Day
      </h1>
      <h3 className="tagline"><span>{props.tagline}</span></h3>
    </header>
  )
}

Header.propTypes = {
  tagline: PropTypes.string.isRequired
};

// #TODO - Create propTypes for Header

export default Header;
