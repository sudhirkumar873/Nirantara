import React, { useState } from "react";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import TextField from "@mui/material/TextField";

const LocationAutocomplete = ({ onSelectLocation, coordinates, setCoordinates ,placeHolder ,address ,setAddress }) => {
  

  const handleSelect = async (selectedAddress) => {
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);

      setAddress(selectedAddress);
      setCoordinates({
        lat: latLng.lat,
        lng: latLng.lng,
      });

      // Call onSelectLocation with the most recent coordinates
      onSelectLocation({
        lat: latLng.lat,
        lng: latLng.lng,
      });
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  return (
    <div>
  
      <PlacesAutocomplete
        value={address}
        onChange={setAddress}
        onSelect={handleSelect}
      >
        {({
          getInputProps,
          suggestions,
          getSuggestionItemProps,
          loading,
        }) => (
          <div>
            <TextField
              {...getInputProps({
                placeholder: placeHolder,
                className: "location-search-input",
                style: {
                  width: "100%",
                  height: "40px",
                },
              })}
              required
            />
            <div
              style={{
                maxHeight: "40px",
                width: "100%",
                maxWidth: "100%",
                zIndex: "999",
                marginTop: "20px",
                boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
                background: "#fff",
                opacity: "1",
                position: "relative",
              }}
            >
              {loading && (
                <div style={{ height: "40px", lineHeight: "40px" }}>
                  Loading...
                </div>
              )}
              <div style={{ backgroundColor: "white" }}>
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? "#afda90" : "",
                    padding: "10px",
                    border: "1px solid grey",
                  };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, {
                        style,
                      })}
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    </div>
  );
};

export default LocationAutocomplete;
