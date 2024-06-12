import Navbar from "@/ui/navbar"
import BusInfo from "@/ui/businfo"
import MapPage from "@/ui/map"
import BusDetailPannel from "@/ui/busDetails"

export default function Home() {
	return (
		<main className="h-screen w-screen max-w-[1680px] flex flex-col overflow-hidden ">
			<Navbar></Navbar>
			<div className="h-full md:h-[92%] w-full flex flex-col md:flex-row overflow-auto">
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
