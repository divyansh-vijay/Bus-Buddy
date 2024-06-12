// "use client";

// import AdminBusDetailCard from "@/components/AdminBusDetailCard";
// import SideNavbar from "@/ui/SideNavbar";
// import Button from "@/components/Button";
// import Modal from "@/components/Modal";
// import { useState } from "react";

// const Buses = () => {
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [busDetails, setBusDetails] = useState([]);
//   const [isAdminBusDetailCardVisible, setIsAdminBusDetailCardVisible] =
//     useState(true);

//   const toggleModal = () => {
//     setIsModalVisible(!isModalVisible);
//   };

//   const closeModal = () => {
//     setIsModalVisible(false);
//   };

//   const handleAddBusDetail = (uuid) => {
//     setBusDetails([...busDetails, { uuid }]);
//   };

//   const handleDeleteBusDetail = (uuid) => {
//     setBusDetails(busDetails.filter(busDetail => busDetail.index !== uuid));
//   };

//   return (
//     <div className="h-screen w-screen flex flex-row overflow-hidden bg-white">
//       <SideNavbar buttonState={"buses"}></SideNavbar>
//       <div className=" h-full w-[80%] flex flex-col overflow-y-auto py-[30px]">
//         {isAdminBusDetailCardVisible && (
//           <div className="flex flex-col gap-y-[20px] items-center">
//             {busDetails.map((busDetail, index) => (
//               <AdminBusDetailCard
//                 key={index}
//                 uuid={busDetail.uuid}
//                 busIndex={index + 1}
//                 className="h-[100px]"
//                 onDelete={() => handleDeleteBusDetail(busDetail.uuid)}
//               />
//             ))}
//           </div>
//         )}
//         <div className="h-[60px] w-[60px] absolute m-2 bottom-0 right-0 ">
//           <Button
//             type="add"
//             height="100%"
//             width="100%"
//             rounded="50%"
//             onClick={toggleModal}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               height="40px"
//               viewBox="0 -960 960 960"
//               width="40px"
//               fill="#000000"
//             >
//               <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
//             </svg>
//           </Button>
//         </div>
//       </div>
//       {isModalVisible && (
//         <div className="absolute h-[300px] w-[500px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
//           <Modal onSubmit={handleAddBusDetail} closeModal={closeModal} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Buses;

"use client"

import AdminBusDetailCard from "@/components/AdminBusDetailCard"
import SideNavbar from "../../../ui/SideNavbar"
import Button from "../../../components/Button"
import Modal from "../../../components/Modal"
import { useState } from "react"

const Buses = () => {
	const [isModalVisible, setIsModalVisible] = useState(false)
	const [busDetails, setBusDetails] = useState([])

	const toggleModal = () => {
		setIsModalVisible(!isModalVisible)
	}

	const closeModal = () => {
		setIsModalVisible(false)
	}

	const handleAddBusDetail = (uuid) => {
		setBusDetails([...busDetails, { uuid }])
	}

	const handleDeleteBusDetail = (uuid) => {
		setBusDetails(busDetails.filter((busDetail) => busDetail.uuid !== uuid))
	}

	return (
		<div className="h-screen w-screen flex flex-row overflow-hidden bg-white">
			<SideNavbar buttonState={"buses"}></SideNavbar>
			<div className=" h-full w-[80%] flex flex-col overflow-y-auto py-[30px]">
				<div className="flex flex-col gap-y-[20px] items-center">
					{busDetails.map((busDetail, index) => (
						<AdminBusDetailCard
							key={index}
							uuid={busDetail.uuid}
							busIndex={index + 1}
							onDelete={() =>
								handleDeleteBusDetail(busDetail.uuid)
							}
							className="h-[100px]"
						/>
					))}
				</div>
				<div className="h-[60px] w-[60px] absolute m-2 bottom-0 right-0 ">
					<Button
						type="add"
						height="100%"
						width="100%"
						rounded="50%"
						onClick={toggleModal}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="40px"
							viewBox="0 -960 960 960"
							width="40px"
							fill="#000000">
							<path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
						</svg>
					</Button>
				</div>
			</div>
			{isModalVisible && (
				<div className="absolute h-[300px] w-[500px] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
					<Modal
						onSubmit={handleAddBusDetail}
						closeModal={closeModal}
					/>
				</div>
			)}
		</div>
	)
}

export default Buses
