import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useState, useRef, useEffect } from "react";
import { useMap } from "react-leaflet/hooks";

const iconPerson = new L.Icon({
  iconUrl: require("../src/images/marker.png"),
});

function App() {
  const [enteredIp, setEnteredIp] = useState("");
  const refIp = useRef(null);
  const refLocation = useRef(null);
  const refCurrency = useRef(null);
  const refIsp = useRef(null);
  const [position, setPosition] = useState([6.59651, 3.34205]);

  const initialLoad = async () => {
    const response = await fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=2001521d1e634601ad70120e062bfdf6&ip`
    );
    const data = await response.json();
    refIp.current.innerHTML = data.ip;
    refLocation.current.innerHTML =
      data.city + " " + data.country_name + " " + data.country_code2;
    refCurrency.current.innerHTML = data.currency.name;
    refIsp.current.innerHTML = data.isp;
    setPosition([data.latitude, data.longitude]);
  };

  useEffect(() => {
    if (enteredIp === "") {
      initialLoad();
    }
  });

  const handleGottenData = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://api.ipgeolocation.io/ipgeo?apiKey=2001521d1e634601ad70120e062bfdf6&ip=${enteredIp}`
    );
    const data = await response.json();
    refIp.current.innerHTML = data.ip;
    refLocation.current.innerHTML =
      data.city + " " + data.country_name + " " + data.country_code2;
    refCurrency.current.innerHTML = data.currency.name;
    refIsp.current.innerHTML = data.isp;
    setPosition([data.latitude, data.longitude]);
  };

  function MyComponent() {
    const map = useMap();
    map.flyTo(position);
  }

  return (
    <section>
      <div className="bg-fashion py-6 space-y-6">
        <h1 className="font-bold text-center text-2xl text-white">
          IP Address Tracker
        </h1>
        <div>
          <form
            className="space-x-0 flex justify-center"
            onSubmit={handleGottenData}
          >
            <input
              value={enteredIp}
              onChange={(e) => {
                setEnteredIp(e.target.value);
              }}
              type="text"
              placeholder="Search for any IP address or domain; 8.8.8.8"
              className="md:w-4/12 w-9/12 py-3 text-sm px-3 rounded-l-lg outline-none"
            />
            <button
              onClick={handleGottenData}
              className="bg-black px-4 py-2 text-white rounded-r-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
                <path
                  fill="none"
                  stroke="#FFF"
                  strokeWidth="2"
                  d="M1 4l6 6-6 6"
                />
              </svg>
            </button>
          </form>
        </div>
        <div className="space-y-4 md:space-y-0 text-center md:text-left mx-auto flex flex-col md:flex-row md:divide-x-2 w-10/12 md:w-9/12 bg-white md:px-4 lg:px-12 py-3 rounded-lg">
          <div className="basis-1/4">
            <p className="text-xs text-slate-700">IP ADDRESS</p>
            <p ref={refIp} className="text-xl font-bold break-all"></p>
          </div>
          <div className="basis-1/4 px-2">
            <p className="text-xs text-slate-700">LOCATION</p>
            <p ref={refLocation} className="text-xl font-bold"></p>
          </div>
          <div className="basis-1/4 px-2">
            <p className="text-xs text-slate-700">CURRENCY</p>
            <p ref={refCurrency} className="text-xl font-bold"></p>
          </div>
          <div className="basis-1/4 pl-2 lg:pr-16">
            <p className="text-xs text-slate-700">ISP</p>
            <p ref={refIsp} className="text-xl font-bold"></p>
          </div>
        </div>
      </div>
      <div className=" Map">
        <MapContainer center={position} zoom={14} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} icon={iconPerson}></Marker>
          <MyComponent />
        </MapContainer>
      </div>
    </section>
  );
}

export default App;
