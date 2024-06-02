import Navbar from "@/ui/navbar";
import BusInfo from "@/ui/businfo";
import MapPage from "@/ui/map";
import BusDetailPannel from "@/ui/busDetails";

export default function Home() {

	return (
		<main className="h-[100%] w-[100%]">
			<Navbar></Navbar>
			<div className="h-[92%] w-full flex flex-row">
				<BusInfo></BusInfo>
				<div className="h-full w-[78%] flex flex-col items-center justify-around">
					<MapPage></MapPage>
					<BusDetailPannel></BusDetailPannel>
				</div>
			</div>
		</main>
	)
}
