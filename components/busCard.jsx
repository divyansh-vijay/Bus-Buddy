const BusAddOnData = ({svgIcon, busPropertyName, busPropertyInfo}) => {
    return ( 
        <>
           <div className="h-[45%] w-[40%] rounded-[20px] flex items-center justify-start gap-x-[15px]">
                <div className="h-[80%] w-[15%] bg-gray-200 rounded-[15px] flex items-center justify-center">
                    {svgIcon}
                </div>
                <div className="h-[80%] w-[50%] rounded-[15px] flex items-start justify-center flex-col">
                    <p className="text-[18px] font-bold">{busPropertyName}</p>
                    <p className="text-[14px] text-gray-400">{busPropertyInfo}</p>
                </div>
            </div> 
        </>
     );
}
 
export default BusAddOnData;