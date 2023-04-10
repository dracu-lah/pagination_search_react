import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = `https://jsonplaceholder.typicode.com/photos`;

function CountryData() {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState([]);
  const [paginate, setPaginate]=useState(8)
  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);


  const filteredData = data.filter(item => {
    return item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toString().includes(searchTerm);
  });

  const load_more = (event) => {
    setpaginate((prevValue) => prevValue + 8);
  };


  return (
    <div className="m-4">
      <input
        onChange={(e) => setSearchTerm(e.target.value)}
        type="text"
        className="outline-none bg-slate-200 w-full m-2 text-center p-2 rounded-lg"
        placeholder="search here..."
      />
      <div></div>
      <div className="grid grid-cols-4 gap-4">
        {filteredData.slice(0,paginate).map((photo) => (
          <div
            className="flex flex-col items-center justify-center"
            key={photo.id}
          >
            <img src={photo.url} alt="" width={200} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
      <div>
      <button onClick={(e=>{setPaginate((prevValue)=>prevValue+8)})}>Load More</button>
      </div>
    </div>
  );
}

export default CountryData;
