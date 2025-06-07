import { fetchData } from './middleware/middleware.ts'
import { useState, useEffect } from 'react';
import { type Listing, getListingsByField, getListingsWithNull } from './middleware/middleware.ts';
import data from './mock-data/MOCK_DATA.json';
import './App.css';

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
      <table className = 'table' style={{ borderCollapse: 'collapse', width: '100%', border: '1px solid white' }}>
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
    </>
  )
}

export default App
