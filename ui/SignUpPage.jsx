import Input from "@/components/Input";
import Button from "@/components/Button";
import Link from "next/link"

const SignUpPage = () => {
    return ( 
        <div className="h-[77%] w-[32%] bg-[#0f172a] rounded-[20px] hover:border-[1px] hover:border-white flex items-center justify-around flex-col">
            <h1 className="text-[30px] font-bold leading-tight tracking-tight text-white">Sign Up</h1>
            <form action="#" className="h-[77%] w-full flex items-center justify-start flex-col gap-y-[30px]">
                <div className="flex flex-col items-start justify-center h-[20%] w-full gap-[10px] pl-[25px]">
                    <label htmlFor="email" className="text-white text-[18px] font-semibold">Email</label>
                    <Input height="50px" width="92%" placeholder="Enter your email" bgcol="transparent" color="white"></Input>
                </div>
                <div className="flex flex-col items-start justify-center h-[20%] w-full gap-[10px] pl-[25px]">
                    <label htmlFor="email" className="text-white text-[18px] font-semibold">Password</label>
                    <Input height="50px" width="92%" placeholder="Enter your password" bgcol="transparent" color="white"></Input>
                </div>
                {/* <div className="h-[10%] w-full flex items-center justify-end pr-[45px]">
                    <Link href="/" className="text-blue-600 font-bold hover:underline">Forgot Password?</Link>
                </div> */}
                <Button height="11%" width="88%" type="signIn">Sign Up</Button>
                <p class="text-sm font-light text-gray-400">
                      Have an account already? <Link href="/admin" class="font-medium text-[#2563EB] hover:underline text-primary-500">Login</Link>
                  </p>
            </form>
        </div>
     );
}
 
export default SignUpPage;