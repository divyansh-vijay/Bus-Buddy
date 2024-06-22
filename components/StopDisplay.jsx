const StopDisplay = ({ data }) => {
	return (
		<>
			<div className="h-max w-full flex flex-row ">
				<div className="h-max w-max flex items-center justify-around flex-col gap-2">
					<div className="h-[50px] w-full flex items-center justify-start gap-2">
						<div className="h-[10px] max-h-full w-[10px] bg-black rounded-[50%] relative before:content-[''] before:h-[50px] before:w-[1px] before:bg-black before:absolute before:translate-x-[-50%] before:left-[50%] before:top-0"></div>

						<div>
							<p className="text-[14px] font-bold">
								{data.lastStop[0] || ""}
							</p>
							<p className="text-[12px] text-gray-400">
								{/* {data.lastStop[1]}
								 */}
								Last stop
							</p>
						</div>
					</div>
					<div className="h-[50px] w-full flex items-center justify-start gap-2">
						<div className="h-[10px] max-h-full w-[10px] bg-black rounded-[50%] relative before:content-[''] before:h-[50px] before:w-[1px] before:bg-black before:absolute before:translate-x-[-50%] before:left-[50%] before:bottom-0"></div>
						<div>
							<p className="text-[14px] font-bold">
								{data.nextStop[0] || ""}
							</p>
							<p className="text-[12px] text-gray-400">
								{data.nextStop[1]}
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default StopDisplay
