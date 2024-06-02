import BusInputBar from "@/components/busInput";
import TrackBus from "@/components/trackBus";

const BusInfo = () => {
    return ( 
            <div className="h-[300px] md:w-full md:max-w-[300px] w-full md:h-full flex bg-white items-center md:justify-start justify-center gap-y-[20px] py-[0px] px-[0px] flex-col md:flex-col md:w-[22%] md:py-[20px] md:px-[20px]">
                <div className="h-max w-full flex items-center justify-center">
                    <h1 className="text-[25px] md:text-[20px] font-bold tracking-tight">Search by bus number</h1>
                </div>
                <BusInputBar/>
                <TrackBus/>
            </div>
     );
}

export default BusInfo;