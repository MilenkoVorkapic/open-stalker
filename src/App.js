import React, { useState, Fragment } from "react";
import axios from "axios";
function App() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchNewData = async () => {
    try {
      setData();
      setLoading(true);
      const res = await axios.get(`http://localhost:8080/${search}`, {
        timeout: 5000000
      });
      const found = res.data.match(/\bhttps?:\/\/\S+/gi);
      setData(found);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>Welcome to the Sherlock interface</h1>
      <h2>Type a name, and check all the matches!</h2>
      {!loading ? (
        data ? (
          <>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button onClick={fetchNewData}>Launch search</button>
            {data.map(url => (
              <Fragment key={url}>
                <br />
                <a href={url}>{url}</a>
              </Fragment>
            ))}
          </>
        ) : (
          <>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button onClick={fetchNewData}>Launch search</button>
          </>
        )
      ) : (
        <>
          <span>Loading...</span>
        </>
      )}
    </div>
  );
}

export default App;
