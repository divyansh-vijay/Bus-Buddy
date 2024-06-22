"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Input from "../components/Input"
import Button from "@/components/Button"
import { getData } from "@/components/firebase"

const BusInfo = ({ id }) => {
	const [busId, setBusId] = useState("")
	const router = useRouter()

	const handleSearch = async () => {
		// const bus = {
		// 	1: { id: "d290f1ee-6c54-4b01-90e6-d701748f0851" },
		// 	2: { id: "1c53df84-7510-45a3-8d0b-8e2a82b1a85a" },
		// 	3: { id: "f5e7f8ab-9071-4933-8b2e-759c4777d2f8" },
		// 	4: { id: "a3c9f58a-4c50-4f25-8e09-52f7c0323be3" },
		// 	5: { id: "e9f1d8f3-8b4c-4d2f-9f8f-9b8f3b9d5a5d" },
		// }

		const busUid = await getData("busId", busId)
		console.log({ busUid })

		if (!busId || !busUid) {
			console.log(busId + " not found")
			router.push("/")
			return
		}
		router.push(busUid["id"])
	}

	return (
		<div className="h-max w-[80%] md:w-[30%] md:h-full flex items-center md:justify-start justify-center gap-y-[20px] py-4 flex-col md:flex-col md:py-[20px] md:px-[20px]">
			<h1 className="text-[25px] md:text-[20px] font-bold tracking-tight">
				Search by bus number
			</h1>
			<Input
				color="black"
				height={"40px"}
				value={busId}
				setBusId={setBusId}
				onChange={(value) => {
					setBusId(value)
				}}
			/>
			<Button height={"40px"} onClick={handleSearch}>
				Search bus
			</Button>
		</div>
	)
}

export default BusInfo
