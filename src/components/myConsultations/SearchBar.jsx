import { useContext, useState } from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { AuthContext } from './../../contexts/authContext';
import { API_HOST } from '../../constants';

export const SearchBar = () => {
  const token = useContext(AuthContext);
  const [searchResults, setSearchResults] = useState([]);

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
        if (!Array.isArray(result)) {
          result = result ? [result] : []; 
        }
        if (result.length === 0) {
          return fetch(`${API_HOST}/my-consultations?description=${string}`, requestOptions)
            .then((response) => response.json())
            .then((result) => {
              if (!Array.isArray(result)) {
                result = result ? [result] : []; 
              }
              return result;
            });
        }
        return result;
      })
      .then((result) => {
        const formattedResults = result.map(item => ({
          id: item.id,
          name: item.title,
          date: item.date,
          severity: item.severity,
          description: item.description,
          doctorName: item.doctorName,
          doctorAvatar: item.doctorAvatar,
          specialityName: item.specialityName,
          status: item.status
        }));
        setSearchResults(formattedResults);
      })
      .catch((error) => console.error(error));
  };

  const handleOnSelect = (item) => {
    console.log("Selected item:", item);
  };
  

  const formatResult = (item) => {
    return (
      <div className='min-h-max' >
        <div className=' flex flex-col p-2 m-1'>
          <div className='flex items-center justify-between'>
        <span className='font-ubuntu font-bold text-carbon text-sm'>{new Date(item.date).toLocaleDateString("es-ES")}</span>
          <span className='font-ubuntu font-bold text-carbon text-sm pr-6'> {item.specialityName}</span>
          </div>
          <span className='font-ubuntu font-bold text-carbon text-xl'> {item.name}</span> 
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
            autoFocus
            formatResult={formatResult}
            fuseOptions={{ keys: ["name", "description"] }} 
            resultStringKeyName="name" 
          />
        </div>
      </header>
    </div>
  );
};