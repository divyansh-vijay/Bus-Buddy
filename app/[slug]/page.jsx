"use client"

import Navbar from "../../ui/Navbar.jsx"
import BusInfo from "./../../ui/BusInfo.jsx"
import MapPage from "../../ui/Map.jsx"
import BusDetails from "../../ui/BusDetails.jsx"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { writeUserData, test } from "../../components/firebase.js"

export default function Home() {
	const router = useRouter()
	const pathname = usePathname()
	const [currentBusDetails, setCurrentBusDetails] = useState({})
	const [currentBusLatlng, setCurrentBusLatlng] = useState({})
	const bus = {
		1: { id: "d290f1ee-6c54-4b01-90e6-d701748f0851" },
		2: { id: "1c53df84-7510-45a3-8d0b-8e2a82b1a85a" },
		3: { id: "f5e7f8ab-9071-4933-8b2e-759c4777d2f8" },
		4: { id: "a3c9f58a-4c50-4f25-8e09-52f7c0323be3" },
		5: { id: "e9f1d8f3-8b4c-4d2f-9f8f-9b8f3b9d5a5d" },
	}
	const busDetails = {
		"d290f1ee-6c54-4b01-90e6-d701748f0851": {
			busNumber: "3",
			driverContact: "+917523900668",
			origin: "PSIT Kanpur",
			destination: "PSIT Kanpur",
			busStartDate: `2024-6-17`,
			busStartTime: `7 : 00`,
			// busStartTime: `${new Date().getHours()} : ${new Date().getMinutes()}`,
			waypoints: [
				{
					location: "PSIT Kanpur",
					time: "",
				},
				{
					location: "KRISHNA NAGAR ( HONDA SHOW ROOM) Kanpur",
					time: "7:50",
				},
				{
					location:
						"SHYAM NAGAR (DR.VERENDRA SWAROOP SCHOOL & Harihar Dham) Kanpur",
					time: "7:55",
				},
				{
					location: "HARIHAR DHAM Kanpur",
					time: "8:00",
				},
				{
					location: "37 VAHINI PAC VAHINI TURN Kanpur",
					time: "8:05",
				},
				{
					location: "SHYAM NAGAR BAYPASS Kanpur",
					time: "8:05",
				},
				{
					location: "PSIT Kanpur",
					time: "8:10",
				},
			],
			speed: 40, //km/h
			currentLocationLatLng: {
				lat: 26.407128454868154,
				lng: 80.35577596271996,
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
	useEffect(() => {
		const busId = pathname.split("/")[1]
		if (!busDetails.hasOwnProperty(busId)) {
			router.push("/")
			return
		}
		setCurrentBusDetails(busDetails[busId])
		setCurrentBusLatlng(busDetails[busId].currentLocationLatLng)
	}, [pathname])

	useEffect(() => {
		if (!currentBusDetails.waypoints) return
	}, [currentBusLatlng])

	useEffect(() => {
		// writeUserData("busId", bus)
	}, [currentBusDetails])

	return (
		<main className="h-[100dvh] w-[100dvw] max-w-[1680px] flex flex-col overflow-hidden ">
			<Navbar></Navbar>
			<div className="h-full md:h-[92%] w-full flex flex-col md:flex-row overflow-auto md:items-start items-center">
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
								setCurrentBusDetails={setCurrentBusDetails}
								setCurrentBusLatlng={
									setCurrentBusLatlng
								}></MapPage>
							<BusDetails data={currentBusDetails} />
						</>
					) : null}
				</div>
			</div>
		</main>
	)
}
