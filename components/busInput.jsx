const BusInputBar = () => {
    return ( 

        <div className="h-[23%] md:h-[8%] w-[55%] md:w-full flex align-center justify-center flex-row md:flex-col">
            <input className="h-[100%] w-full rounded-[10px] px-[15px] border-[2px] border-gray-300 text-[15px]" type="text" placeholder="Enter bus number" />  
        </div>
     );
}
 
export default BusInputBar;