import React, { Component } from "react";
import {InfoAlert} from "./Alert";
import PropTypes from "prop-types";
import "./CitySearch.css";

export class CitySearch extends Component {
  state = {
    query: "",
    suggestions: [],
    showSuggestions: undefined,
    infoText: "",
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.setState({query: value});
    const suggestions = this.props.locations.filter((location) => {
      return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
    });
    if (suggestions.length === 0) {
      this.setState({
        query: value,
        infoText: "Not found, try again."
      });
    } else {
      return this.setState({ 
        query: value, 
        suggestions,
        infoText:"" 
      });
    }
  };

  handleItemClicked = (suggestion) => {
    this.setState({
      query: suggestion,
      showSuggestions: false,
      infoText: "",
    });
    this.props.updateEvents(suggestion);
  };

  render() {
    return (
      <div className='CitySearch' style={{"display": "block"}}>
        <InfoAlert text={this.state.infoText} />
        <input className="city"
          type="text"
          value={this.state.query}
          placeholder="Search a city..."
          onChange={this.handleInputChanged}
          onFocus={() => {this.setState({ showSuggestions: true }); }}
        />
        <ul className="suggestions" 
          style={this.state.showSuggestions ? {} : { display: "none"}}>
          {this.state.suggestions.map((suggestion) => (
            <li 
              key={suggestion}
              onClick={() => this.handleItemClicked(suggestion)}
            >
              {suggestion}
            </li>
          ))}
          <li key='all' onClick={() => this.handleItemClicked("all")}>
            <b>See all cities</b>
          </li>
        </ul>
      </div>
    );
  }
}

CitySearch.propTypes = { 
  locations: PropTypes.array.isRequired,
  updateEvents: PropTypes.func.isRequired
};

export default CitySearch;
