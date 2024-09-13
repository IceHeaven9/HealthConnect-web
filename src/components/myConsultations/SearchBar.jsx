import { useContext, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { AuthContext } from './../../contexts/authContext';
import { API_HOST } from '../../constants';

export const SearchBar = () => {
  const token = useContext(AuthContext);
  const [searchResults, setSearchResults] = useState([]);
  console.log(searchResults);

  const handleOnSearch = (string, results) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", token.currentUser.coded);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(`${API_HOST}/my-consultations?title=${string}`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      if (result.length === 0) {
        return fetch(`${API_HOST}/my-consultations?description=${string}`, requestOptions)
          .then((response) => response.json());
      }
      return result;
    })
    .then((result) => {
      const formattedResults = Array.isArray(result) ? result.map(item => ({
        id: item.id,
        name: item.patientName,
        date: item.date,
        title: item.title,
        severity: item.severity,
        description: item.description,
        doctorName: item.doctorName,
        doctorAvatar: item.doctorAvatar,
        specialityName: item.specialityName,
        status: item.status
      })) : [];
      setSearchResults(formattedResults);
    })
    .catch((error) => console.error(error));
  };


  const handleOnSelect = (item) => {

  };

  const handleOnFocus = () => {
    console.log('Focused');
  };

  const formatResult = (item) => {
    return (
      <div className="result-item">
        <img src={item.doctorAvatar} alt="" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
        <div>
          <span style={{ display: 'block', textAlign: 'left' }}>Name: {item.name}</span>
          <span style={{ display: 'block', textAlign: 'left' }}>Title: {item.title}</span>
          <span style={{ display: 'block', textAlign: 'left' }}>Speciality: {item.specialityName}</span>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <ReactSearchAutocomplete
            items={searchResults}
            onSearch={handleOnSearch}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          />
        </div>
      </header>
    </div>
  );
};