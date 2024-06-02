const BusStopInterval = () => {
    return (  
        <>
            <div className="h-[25%] w-[50%] flex items-center justify-start">
                <div className=" h-full w-[4%] flex items-center justify-center flex-col">
                    <div className="h-[10px] w-[10px] bg-black rounded-[50%]"></div>
                    <div className="h-[70%] w-[5%] bg-black"></div>
                    <div className="h-[10px] w-[10px] bg-black rounded-[50%]"></div>
                </div>
                <div className="h-full w-[45%] flex items-center justify-around flex-col">
                    <div className="h-[45%] w-full">
                        <p className="text-[14px] font-bold">PSIT college gate</p>
                        <p className="text-[12px] text-gray-400">4:58 pm</p>
                    </div>
                    <div className="h-[45%] w-full">
                        <p className="text-[14px] font-bold">Ghantaghar</p>
                        <p className="text-[12px] text-gray-400">7:00 pm</p>
                    </div>
                </div>
            </div>
        </>
    );
}
 
export default BusStopInterval;