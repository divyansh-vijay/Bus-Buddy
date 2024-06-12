const Input = ({ style, value, onChange }) => {
	return (
		<input
			style={style}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			className="h-[50px] w-[80%] md:w-full rounded-[10px] px-[15px] border-[2px] border-gray-300 text-[15px]"
			type="text"
			placeholder="Enter bus number"
		/>
		// <div className="h-[23%] md:h-[8%] w-[55%] md:w-full flex align-center justify-center flex-row md:flex-col">
		// </div>
	)
}

export default Input
