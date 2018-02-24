import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
  render() {
    // Any where else
    return (
      <form className="store-selector">
        {/* #TODO - onSubmit call method goToStore */}
        <h2>Please Enter A Store</h2>
        {/* #TODO - create an reference to storeInput */}
        <input type="text" required placeholder="Store Name" defaultValue={getFunName()} />
        <button type="submit">Visit Store →</button>
      </form>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}

export default StorePicker;
