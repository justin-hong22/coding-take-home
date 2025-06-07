import { fetchData } from './middleware/middleware.ts'
import { useState, useEffect } from 'react';
import { type Listing, getListingsByField, getListingsWithNull } from './middleware/middleware.ts';
import data from './mock-data/MOCK_DATA.json';

function App() 
{
  fetchData();
  const [searchValue, setSearchValue] = useState('');
  const [field, setField] = useState<'color' | 'language'>('color');
  const [results, setResults] = useState<Listing[]>([]);

  useEffect(() => {setResults(data); }, []);
  const handleSearch = () => {
    const res = getListingsByField(field, searchValue);
    setResults(res);
  };

  const handleNullSearch = () => {
    const res = getListingsWithNull(field);
    setResults(res);
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
        <button onClick={handleNullSearch}>Find Listings will null {field}</button>
      </div>

      <h2>Results: {results.length} Listings Found</h2>
      <ul>
        {results.map((item) => (
          <li key = {item.id}> {item.first_name} {item.last_name}
            <ul>
              <li>Email: {item.email}</li>
              <li>Country: {item.country}</li>
              <li>Language: {item.language}</li>
              <li>Color: {item.color}</li>
            </ul>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App
