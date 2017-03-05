import React from 'react';
import countries from 'country-list';

/**
 * Stateless utility function to get country list for select tag.
 */
export default function getCountriesSelect() {
  const countriesList = countries();
  return countriesList.getNames().map((countryName) => (
    <option value={countryName} key={countryName}>{countryName}</option>
  ));
}
