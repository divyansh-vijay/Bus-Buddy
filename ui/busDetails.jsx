import BusStopInterval from "@/components/stopDisplay";
import BusCards from "@/components/busCard"
import DelayIcon from "../public/delayIcon.svg"
import TimeIcon from "../public/locationIcon.svg"
import LocationIcon from "../public/timeIcon.svg"

const BusDetailPannel = () => {

    return ( 
        <>
            <div className="h-[65%] w-[98%] flex items-start justify-around flex-col overflow-x-auto">
                <h1 className="text-[30px] font-bold">Bus 44</h1>
                <p className="text-[15px] tracking-tight font-normalpy-[30px]">Currently at PSIT Bhauti Khera</p>
                <div className=" h-[15px] w-full flex items-center justify-between py-[25px]">
                    <p className="text-[15px] tracking-tight font-semibold">Estimated arrival time</p>
                    <p className="text-[15px] tracking-tight font-semibold">5:09 pm</p>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-1.5 mb-4">
                    <div className="bg-black h-1.5 rounded-full" style={{width: "45%"}}></div>
                </div>
                <p className="text-[13px] text-gray-400">Delayed</p>
                <BusStopInterval/>
                <div className="h-[40%] w-full flex items-start justify-center flex-col flex-wrap gap-y-[10px]">
                    <BusCards svgIcon={<DelayIcon />} busPropertyName="Delay" busPropertyInfo="1 min"></BusCards>
                    <BusCards svgIcon={<TimeIcon />} busPropertyName="Estimated Time Arrival" busPropertyInfo="5:05 pm"></BusCards>
                    <BusCards svgIcon={<LocationIcon />} busPropertyName="Current Location" busPropertyInfo="PSIT Kanpur"></BusCards>
                    <BusCards svgIcon={<LocationIcon />} busPropertyName="Next Stop" busPropertyInfo="Ghantaghar"></BusCards>
                </div>
            </div>
        </>
     );
}
 
export default BusDetailPannel;