const Button = ({ children }) => {
	return (
		<button className="h-[50px] w-[55%] md:h-[8%] md:w-full rounded-[10px] flex items-center justify-center bg-black hover:bg-gray-600 font-bold text-white tracking-wider">
			{children}
		</button>
	)
}

export default Button
