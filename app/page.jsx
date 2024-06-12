import Navbar from "@/ui/Navbar"
import BusInfo from "@/ui/BusInfo"
import MapPage from "@/ui/Map"
import BusDetailPannel from "@/ui/BusDetailPannel"

export default function Home() {
	return (
		<main className="h-screen w-screen max-w-[1680px] flex flex-col overflow-hidden ">
			<Navbar></Navbar>
			<div className="h-full md:h-[92%] w-full flex flex-col items-center md:flex-row overflow-auto">
				<BusInfo></BusInfo>
				<div className="max-h-full w-full flex flex-col items-center justify-start gap-y-[10px] md:overflow-auto py-2">
					No Data
					{/* <MapPage></MapPage>
					<BusDetailPannel /> */}
				</div>
			</div>
		</main>
	)
}
