"use client"

// import Navbar from "./../../ui/Navbar.jsx"
// import BusInfo from "./../../ui/BusInfo.jsx"
// import MapPage from "./../../ui/map.jsx"
// import BusDetailPannel from "./../../ui/busDetails"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Home() {
	const router = useRouter()
	const pathname = usePathname()
	const [currentBusDetails, setCurrentBusDetails] = useState({})
	const [currentBusLatlng, setCurrentBusLatlng] = useState({})
	useEffect(() => {
		const busDetails = {
			"d290f1ee-6c54-4b01-90e6-d701748f0851": {
				busNumber: "382",
				driverContact: "+91 1234567890",
				origin: "PSIT Kanpur",
				destination: "PSIT Kanpur",
				waypoints: [
					{
						location: "PSIT Kanpur",
						time: 0,
					},
					{
						location: "KRISHNA NAGAR ( HONDA SHOW ROOM) Kanpur",
						time: 0,
					},
					{
						location:
							"SHYAM NAGAR (DR.VERENDRA SWAROOP SCHOOL & Harihar Dham) Kanpur",
						time: 300,
					},
					{
						location: "HARIHAR DHAM Kanpur",
						time: 300,
					},
					{
						location: "37 VAHINI PAC VAHINI TURN Kanpur",
						time: 300,
					},
					{
						location: "SHYAM NAGAR BAYPASS Kanpur",
						time: 300,
					},
					{
						location: "PSIT Kanpur",
						time: 2400,
					},
				],
				speed: 40, //km/h
				currentLocationLatLng: {
					lat: 26.452711,
					lng: 80.332804,
				},
				lastStop: ["", 0],
				nextStop: ["", 0],
				delay: "",
				// eta: "12:23 hrs",
			},
			"1c53df84-7510-45a3-8d0b-8e2a82b1a85a": {
				busNumber: "Bus-743",
				driverContact: "+1-6473921058",
				origin: "City A",
				destination: "City B",
				waypoints: ["Waypoint 1", "Waypoint 2", "Waypoint 3"],
				speed: "65 km/h",
				currentLocation: "Location 19",
				currentLocationLatLng: {
					lat: 34.052235,
					lng: -118.243683,
				},
				nextStop: "Stop 11",
				delay: "5 mins",
				eta: "13:47 hrs",
			},
			"f5e7f8ab-9071-4933-8b2e-759c4777d2f8": {
				busNumber: "Bus-159",
				driverContact: "+1-7328190483",
				origin: "City A",
				destination: "City B",
				waypoints: ["Waypoint 1", "Waypoint 2", "Waypoint 3"],
				speed: "52 km/h",
				currentLocation: "Location 22",
				currentLocationLatLng: {
					lat: 41.878113,
					lng: -87.629799,
				},
				nextStop: "Stop 7",
				delay: "18 mins",
				eta: "15:09 hrs",
			},
			"a3c9f58a-4c50-4f25-8e09-52f7c0323be3": {
				busNumber: "Bus-467",
				driverContact: "+1-8237542901",
				origin: "City A",
				destination: "City B",
				waypoints: ["Waypoint 1", "Waypoint 2", "Waypoint 3"],
				speed: "48 km/h",
				currentLocation: "Location 34",
				currentLocationLatLng: {
					lat: 29.760427,
					lng: -95.369804,
				},
				nextStop: "Stop 14",
				delay: "25 mins",
				eta: "14:35 hrs",
			},
			"e9f1d8f3-8b4c-4d2f-9f8f-9b8f3b9d5a5d": {
				busNumber: "Bus-921",
				driverContact: "+1-9374820156",
				origin: "City A",
				destination: "City B",
				waypoints: ["Waypoint 1", "Waypoint 2", "Waypoint 3"],
				speed: "58 km/h",
				currentLocation: "Location 7",
				currentLocationLatLng: {
					lat: 39.739236,
					lng: -104.990251,
				},
				nextStop: "Stop 3",
				delay: "8 mins",
				eta: "16:11 hrs",
			},
		}

		const busId = pathname.split("/")[1]
		if (!busDetails.hasOwnProperty(busId)) {
			router.push("/")
			return
		}
		setCurrentBusDetails(busDetails[busId])
		setCurrentBusLatlng(busDetails[busId].currentLocationLatLng)
	}, [pathname])

	useEffect(() => {
		// console.log({ currentBusLatlng })
		// const interval = setInterval(() => {
		// 	if (currentBusLatlng.hasOwnProperty("lat")) {
		// 		// console.log(currentBusLatlng)
		// 		setCurrentBusLatlng({
		// 			lat: currentBusLatlng.lat - 0.0001,
		// 			lng: currentBusLatlng.lng + 0.0003,
		// 		})
		// 	}
		// }, 3000)

		// if (!currentBusDetails.waypoints) return
		if (!currentBusDetails.waypoints) return
		// if (
		// 	currentBusDetails.lastStop + 1 <
		// 	currentBusDetails.waypoints.length - 1
		// ) {
		// 	var nextStop =
		// 		currentBusDetails.waypoints[currentBusDetails.lastStop + 1]
		// 			.location
		// 	setCurrentBusDetails((prev) => ({
		// 		...prev,
		// 		nextStop: nextStop,
		// 	}))
		// }

		// var currentTime =
		// 	28800 ||
		// 	new Date().getHours() * 60 * 60 + new Date().getMinutes() * 60
		// var delay =
		// 	currentTime -
		// 	currentBusDetails.waypoints[currentBusDetails.lastStop + 1].time
		// console.log()
		// setCurrentBusDetails((prev) => ({
		// 	...prev,
		// 	delay: secToHrs(delay),
		// }))
		// return () => clearInterval(interval)
	}, [currentBusLatlng])

	return (
		<main className="h-screen w-screen max-w-[1680px] flex flex-col overflow-hidden ">
			testing
			{/* <Navbar></Navbar>
			<div className="h-full md:h-[92%] w-full flex flex-col md:flex-row overflow-auto items-center">
				<BusInfo busId={pathname.split("/")[1]}></BusInfo>
				<div className="max-h-full w-full flex flex-col items-center justify-start gap-y-[10px] md:overflow-auto py-2">
					{currentBusDetails.hasOwnProperty("busNumber") ? (
						<>
							<MapPage
								currentBusLatlng={
									currentBusLatlng.hasOwnProperty("lat")
										? currentBusLatlng
										: { lat: 0, lng: 0 }
								}
								data={currentBusDetails}
								setCurrentBusDetails={
									setCurrentBusDetails
								}></MapPage>
							<BusDetailPannel data={currentBusDetails} />
						</>
					) : null}
				</div>
			</div> */}
		</main>
	)
}
