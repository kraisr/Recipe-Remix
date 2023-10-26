import React, { useEffect, useRef } from 'react';

const MapComponent = () => {
    const mapRef = useRef(null);
    const directionsServiceRef = useRef(new window.google.maps.DirectionsService());
    const directionsRendererRef = useRef(new window.google.maps.DirectionsRenderer());

    useEffect(() => {
        if (!window.google || !window.google.maps) {
            console.error('Google Maps JavaScript API library is not loaded');
            return;
        }
        const mapOptions = {
            zoom: 15,
            center: { lat: 40.4237, lng: -86.9212 }  // Purdue University's coordinates
        };

        const map = new window.google.maps.Map(mapRef.current, mapOptions);
        window.google.maps.event.trigger(map, 'resize');

        directionsRendererRef.current.setMap(map);

        // Search for grocery stores nearby Purdue University
        const service = new window.google.maps.places.PlacesService(map);
        service.nearbySearch({
            location: { lat: 40.4237, lng: -86.9212 },
            radius: 5000,  // 5 km
            type: ['grocery_or_supermarket']
        }, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                for (let i = 0; i < results.length; i++) {
                    createMarker(results[i], map);
                }
            }
        });

    }, []);

    const createMarker = (place, map) => {
        const marker = new window.google.maps.Marker({
            map,
            position: place.geometry.location
        });

        const infowindow = new window.google.maps.InfoWindow();

        window.google.maps.event.addListener(marker, 'click', () => {
            infowindow.setContent(`
                <div>
                    <strong>${place.name}</strong><br>
                    ${place.vicinity}<br>
                    <button onclick="getDirectionsTo('${place.geometry.location}')">Get Directions</button>
                </div>
            `);
            infowindow.open(map, marker);
        });
    };

    window.getDirectionsTo = (destination) => {
        const request = {
            origin: { lat: 40.4237, lng: -86.9212 },  // Starting from Purdue University
            destination,  // The chosen store's location
            travelMode: 'DRIVING'
        };

        directionsServiceRef.current.route(request, (result, status) => {
            if (status === 'OK') {
                directionsRendererRef.current.setDirections(result);
            } else {
                alert('Directions request failed due to ' + status);
            }
        });
    };

    return (
        <div>
            <div ref={mapRef} style={{ width: '400px', height: '400px' }}></div>
        </div>
    );
}

export default MapComponent;
