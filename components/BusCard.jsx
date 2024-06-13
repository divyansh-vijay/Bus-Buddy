const BusAddOnData = ({ svgIcon, busPropertyName, busPropertyInfo }) => {
	return (
		<div className="h-max md:w-[50%] w-full rounded-[20px] flex items-center justify-start md:gap-x-[15px] gap-[10px]">
			<div className="h-[50px] w-[50px] bg-gray-200 rounded-[15px] flex items-center justify-center">
				{svgIcon}
			</div>
			<div className="h-[15%] md:h-max w-[50%] rounded-[15px] flex items-start justify-center flex-col">
				<p className="text-[15px] md:text-[15px] font-bold">
					{busPropertyName}
				</p>
				<p className="text-[13px] md:text-[12px] text-gray-400">
					{busPropertyInfo}
				</p>
			</div>
		</div>
	)
}

export default BusAddOnData
