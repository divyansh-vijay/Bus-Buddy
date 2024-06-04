import Input from "@/components/Input"
import Button from "@/components/Button"

const BusInfo = () => {
	return (
		<div className="h-max w-full md:w-[30%] md:h-full flex items-center md:justify-start justify-center gap-y-[20px] py-4 flex-col md:flex-col md:py-[20px] md:px-[20px]">
			<h1 className="text-[25px] md:text-[20px] font-bold tracking-tight">
				Search by bus number
			</h1>
			<Input />
			<Button>Search bus</Button>
		</div>
	)
}

export default BusInfo
