import Navbar from "@/ui/navbar";
import BusInfo from "@/ui/businfo";
import MapPage from "@/ui/map";
import DelayIcon from "../public/delayIcon.svg"
import TimeIcon from "../public/locationIcon.svg"
import LocationIcon from "../public/timeIcon.svg"
import BusCards from "@/components/busCard"
import BusDetailPannel from "@/ui/busDetails";

export default function Home() {

	return (
		<main className="h-full max-w-full md:h-[100%] md:w-[100%] flex flex-col overflow-hidden">
			<Navbar></Navbar>
			<div className="h-full overflow-auto">
				<div className="h-max md:h-full w-full flex flex-col md:flex-row">
					<BusInfo></BusInfo>
					<div className="h-max w-full md:h-full flex flex-col items-center justify-start md:justify-around gap-y-[10px]">
						<MapPage></MapPage>
						<BusDetailPannel/>
					</div>
				</div>
			</div>
		</main>
	)
}
