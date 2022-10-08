import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

function Data() {
  const token = "EDcLQeibkAADEkEoyYBWn7bf2ssKZ";
  const [data, setData] = useState([]);
  const [origins, setOrigins] = useState("tbilisi");
  const [destinations, setDestinations] = useState("batumi");
  // const [waypont, setWypont] = useState("gori");
  useEffect(() => {
    try {
      async function fetchData() {
        const response = await axios.get(
          `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${token}`
        );
        const { rows } = response.data;
        setData(rows);
      }
      fetchData();
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleClick = async () => {
    try {
      const response = await axios.get(
        `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${origins}&destinations=${destinations}&key=${token}`
      );
      const { rows } = response.data;
      setData(rows);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="data">
      <input value={origins} onChange={(e) => setOrigins(e.target.value)} />
      {/* <input value={waypont} onChange={(e) => setWypont(e.target.value)} /> */}
      <input
        value={destinations}
        onChange={(e) => setDestinations(e.target.value)}
      />
      <div>
        {data?.map(({ elements }) => {
          return elements.map(({ distance }) => {
            return <div  key={uuidv4()}>Distance {distance.text}</div>;
          });
        })}
      </div>
      <button onClick={handleClick}>find</button>
    </div>
  );
}

export default Data;
