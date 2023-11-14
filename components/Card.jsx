import Image from "next/image";
import React from "react";

import MenuButton from "./MenuButton";
import { BsArrowRight, BsThreeDotsVertical } from "react-icons/bs";
import { BsTrash } from "react-icons/bs";
import { useRouter } from "next/navigation";

const Card = ({ title, createdDate, id, lastModifiedDate, ...props }) => {
	
	const router = useRouter();
 

	const handleClick = (e) => {
		e.preventDefault();
		deleteNotes(id);
	};

	async function deleteNotes(id) {
		const res = await fetch("/api/DeleteNote", {
			method: "POST",
			body: JSON.stringify({
				id: id,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		router.refresh()
	}


	const createdOn = new Date(createdDate).toLocaleDateString("en-GB")
	const modifiedOn = new Date(lastModifiedDate).toLocaleDateString("en-GB")
	
	return (
		<div
			{...props}
			className="group relative bg-dark-100 text-white gap-2 cursor-pointer hover:bg-dark/40 hover:shadow-md flex flex-col justify-between h-28 rounded p-5 hover:border-stone-500 transition duration-150 ease-in-out"
		>
			<div className="flex justify-between items-center">
				<p className="line-clamp-2 text-white text-sm font-poppins font-medium capitalize">
					{title}
				</p>
				<button onClick={handleClick}>
					{/* <MenuButton
						links={links}
						onClick={(e) => e.stopPropagation()}
					> */}
					<BsTrash className="h-5 w-5" />
					{/* </MenuButton> */}
				</button>
			</div>
			<p className="text-xs text-text-100 flex items-center gap-x-1">
				<span>{createdOn}</span>
				<BsArrowRight className="w-5 inline-block" />
				<span>{modifiedOn}</span>
			</p>
		</div>
	);
};
export default Card;
