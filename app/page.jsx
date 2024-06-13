import Navbar from "../ui/Navbar"
import BusInfo from "../ui/BusInfo"

export default function Home() {
	return (
		<main className="h-screen w-screen max-w-[1680px] flex flex-col overflow-hidden ">
			<Navbar></Navbar>
			<div className="h-full md:h-max w-full flex flex-col md:flex-row overflow-auto items-center">
				<BusInfo></BusInfo>
				<div className="max-h-full w-full flex flex-col items-center justify-start gap-y-[10px] md:overflow-auto py-2">
					no data
				</div>
			</div>
		</main>
	)
}
