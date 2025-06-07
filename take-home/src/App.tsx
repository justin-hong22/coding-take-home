import { fetchData } from './middleware/middleware.ts'
import { useState, useEffect } from 'react';
import { type Listing, getListingsByField, getListingGroupedByCountry, getListingsWithNull } from './middleware/middleware.ts';
import data from './mock-data/MOCK_DATA.json';
import './App.css';

function App() 
{
  fetchData();
  const [searchValue, setSearchValue] = useState('');
  const [field, setField] = useState<'color' | 'language'>('color');
  const [results, setResults] = useState<Listing[]>([]);
  const [groupResults, setGroupResults] = useState<{[country: string]: Listing[]}>({});
  const [expandCountries, setExpandCountries] = useState<{[country: string]: boolean}>({});
  useEffect(() => {setResults(data); }, []);

  const handleSearch = () => {
    if(searchValue == "") {
      setResults(data);
    }
    else
    {
      const res = getListingsByField(field, searchValue);
      setResults(res);
    }
    setGroupResults({});
  };

  const handleCountryGrouping = () => {
    const groupings = getListingGroupedByCountry();
    setResults([]);
    setGroupResults(groupings);
  };

  const handleNullSearch = () => {
    const res = getListingsWithNull(field);
    setResults(res);
    setGroupResults({});
  };

  const toggleCountry = (country: string) => {
    setExpandCountries(prev => ({
      ...prev,
      [country]: !prev[country]
    }));
  };

  return (
    <>
      <h1>ACTUAL take home test</h1>

      <div>
        <label>Search Field : {' '}</label>
        <select value = {field} onChange = {(e) => setField(e.target.value as 'color' | 'language')}>
          <option value = 'color'>Color</option>
          <option value = 'language'>Language</option>
        </select>
      </div>
      <div>
        <label>{' '} Search Value : {' '}</label>
        <input type = 'text' value = {searchValue} placeholder = {`Input ${field}`} onChange = {(e) => setSearchValue(e.target.value)}/>
        <label>{' '}</label>
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        <button onClick = {handleCountryGrouping}>Group Listings By Country</button>
        <button onClick = {handleNullSearch}>Find Listings will null {field}</button>
      </div>

      {results && Object.keys(groupResults).length == 0 && (
        <>
          <h2>Results: {results.length} Listings Found</h2>
          {results.length > 0 ? (
            <table className='table' style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid white' }}>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th>Country</th>
                <th>Language</th>
                <th>Color</th>
              </tr>
              {results.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.first_name} {item.last_name}</td>
                  <td>{item.email}</td>
                  <td>{item.country}</td>
                  <td>{item.language}</td>
                  <td>{item.color}</td>
                </tr>
              ))}
            </table>
          ) : (
            <p>No Results Found</p>
          )}
        </>
      )}

      {Object.keys(groupResults).length > 0 && (
        <>
          <h2>Listings Grouped By Country</h2>
            {Object.entries(groupResults).map(([country, listings]) => (
            <div key={country}>
              <h3>
                {country} ({listings.length} Listings)
                <button onClick={() => toggleCountry(country)} style={{ marginLeft: '10px'}}>
                  {expandCountries[country] ? '-' : '+'}
                </button>
              </h3>

              {expandCountries[country] && (
                <table className='table' style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid white' }}>
                  <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Country</th>
                    <th>Language</th>
                    <th>Color</th>
                  </tr>
                  {listings.map((item, index) => (
                    <tr key={item.id}>
                      <td>{index + 1}</td>
                      <td>{item.first_name} {item.last_name}</td>
                      <td>{item.email}</td>
                      <td>{item.country}</td>
                      <td>{item.language}</td>
                      <td>{item.color}</td>
                    </tr>
                  ))}
                </table>
              )}
            </div>
          ))}
        </>
      )}
    </>
  )
}

export default App
