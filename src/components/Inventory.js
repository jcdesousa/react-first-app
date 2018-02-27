import React from 'react';
import PropTypes from 'prop-types';

import AddFishForm from './AddFishForm';

class Inventory extends React.Component {  
  handleChange = (e, key) => {
    const fish = this.props.fishes[key];
    // take a copy of that fish and update it with the new data
    const updatedFish = {
      ...fish,
      [e.target.name]: e.target.value,
    };
    this.props.updateFish(key, updatedFish);
  };

  renderInventory = key => {
    const fish = this.props.fishes[key];

    return (
      <div className="fish-edit" key={key}>
        <input
          type="text"
          name="name"
          value={fish.name}
          placeholder="Fish Name"
          onChange={e => this.handleChange(e, key)}
        />
        <input
          type="text"
          name="price"
          value={fish.price}
          placeholder="Fish Price"
          onChange={e => this.handleChange(e, key)}
        />

        <select
          type="text"
          name="status"
          value={fish.status}
          placeholder="Fish Status"
          onChange={e => this.handleChange(e, key)}
        >
          <option value="available">Fresh!</option>
          <option value="unavailable">Sold Out!</option>
        </select>

        <textarea
          type="text"
          name="desc"
          value={fish.desc}
          placeholder="Fish Desc"
          onChange={e => this.handleChange(e, key)}
        />
        <input
          type="text"
          name="image"
          value={fish.image}
          placeholder="Fish Image"
          onChange={e => this.handleChange(e, key)}
        />
        <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
      </div>
    );
  };

  render() {    
    return (
      <div>
        <h2>Inventory</h2>

        {Object.keys(this.props.fishes).map(this.renderInventory)}
        <AddFishForm addFish={this.props.addFish} />

        {/* #TODO - Add a button to load sample Fishes */ }
      </div>
    );
  }

  
}

Inventory.propTypes = {
  fishes: PropTypes.object.isRequired,
  updateFish: PropTypes.func.isRequired,
  removeFish: PropTypes.func.isRequired,
  addFish: PropTypes.func.isRequired,
  // #TODO - Add PropType validation to loadSamples
  loadSamples: PropTypes.func.isRequired,
};

export default Inventory;
