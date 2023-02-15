import './App.css';
import {useState,useEffect} from 'react';
function App() {

  const [data, setData] = useState(null);
  const [sortDateOrder, setSortDateOrder] = useState('asc');
  const [sortLikeOrder, setSortLikeOrder] = useState('asc');
  const [sortReplyOrder, setSortReplyOrder] = useState('asc');
  const [sortAuthorOrder, setSortAuthorOrder] = useState('asc');
  const [sortTextOrder, setSortTextOrder] = useState('asc');

  const [search, setSearch ]= useState('');
  

  
  useEffect(() => {
    fetch('https://dev.ylytic.com/ylytic/test')
      .then(response => response.json())
      .then(json => setData(json.comments));
      
  }, []);
  // console.log(data)

    const handleDateSort = () => {
    const sortedData = data.sort((a, b) => {
      if (sortDateOrder === 'asc') {
        return new Date(a.at) - new Date(b.at);
      } else {
        return new Date(b.at) - new Date(a.at);
      }
    });

    setData(sortedData);
    setSortDateOrder(sortDateOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleCountSort = () => {
    const sortedData = data.sort((a, b) => {
      if (sortLikeOrder === 'asc') {
        return a.like - b.like;
      } else {
        return b.like - a.like;
      }
    });

    setData(sortedData);
    setSortLikeOrder(sortLikeOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleReplySort = () => {
    const sortedData = data.sort((a, b) => {
      if (sortReplyOrder === 'asc') {
        return a.like - b.like;
      } else {
        return b.like - a.like;
      }
    });

    setData(sortedData);
    setSortReplyOrder(sortReplyOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleAuthorSort = () => {
    const sortedData = data.sort((a, b) => {
      if (sortAuthorOrder === 'asc') {
        return a.author < b.author ? -1 : 1;
      } else {
        return b.author > a.author ? 1 : -1;
      }
    });

    setData(sortedData);
    setSortAuthorOrder(sortAuthorOrder === 'asc' ? 'desc' : 'asc');
  };
  const handleTextSort = () => {
    const sortedData = data.sort((a, b) => {
      if (sortTextOrder === 'asc') {
        return a.text < b.text ? -1 : 1;
      } else {
        return b.text > a.text ? 1 : -1;
      }
    });

    setData(sortedData);
    setSortTextOrder(sortTextOrder === 'asc' ? 'desc' : 'asc');
  };

  // const filteredItems = data.filter((item) =>
  //   item.author.toLowerCase().includes(searchInput.toLowerCase())
  // );

  return ( 
    <div className="App">
      <input placeholder='Filter' onChange={(e)=>setSearch(e.target.value)}/>
    <div>
      {data ? (
        <table>
          <thead>
            <tr>
              <th>
                At{' '}
                <button onClick={handleDateSort}>
                  {sortDateOrder === 'asc' ? '▲' : '▼'}
                </button>
              </th>
              <th>
                Author{' '}
                <button onClick={handleAuthorSort}>
                  {sortAuthorOrder === 'asc' ? '▲' : '▼'}
                </button>
              </th>
              <th>
                Like{' '}
                <button onClick={handleCountSort}>
                  {sortLikeOrder === 'asc' ? '▲' : '▼'}
                </button>
              </th>
              <th>
                Reply{' '}
                <button onClick={handleReplySort}>
                  {sortReplyOrder === 'asc' ? '▲' : '▼'}
                </button>
              </th>
              <th>
                Text{' '}
                <button onClick={handleTextSort}>
                  {sortTextOrder === 'asc' ? '▲' : '▼'}
                </button>
              </th>
            </tr>
          </thead>
          {data.filter((item) => {
            return search.toLocaleLowerCase()==='' ? item : item.author.toLocaleLowerCase().includes(search)
          }).map(item => (
            <tr> 
              <td>{item.at}</td>
              <td>{item.author}</td>
              <td>{item.like}</td>
              <td>{item.reply}</td>
              <td>{item.text}</td>
            </tr>
          ))}
        </table>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </div>
  );
}

export default App;
