import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class inputPlace extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      geocodeResults: null,
      loading: false
    }
  }

  handleChange = (address) => {
    this.props.place(address)

    this.setState({
      address,
      geocodeResults: null
    })
  }

  render() {
    const cssClasses = {
      root: 'form-group',
      input: 'Demo__search-input',
      autocompleteContainer: 'Demo__autocomplete-container',
    }

    const AutocompleteItem = ({ formattedSuggestion }) => (
      <div className="Demo__suggestion-item">
        <i className='fa fa-map-marker Demo__suggestion-icon'/>
        <strong>{formattedSuggestion.mainText}</strong>{' '}
        <small className="text-muted">{formattedSuggestion.secondaryText}</small>
      </div>)

    const inputProps = {
      type: "text",
      value: this.state.address,
      onChange: this.handleChange,
      autoFocus: true,
      placeholder: "Rechercher une adresse",
      name: 'Demo__input',
      id: "my-input-id",
    }

    return (
      <PlacesAutocomplete
        autocompleteItem={AutocompleteItem}
        onEnterKeyDown={this.handleSelect}
        className="form-conrol"
        inputProps={inputProps}
      />
    )
  }
}

export default inputPlace
