import BusStopInterval from "@/components/StopDisplay"
import BusCards from "@/components/BusCard"
import DelayIcon from "../public/delayIcon.svg"
import TimeIcon from "../public/locationIcon.svg"
import LocationIcon from "../public/timeIcon.svg"

const BusDetailPannel = () => {
	return (
		<div className="min-h-max w-[98%] flex items-start justify-start flex-col p-2 gap-2">
			<div className="w-full h-max">
				<h1 className="text-[30px] font-bold">Bus 44</h1>
				<p className="text-[15px] tracking-tight font-normalpy-[30px]">
					Currently at PSIT Bhauti Khera
				</p>
				<div className=" h-[15px] w-full flex items-center justify-between py-[25px]">
					<p className="text-[15px] tracking-tight font-semibold">
						Estimated arrival time
					</p>
					<p className="text-[15px] tracking-tight font-semibold">
						5:09 pm
					</p>
				</div>
				<div className="w-full bg-gray-300 rounded-full h-1.5 mb-4">
					<div
						className="bg-black h-1.5 rounded-full"
						style={{ width: "45%" }}></div>
				</div>
				<p className="text-[13px] text-gray-400">Delayed</p>
				<BusStopInterval />
			</div>
			<div className="h-max w-full flex justify-center md:justify-evenly flex-col md:flex-row flex-wrap gap-y-2 p-2">
				<BusCards
					svgIcon={<DelayIcon />}
					busPropertyName="Delay"
					busPropertyInfo="1 min"></BusCards>
				<BusCards
					svgIcon={<TimeIcon />}
					busPropertyName="Estimated Time Arrival"
					busPropertyInfo="5:05 pm"></BusCards>
				<BusCards
					svgIcon={<LocationIcon />}
					busPropertyName="Current Location"
					busPropertyInfo="PSIT Kanpur"></BusCards>
				<BusCards
					svgIcon={<LocationIcon />}
					busPropertyName="Next Stop"
					busPropertyInfo="Ghantaghar"></BusCards>
			</div>
		</div>
	)
}

export default BusDetailPannel
