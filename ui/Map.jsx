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
// import { Polygon } from "../components/Polygon"
import { Polyline } from "../components/Polyline"
import dummyData from "../public/fullDistance.json"
import { ClientPageRoot } from "next/dist/client/components/client-page"
const secToHrs = (seconds) => {
	seconds = Math.abs(seconds)
	var hrs = Math.floor(seconds / 60 / 60)
	var min = Math.floor(seconds / 60 - hrs * 60)
	if (hrs < 10) {
		hrs = `0${hrs}`
	}
	if (min < 10) {
		min = `0${min}`
	}
	if (hrs == 0) {
		var formattedTime = `${min} mins `
	} else {
		var formattedTime = `${hrs} hours ${min} mins `
	}

	return formattedTime
}
const secToFormattedHrs = (seconds) => {
	seconds = Math.abs(seconds)
	var hrs = Math.floor(seconds / 60 / 60)
	var min = Math.floor(seconds / 60 - hrs * 60)
	var ampm = hrs < 12 ? "am" : "pm"
	if (hrs < 10) {
		hrs = `0${hrs}`
	}
	if (min < 10) {
		min = `0${min}`
	}
	if (hrs == 0) {
		var formattedTime = `${min}`
	} else {
		var formattedTime = `${hrs}:${min} ${ampm} `
	}

	return formattedTime
}
function formattedTimeToSec(time) {
	// time = hr:min
	var [hr, min] = time.split(":")

	var inSec = parseInt(hr) * 60 * 60 + parseInt(min) * 60
	// console.log({ hr, min, inSec })
	return inSec
}

function differenceBetweenTwoDatesInSec(date1, date2) {
	// Parse the date strings to Date objects
	const d1 = new Date(date1)
	const d2 = new Date(date2)

	// Get the time in milliseconds for each date
	const time1 = d1.getTime()
	const time2 = d2.getTime()
	// console.log({ date1, date2, time1, time2 })
	// Calculate the difference in milliseconds
	const diffInMs = Math.abs(time2 - time1)

	// Convert milliseconds to seconds
	const diffInSec = diffInMs / 1000

	return diffInSec
}

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
	if (stepI + 1 > legs[legI].steps.length - 1) {
		stepI = 0
		legI++
	} else {
		stepI++
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

const MapPage = ({
	currentBusLatlng,
	data,
	setCurrentBusDetails,
	setCurrentBusLatlng,
}) => {
	// const geometryLibrary = useMapsLibrary("geometry")
	const GOOGLE_MAPS_API_KEY = "AIzaSyDbfHQRv0sxBJRdzM2fl6fZ8e-jg74P8mQ"
	const [path, setPath] = useState([])
	const [marker, setMarker] = useState([])

	const [currentEditedLatLng, setCurrentEditedLatLng] =
		useState(currentBusLatlng)

	useEffect(() => {
		const interval = setInterval(() => {
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

			// var currentDate = `${new Date().getFullYear()}-${
			// 	new Date().getMonth() + 1
			// }-${new Date().getDate()}`

			var { duration, distance } = findDistance(
				legI,
				stepI,
				dummyData.routes
			) // Finds the distance left from current point
			console.log({ distance })
			// console.log({
			// 	legI,
			// 	stepI,
			// 	duration,
			// 	distance,
			// 	route: dummyData.routes,
			// })

			var currentDurationAccordingToSpeed =
				distance / ((data.speed * 1000) / 60 / 60)
			// currentDurationAccordingToSpeed = 60 * 60
			console.log({ currentDurationAccordingToSpeed })
			var currentTimeAccordingToSpeed =
				// 8 * 60 * 60 +
				// 0 +
				new Date().getHours() * 60 * 60 +
				new Date().getMinutes() * 60 +
				currentDurationAccordingToSpeed

			// var dayChangeInSeconds = differenceBetweenTwoDatesInSec(
			// 	data.busStartDate,
			// 	currentDate
			// )

			var designatedTimeToReachDestination = formattedTimeToSec(
				data.waypoints[data.waypoints.length - 1].time
			)
			// console.log({
			// 	x: data.waypoints[data.waypoints.length - 1].time,
			// 	designatedTimeToReachDestination,
			// 	currentTimeAccordingToSpeed,
			// })

			var delayInSec = Math.abs(
				designatedTimeToReachDestination - currentTimeAccordingToSpeed
			)

			// var delay =
			// 	Math.floor(
			// 		designatedTimeToReachDestination -
			// 			currentTimeAccordingToSpeed +
			// 			dayChangeInSeconds
			// 	) > 0
			// 		? secToHrs(
			// 				Math.floor(
			// 					designatedTimeToReachDestination -
			// 						currentTimeAccordingToSpeed +
			// 						dayChangeInSeconds
			// 				)
			// 		  ) + "Early"
			// 		: Math.floor(
			// 				Math.abs(
			// 					designatedTimeToReachDestination -
			// 						currentTimeAccordingToSpeed +
			// 						dayChangeInSeconds
			// 				)
			// 		  ) == 0
			// 		? "On Time"
			// 		: secToHrs(
			// 				Math.floor(
			// 					designatedTimeToReachDestination -
			// 						currentTimeAccordingToSpeed +
			// 						dayChangeInSeconds
			// 				)
			// 		  ) + "Late"
			var delay =
				Math.floor(
					designatedTimeToReachDestination -
						currentTimeAccordingToSpeed
				) > 0
					? secToHrs(
							Math.floor(
								designatedTimeToReachDestination -
									currentTimeAccordingToSpeed
							)
					  ) + "Early"
					: Math.floor(
							Math.abs(
								designatedTimeToReachDestination -
									currentTimeAccordingToSpeed
							)
					  ) == 0
					? "On Time"
					: secToHrs(
							Math.floor(
								designatedTimeToReachDestination -
									currentTimeAccordingToSpeed
							)
					  ) + "Late"

			// var totalDuration = 0

			// dummyData.routes[0].legs.forEach((leg) => {
			// 	totalDuration += leg.duration.value
			// })

			// var etaPercentage = (duration / totalDuration) * 100

			var eta = secToFormattedHrs(currentTimeAccordingToSpeed)
			console.log(secToFormattedHrs(currentTimeAccordingToSpeed))
			// // console.log(data.waypoints[legI + 1])
			setCurrentBusDetails((prev) => ({
				...prev,
				lastStop: [
					data.waypoints[legI].location,
					secToFormattedHrs(
						formattedTimeToSec(data.waypoints[legI].time) +
							delayInSec
					),
				],
				nextStop: [
					data.waypoints[legI + 1].location,
					secToFormattedHrs(
						formattedTimeToSec(data.waypoints[legI + 1].time) +
							delayInSec
					),
				],
				delay,
				eta,
				// etaPercentage,
			}))

			console.log("hi")
		}, 1000)
		return () => {
			clearInterval(interval)
		}
	}, [path, currentBusLatlng, data])

	useEffect(() => {
		console.log({ currentEditedLatLng })
	}, [currentEditedLatLng])

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
					onClick={(e) => {
						console.log(e.detail.latLng)
						setCurrentBusLatlng(e.detail.latLng)
					}}
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
												strokeWeight={1}
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
