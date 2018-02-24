import React from 'react';

// #TODO - This component is really simple, it only render html to the DOM
//  so it should be an Stateless Function Component.
class Header extends React.Component {
  render() {
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
        <h3 className="tagline"><span>{this.props.tagline}</span></h3>
      </header>
    )
  }
}

// #TODO - Create propTypes for Header

export default Header;
