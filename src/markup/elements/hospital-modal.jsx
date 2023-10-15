import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
const {
  REACT_APP_UMEDI_GOOGLE_MAP_API_TOKEN
} = process.env;

function HospitalModal({show, handleClose, hospital}) {
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: REACT_APP_UMEDI_GOOGLE_MAP_API_TOKEN
  }) 

  const onLoad = (map) => {
    if (hospital) {
      new window.google.maps.LatLngBounds({lat: hospital?.latitude, lng: hospital?.longitude});
      setMap(map);
    }
  }

  const onUnmount = (map) =>  {
    setMap(null);
  }

  return (
    <div
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal
        dialogClassName="modal-container"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <div className="location-icon-wrap">
              <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.0001 26.4857L15.9016 25.47C16.9244 24.2986 17.8444 23.1871 18.663 22.13L19.3387 21.2386C22.1601 17.4371 23.5716 14.42 23.5716 12.19C23.5716 7.43 19.7344 3.57143 15.0001 3.57143C10.2659 3.57143 6.42871 7.43 6.42871 12.19C6.42871 14.42 7.84014 17.4371 10.6616 21.2386L11.3373 22.13C12.5051 23.6263 13.7268 25.0782 15.0001 26.4857Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.0001 15.7143C16.9726 15.7143 18.5716 14.1153 18.5716 12.1429C18.5716 10.1704 16.9726 8.57143 15.0001 8.57143C13.0277 8.57143 11.4287 10.1704 11.4287 12.1429C11.4287 14.1153 13.0277 15.7143 15.0001 15.7143Z" stroke="black" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="hospital-modal-wrap">
            <div className="title">{hospital?.name}</div>
            <div className="subtitle">{hospital?.address}</div>
            {
              isLoaded && (
                <GoogleMap
                  disableDefaultUI={true}
                  mapTypeControl={false}
                  mapContainerStyle={{
                    width: '85vw',
                    height: '40vh'
                  }}
                  center={{lat: hospital?.latitude, lng: hospital?.longitude}}
                  zoom={15}
                  onLoad={onLoad}
                  onUnmount={onUnmount}
                >
                  <MarkerF position={{lat: hospital?.latitude, lng: hospital?.longitude}} />
                </GoogleMap>
              ) 
            }
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default HospitalModal;