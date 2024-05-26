import Navbar from "@/ui/navbar";
import BusInfo from "@/ui/businfo";
import { initializeApp, ref, on } from "firebase/app"
import { getDatabase, ref, set } from "firebase/database"

export default function Home() {
	// const getDat
	const firebaseConfig = {
		apiKey: "AIzaSyDbfHQRv0sxBJRdzM2fl6fZ8e-jg74P8mQ",
		authDomain: "bus-tracking-psit.firebaseapp.com",
		databaseURL:
			"https://bus-tracking-psit-default-rtdb.asia-southeast1.firebasedatabase.app",
		projectId: "bus-tracking-psit",
		storageBucket: "bus-tracking-psit.appspot.com",
		messagingSenderId: "465678396480",
		appId: "1:465678396480:web:f3b0d9777358838bd483a5",
	}

	// Initialize Firebase
	const app = initializeApp(firebaseConfig)
	const ref = app.ref("/")
	console.log(ref)
	ref.on("value").then(function (snapshot) {
		console.log({ snapshot })
	})

	return (
		<main className="h-[100%] w-[100%]">
			<Navbar></Navbar>
			<BusInfo></BusInfo>
		</main>
	)
}
