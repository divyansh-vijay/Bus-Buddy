const Button = ({ children, type = "base", style, onClick }) => {
	const types = {
		outline: "outline",
		base: "bg-black hover:bg-gray-600 font-bold text-white tracking-wider",
	}
	return (
		<button
			onClick={onClick}
			style={style}
			className={
				"h-[50px] w-[55%] md:h-[8%] md:w-full rounded-[10px] flex items-center justify-center" +
				" " +
				types[type]
			}>
			{children}
		</button>
	)
}

export default Button
