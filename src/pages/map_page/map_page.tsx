import React, { useEffect, useState } from "react";
import GoogleMap from "google-map-react";
import styles from "./map_page.module.css";
import FavoritesBar from "../../components/favorites_bar/favorites_bar";
import CityDetails from "../../components/city_details/city_details";
import firebaseApp from "../../utils/firebaseApp";
import { useDispatch, useSelector } from "react-redux";
import { IRState } from "../../redux/reducers";
import {
  LOADED_DATA,
  LOADED_PLACES,
  LOADING_DATA,
  SET_POSITION,
} from "../../redux/actionTypes";
import { WEATHER_KEY } from "../../utils/credentials";
import { WeatherResponse } from "../../models/weather_response";
import {
  LocationMarker,
  PlaceMarker,
  SelectionMarker,
} from "../../components/markers/markers";
import { Place } from "../../models/DatabasePlace";

function MapPage() {
  const uid = useSelector<IRState, string | null>((state) => state.loggedInID);
  const places = useSelector<IRState, Place[] | undefined>(
    (state) => state.places
  );
  const dispatch = useDispatch();

  const selectedPosition = useSelector<IRState, GoogleMap.Coords>(
    (state) => state.selectedPosition
  );

  const [currentLocation, setCurrentLocation] = useState<GoogleMap.Coords>();

  const [apiLoaded, setApiLoaded] = useState(false);
  const [apiInstance, setApiInstance] = useState<any>(undefined);

  const [weatherInfo, setWeatherInfo] = useState<WeatherResponse>();
  const [locationInfo, setLocationInfo] =
    useState<google.maps.GeocoderResult>();

  const mapControlOptions = (maps: GoogleMap.Maps): GoogleMap.MapOptions => {
    return {
      fullscreenControl: false,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM,
      },
      mapTypeControl: true,
      mapTypeControlOptions: {
        position: google.maps.ControlPosition.RIGHT_TOP,
      },
    };
  };

  const handleApiLoaded = (map: any, api: any) => {
    setApiLoaded(true);
    setApiInstance(api);
    navigator.geolocation.getCurrentPosition((pos: GeolocationPosition) => {
      const coords = {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      };
      dispatch({ type: SET_POSITION, payload: coords });
      setCurrentLocation(coords);
    });
  };

  const loadGeocoding = async (lat: number, lng: number): Promise<void> => {
    try {
      const { values, status } = await fetchGeocodeFromCoords(lat, lng);

      if (status === "OK") {
        if (values) {
          const data = values.find((v) => v.types.includes("locality"));
          setLocationInfo(data);
        }
      }
    } catch (e) {
      console.error("Geocoding failed");
      console.error(e);
    }
  };

  const fetchGeocodeFromCoords = (lat: number, lng: number) => {
    const location = { lat, lng };

    return new Promise<{
      values: google.maps.GeocoderResult[] | null;
      status: google.maps.GeocoderStatus;
    }>((resolve, reject) => {
      if (apiInstance && apiLoaded) {
        const geocoder = new apiInstance.Geocoder() as google.maps.Geocoder;
        geocoder.geocode({ location }, (values, status) =>
          resolve({ values, status })
        );
      } else {
        reject("Failed to Geocode, api not loaded");
      }
    });
  };

  const fetchWeatherInformation = async (lat: number, lng: number) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${WEATHER_KEY}&lang=es`;

    try {
      const res = (await (await fetch(url)).json()) as WeatherResponse;
      setWeatherInfo(res);
    } catch (e) {
      console.error(e);
    }
  };

  const handleCoordClick = async (
    value: GoogleMap.ClickEventValue | { lat: number; lng: number }
  ): Promise<void> => {
    const { lat, lng } = value;

    dispatch({ type: SET_POSITION, payload: { lat, lng } });

    dispatch({ type: LOADING_DATA });

    const geocodeP = loadGeocoding(lat, lng);
    const weatherP = fetchWeatherInformation(lat, lng);

    try {
      await Promise.all([geocodeP, weatherP]);
      dispatch({ type: LOADED_DATA });
    } catch (e) {
      dispatch({ type: LOADED_DATA });
      console.error(e);
    }
  };

  const handleSelection = async (coords: google.maps.LatLngLiteral) => {
    const { lat, lng } = coords;
    dispatch({ type: LOADING_DATA });

    const geocodeP = loadGeocoding(lat, lng);
    const weatherP = fetchWeatherInformation(lat, lng);

    try {
      await Promise.all([geocodeP, weatherP]);
      dispatch({ type: LOADED_DATA });
    } catch (e) {
      dispatch({ type: LOADED_DATA });
      console.error(e);
    }
  };

  // Firestore handler
  useEffect(() => {
    const userDoc = firebaseApp.firestore().collection("users").doc(uid!);
    const snapshotSub = userDoc.onSnapshot((snapshot) => {
      const userData = snapshot.data();
      dispatch({ type: LOADED_PLACES, payload: userData && userData.places });
    });

    return () => {
      snapshotSub();
    };
  }, [uid, dispatch]);

  return (
    <div className={styles.container}>
      <div className={styles.barSpace}>
        <FavoritesBar onLocationClick={handleSelection} />
      </div>
      <div className={styles.map}>
        <GoogleMap
          bootstrapURLKeys={{
            key: "AIzaSyAlAfjkEyZc3T2vLRARL5f4QYJj3ZPai6Q",
            libraries: ["places"],
          }}
          center={selectedPosition}
          defaultZoom={12}
          options={mapControlOptions}
          onClick={handleCoordClick}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
          <SelectionMarker
            lat={selectedPosition.lat}
            lng={selectedPosition.lng}
          ></SelectionMarker>
          {currentLocation && (
            <LocationMarker
              lat={currentLocation?.lat}
              lng={currentLocation?.lng}
              onClick={() =>
                handleCoordClick({
                  lat: currentLocation?.lat,
                  lng: currentLocation?.lng,
                })
              }
            />
          )}

          {places &&
            places.length > 0 &&
            places.map((p, i) => (
              <PlaceMarker
                key={p.mainName + i}
                lat={p.coords.lat}
                lng={p.coords.lng}
                onClick={() =>
                  handleCoordClick({
                    lat: p.coords.lat,
                    lng: p.coords.lng,
                  })
                }
              />
            ))}
        </GoogleMap>
      </div>
      <div className={styles.desktopAside}>
        <CityDetails weatherData={weatherInfo} locationData={locationInfo} />
      </div>
    </div>
  );
}

export default MapPage;
