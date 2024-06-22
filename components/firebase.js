// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase, ref, set, child, get } from "firebase/database"

// Your web app's Firebase configuration
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
export function test() {
	console.log("test done")
}
export function writeUserData(path, objectData) {
	const db = getDatabase()
	console.log({ path, objectData })
	set(ref(db, `${path}/`), objectData)
}
export async function getData(path, search) {
	const dbRef = ref(getDatabase())
	try {
		const snapshot = await get(child(dbRef, `${path}/${search}`))
		if (snapshot.exists()) {
			console.log(snapshot.val())
			return snapshot.val()
		} else {
			console.log("No data available")
			return false
		}
	} catch (error) {
		console.error(error)
		return false
	}
}
