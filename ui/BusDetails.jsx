import BusStopInterval from "../components/StopDisplay"
import BusCards from "../components/BusCard"
import DelayIcon from "../public/delayIcon.svg"
import TimeIcon from "../public/locationIcon.svg"
import LocationIcon from "../public/timeIcon.svg"
const secToHrs = (seconds) => {
	// console.log({ seconds })
	var min = Math.floor(seconds / 60)
	var hrs = Math.floor(seconds / 60 / 60)
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
const BusDetails = ({ data }) => {
	// console.log(!data)
	return (
		<div className="min-h-max w-[98%] flex items-start justify-start flex-col p-2 gap-2">
			<div className="w-full h-max">
				<h1 className="text-[30px] font-bold">Bus {data.busNumber}</h1>
				<p className="text-[15px] tracking-tight font-normalpy-[30px]">
					Currently at {data.currentLocation}
				</p>
				<div className=" h-[15px] w-full flex items-center justify-between py-[25px]">
					<p className="text-[15px] tracking-tight font-semibold">
						Estimated arrival time
					</p>
					<p className="text-[15px] tracking-tight font-semibold">
						{secToHrs(data.eta)}
					</p>
				</div>
				<div className="w-full bg-gray-300 rounded-full h-1.5 mb-4">
					<div
						className="bg-black h-1.5 rounded-full"
						style={{ width: `${data.etaPercentage}%` }}></div>
				</div>
				<p className="text-[13px] text-gray-400">Delayed</p>
				{data ? <BusStopInterval data={data} /> : null}
			</div>
			<div className="h-max w-full flex justify-center md:justify-evenly flex-col md:flex-row flex-wrap gap-y-2 p-2">
				<BusCards
					svgIcon={<DelayIcon />}
					busPropertyName="Delay"
					busPropertyInfo={
						secToHrs(data.delay) + "(according to google maps)"
					}></BusCards>
				{/* <BusCards
						svgIcon={<TimeIcon />}
						busPropertyName="Estimated Time Arrival"
						busPropertyInfo={data.eta}></BusCards> */}
				{/* <BusCards
					svgIcon={<LocationIcon />}
					busPropertyName="Current Location"
					busPropertyInfo={data.currentLocation}></BusCards> */}
				<BusCards
					svgIcon={<LocationIcon />}
					busPropertyName="Next Stop"
					busPropertyInfo={data.nextStop}></BusCards>
				<BusCards
					svgIcon={<LocationIcon />}
					busPropertyName="Driver Contact"
					busPropertyInfo={data.driverContact}></BusCards>
				<BusCards
					svgIcon={<LocationIcon />}
					busPropertyName="Bus Number"
					busPropertyInfo={"Bus" + " " + data.busNumber}></BusCards>
			</div>
		</div>
	)
}

export default BusDetails
