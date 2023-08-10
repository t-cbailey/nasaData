import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import React from "react";
import { getEvents } from "../utils";
import { mapProps, singleEvent } from "../customTypes";
import { Typography } from "@mui/material";
import { LatLngTuple } from "leaflet";
import marker from "../public/marker.png";
import { Icon } from "leaflet";

function Map({ url, setLoading }: mapProps) {
  const [events, setEvents] = React.useState<singleEvent[]>([]);

  React.useEffect(() => {
    setLoading(true);
    getEvents(url).then(({ events }) => {
      setEvents(events);
      setLoading(false);
    });
  }, [url]);

  return (
    <>
      <Typography sx={{ m: "2%" }}>Found {events.length} events</Typography>
      <MapContainer center={[51.505, -0.09]} zoom={2} scrollWheelZoom={false}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {events.map((event) => {
          let coords: LatLngTuple = Array.isArray(
            event.geometry[0].coordinates[0]
          )
            ? event.geometry[0].coordinates[0][0]
            : event.geometry[0].coordinates;

          return (
            <Marker
              key={event.id}
              position={[coords[1], coords[0]]}
              icon={
                new Icon({
                  iconUrl: marker,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41],
                })
              }
            >
              <Popup>
                Name:{event.title} <br />
                {event.description && `Description: ${event.description}.`}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </>
  );
}

export default Map;
