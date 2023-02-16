import './App.css';
import {useState,useEffect} from 'react';
import Pagination from './Pagination';
function App() {

  const [data, setData] = useState([]);
  const [sortDateOrder, setSortDateOrder] = useState('asc');
  const [sortLikeOrder, setSortLikeOrder] = useState('asc');
  const [sortReplyOrder, setSortReplyOrder] = useState('asc');
  const [sortAuthorOrder, setSortAuthorOrder] = useState('asc');
  const [sortTextOrder, setSortTextOrder] = useState('asc');

  const [search, setSearch ]= useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);

  useEffect(() => {
    fetch('https://dev.ylytic.com/ylytic/test')
      .then(response => response.json())
      .then(json => setData(json.comments));
      
  }, []);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPosts = data.slice(firstPostIndex, lastPostIndex);

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


  return ( 
    <div className="App">
      <h1>Ylytic Assignment</h1>
      <div className='section1' >
        <div className='filter'>
          <input placeholder='Filter' onChange={(e)=>setSearch(e.target.value)}/>
        </div>
        <div className='sub-section1'>
          <Pagination
            totalPosts={data.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
          <div className='postsperpage'>
            <p>Posts per page:</p>
            <button onClick={()=>setPostsPerPage(25)}>25</button>
            <button onClick={()=>setPostsPerPage(50)}>50</button>
            <button onClick={()=>setPostsPerPage(100)}>100</button>
          </div>
        </div>
      </div>
      
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
          {currentPosts.filter((item) => {
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
