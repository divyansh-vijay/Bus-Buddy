import BusInputBar from "@/components/busInput";
import TrackBus from "@/components/trackBus";

const BusInfo = () => {
    return ( 
        <>
            <div className="h-full w-[22%] flex bg-white align-center justify-start gap-y-[20px] py-[30px] px-[30px] flex-col">
                <h1 className="text-[20px] font-bold tracking-tight left-[25px]">Search by bus number</h1>
                <BusInputBar/>
                <TrackBus/>
            </div>
        </>

     );
}

export default BusInfo;