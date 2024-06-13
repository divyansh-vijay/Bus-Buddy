"use client"
import BusImage from "../public/busSchool-192.png"
import React, { useState, useEffect } from "react"
import {
	APIProvider,
	Map,
	AdvancedMarker,
	Pin,
	useMapsLibrary,
	useMap,
} from "@vis.gl/react-google-maps"
import Image from "next/image"
import { Polygon } from "../components/Polygon"
import { Polyline } from "../components/Polyline"
import dummyData from "../public/fullDistance.json"

function calculateDistance(lat1, lng1, lat2, lng2) {
	const R = 6371 // Radius of the Earth in kilometers
	const dLat = ((lat2 - lat1) * Math.PI) / 180 // Convert degrees to radians
	const dLon = ((lng2 - lng1) * Math.PI) / 180
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos((lat1 * Math.PI) / 180) *
			Math.cos((lat2 * Math.PI) / 180) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2)
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	const distance = R * c // Distance in kilometers
	return distance
}

function findClosestPoint(origin, legs) {
	if (!legs[0].hasOwnProperty("steps")) return
	// console.log(legs[0])
	// console.log(legs[0].steps)
	var closestPoint = {}
	var leastDistance = Infinity
	var legI = 0
	var stepI = 0
	for (var legIndex = 0; legIndex < legs.length; legIndex++) {
		for (let i = 0; i < legs[legIndex].steps.length; i++) {
			legs[legIndex].steps[i].lat_lngs.forEach((destination) => {
				var currentDistance = calculateDistance(
					origin.lat,
					origin.lng,
					destination.lat,
					destination.lng
				)
				if (currentDistance < leastDistance) {
					legI = legIndex
					stepI = i
					leastDistance = currentDistance
					closestPoint = destination
				}
			})
		}
	}

	// console.log({
	// 	leastDistance: leastDistance * 1000,
	// 	closestPoint,
	// })
	if (leastDistance * 1000 > 80) {
		return { closestPoint: origin, legI, stepI }
	}
	return { closestPoint, legI, stepI }
}

function findDistance(legI, stepI, route) {
	var duration = 0,
		distance = 0
	for (let legIndex = legI; legIndex < route[0].legs.length; legIndex++) {
		var leg = route[0].legs[legIndex]
		for (let stepIndex = stepI; stepIndex < leg.steps.length; stepIndex++) {
			var step = leg.steps[stepIndex]
			// console.log(
			// 	legIndex,
			// 	stepIndex,
			// 	step.distance.text,
			// 	step.duration.text
			// )
			duration += step.duration.value
			distance += step.distance.value
		}
		stepI = 0
	}
	// console.log({ duration, distance })
	return { duration, distance }
}

const MapPage = ({ currentBusLatlng, data, setCurrentBusDetails }) => {
	const geometryLibrary = useMapsLibrary("geometry")
	const GOOGLE_MAPS_API_KEY = "AIzaSyDbfHQRv0sxBJRdzM2fl6fZ8e-jg74P8mQ"
	const [path, setPath] = useState([])
	const [marker, setMarker] = useState([])

	const [currentEditedLatLng, setCurrentEditedLatLng] =
		useState(currentBusLatlng)

	useEffect(() => {
		// console.log(path)
		if (
			!currentBusLatlng.hasOwnProperty("lat") ||
			!path ||
			(currentBusLatlng["lat"] == 0 && currentBusLatlng["lng"] == 0)
		)
			return

		var { closestPoint, legI, stepI } = findClosestPoint(
			currentBusLatlng,
			dummyData.routes[0].legs
		)

		setCurrentEditedLatLng(closestPoint)

		// var currentLocation =  dummyData.routes[0].legs[legI].steps[stepI].
		// console.log(data)
		// console.log(data.waypoints[legI], data.waypoints[legI + 1])
		// setCurrentLocation(data.waypoints[legI])
		// setNextStop(data.waypoints[legI + 1])

		// console.log({ closestPoint, legI, stepI })
		var { duration, distance } = findDistance(legI, stepI, dummyData.routes) // Finds the distance left from current point
		var currentDurationAccordingToSpeed =
			distance / ((data.speed * 1000) / 60 / 60)
		// console.log({
		// 	duration,
		// 	speed: data.speed,
		// 	currentDurationAccordingToSpeed,
		// })
		var delay = duration - currentDurationAccordingToSpeed
		var totalDuration = 0
		dummyData.routes[0].legs.forEach((leg) => {
			totalDuration += leg.duration.value
		})

		var etaPercentage = (duration / totalDuration) * 100
		var eta = currentDurationAccordingToSpeed
		// console.log(eta)
		setCurrentBusDetails((prev) => ({
			...prev,
			lastStop: [
				data.waypoints[legI].location,
				data.waypoints[legI].time,
			],
			nextStop: [
				data.waypoints[legI + 1].location,
				data.waypoints[legI + 1].time,
			],
			delay,
			eta,
			etaPercentage,
		}))

		// console.log(dummyData.routes[0])
		// console.log(dummyData.routes[0].legs)
		// console.log({ currentBusLatlng })
		// setMarker((prev) => [
		// 	...prev,
		// 	findClosestPoint(
		// 		currentBusLatlng,
		// 		dummyData.routes[0].legs[0].steps
		// 	),
		// ])

		// setMarker((prev) => [
		// 	...prev,
		// 	findClosestPoint(
		// 		currentBusLatlng,
		// 		dummyData.routes[0].legs[1].steps
		// 	),
		// ])
		// setMarker((prev) => [
		// 	...prev,
		// 	findClosestPoint(
		// 		currentBusLatlng,
		// 		dummyData.routes[0].legs[2].steps
		// 	),
		// ])
		// setMarker((prev) => [
		// 	...prev,
		// 	findClosestPoint(
		// 		currentBusLatlng,
		// 		dummyData.routes[0].legs[3].steps
		// 	),
		// ])
		// setMarker((prev) => [
		// 	...prev,
		// 	findClosestPoint(
		// 		currentBusLatlng,
		// 		dummyData.routes[0].legs[4].steps
		// 	),
		// ])
		// findClosestPoint(currentBusLatlng, dummyData.routes[0].legs[1].steps)
		// findClosestPoint(currentBusLatlng, dummyData.routes[0].legs[2].steps)
		// findClosestPoint(currentBusLatlng, dummyData.routes[0].legs[3].steps)
		// findClosestPoint(currentBusLatlng, dummyData.routes[0].legs[4].steps)
		// console.log(dummyData)
	}, [path, currentBusLatlng])

	// useEffect(() => {
	// 	console.log({ currentEditedLatLng })
	// }, [currentEditedLatLng])

	// useEffect(() => {
	// 	console.log(currentBusLatlng)
	// }, [currentBusLatlng])
	return (
		<div className="min-h-[400px] max-h-[400px] w-[95%] bg-gray-200 rounded-[20px] overflow-hidden outline">
			<APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
				<Map
					style={{ width: "100vw", height: "100vh" }}
					defaultCenter={currentEditedLatLng}
					defaultZoom={10}
					gestureHandling={"greedy"}
					mapId="	f765e88f64ae3cc	"
					options={{
						minZoom: 11,
						maxZoom: 16, // Set the maximum zoom level here
					}}
					disableDefaultUI={true}>
					<AdvancedMarker
						// key={poi.key}
						position={currentEditedLatLng}
						// ref={(marker) => setMarkerRef(marker, poi.key)}
						clickable={true}
						onClick={() => alert("marker was clicked!")}>
						<Image
							alt="bus"
							src={BusImage}
							height={48}
							width={48}></Image>
					</AdvancedMarker>
					{dummyData.routes[0].legs.map((leg, legIndex) => (
						<React.Fragment key={legIndex}>
							{leg.steps.map((step, stepIndex) => (
								<React.Fragment key={stepIndex}>
									{
										<>
											<Polyline
												key={step.encodedPath}
												strokeWeight={stepIndex}
												strokeColor={"#356471"}
												path={step.lat_lngs}
											/>
										</>
									}
								</React.Fragment>
							))}
						</React.Fragment>
					))}
					{marker &&
						marker.map(
							(m) => (
								console.log(m != {}),
								(
									<AdvancedMarker
										// key={poi.key}
										position={m}
										// ref={(marker) => setMarkerRef(marker, poi.key)}
										clickable={true}
										onClick={() =>
											alert("marker was clicked!")
										}>
										<Image
											src={BusImage}
											alt="bus"
											height={24}
											width={24}></Image>
									</AdvancedMarker>
								)
							)
						)}
				</Map>
			</APIProvider>
		</div>
	)
}
{
	/* <Directions
						origin={currentBusLatlng}
						destination={data.nextStop}
						setPath={setPath}
						path={path}
					/> */
}
function Directions({ origin, destination, waypoints, path, setPath }) {
	const map = useMap()
	const routesLibrary = useMapsLibrary("routes")
	const [directionsService, setDirectionsService] = useState()
	const [directionsRenderer, setDirectionsRenderer] = useState()
	const [routes, setRoutes] = useState([])
	const [routeIndex, setRouteIndex] = useState(0)
	const selected = routes[routeIndex]
	const leg = selected?.legs[0]
	// Initialize directions service and renderer
	useEffect(() => {
		if (!routesLibrary || !map) return
		setDirectionsService(new routesLibrary.DirectionsService())
		setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }))
	}, [routesLibrary, map])

	// Use directions service
	useEffect(() => {
		if (!directionsService || !directionsRenderer) return
		directionsService
			.route({
				origin: "PSIT Kanpur",
				destination: "PSIT Kanpur",
				waypoints: [
					{
						location: "KRISHNA NAGAR ( HONDA SHOW ROOM) Kanpur",
						stopover: true,
					},
					{
						location: "SHYAM NAGAR kanpur",
						stopover: true,
					},
					{
						location: "HARIHAR DHAM kanpur",
						stopover: true,
					},
					{
						location: " 37 VAHINI PAC VAHINI TURN kanpur",
						stopover: true,
					},
					{
						location: "SHYAM NAGAR BAYPASS kanpur",
						stopover: true,
					},
				],
				travelMode: google.maps.TravelMode.DRIVING,
				provideRouteAlternatives: true,
				unitSystem: google.maps.UnitSystem.METRIC,
			})
			.then((response) => {
				directionsRenderer.setDirections(response)
				setRoutes(response.routes)
				setPath(response)
				console.log(response)
			})
		// directionsService
		// 	.route({
		// 		origin: origin,
		// 		destination: destination,
		// 		travelMode: google.maps.TravelMode.DRIVING,
		// 		provideRouteAlternatives: true,
		// 		unitSystem: google.maps.UnitSystem.METRIC,
		// 	})
		// 	.then((response) => {
		// 		// directionsRenderer.setDirections(response)
		// 		// setRoutes(response.routes)
		// 		// findClosestPoint(origin, response.routes[0].legs[0].steps)
		// 		setPath(response.routes[0].legs[0].steps)
		// 		console.log(response)
		// 	})

		return () => directionsRenderer.setMap(null)
	}, [directionsService, directionsRenderer])

	// 	// Update direction route
	useEffect(() => {
		if (!directionsRenderer) return
		directionsRenderer.setRouteIndex(routeIndex)
	}, [routeIndex, directionsRenderer])

	if (!leg) return null

	// 	// return steps
	return (
		<div className="directions">
			{/* <h2>{selected.summary}</h2>
			<p>
				{leg.start_address.split(",")[0]} to{" "}
				{leg.end_address.split(",")[0]}
			</p>
			<p>Distance: {leg.distance?.text}</p>
			<p>Duration: {leg.duration?.text}</p>

			<h2>Other Routes</h2>
			<ul>
				{routes.map((route, index) => (
					<li key={route.summary}>
						<button onClick={() => setRouteIndex(index)}>
							{route.summary}
						</button>
					</li>
				))}
			</ul> */}
		</div>
	)
}

export default MapPage
