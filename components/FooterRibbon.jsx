import React from "react";

import { AiOutlineEye } from "react-icons/ai";

function FooterRibbon({
	id,
	title,
	createdDate,
	lastModifiedDate,
	status,
	isRecording,
	userNotes,
	markdownPreview,
}) {
	return (
		<div className="fixed border-t border-dark-100 gap-4 flex justify-between items-center left-0 bottom-0 bg-dark-100 w-full px-3 sm:px-2 py-2 sm:py-1">
			<div className="flex gap-4 text-[8px] gap-x-2 font-poppins">
				<span className="mx-1">
					<strong>
						{userNotes === "" ? 0 : userNotes.split(" ").length}
					</strong>{" "}
					words
				</span>
				<span className="mx-1 hidden sm:inline-block">
					Created on:{" "}
					<strong>
						{new Date(createdDate).toLocaleDateString("en-GB")}
					</strong>
				</span>
				<span className="mx-1">
					Last Modified on:{" "}
					<strong>
						{new Date(lastModifiedDate).toLocaleDateString("en-GB")}
					</strong>
				</span>
			</div>
			<div className="flex gap-4 text-[8px] sm:text-[8px] gap-x-2 font-poppins">
				{status === "saved" ? (
					<span></span>
				) : status === "pending" ? (
					<span className="text-white">Pending</span>
				) : (
					<span className="text-white">Updaing...</span>
				)}
				{isRecording && (
					<p className="text-secondary-600 flex gap-x-1">
						Recording{" "}
						<span className="flex gap-x-[0.5px]">
							<span className="animate-bounce inline-block font-bold">
								.
							</span>
							<span className="animate-bounce inline-block font-bold custom-delay-300">
								.
							</span>
							<span className="animate-bounce inline-block font-bold custom-delay-600">
								.
							</span>
						</span>
					</p>
				)}
				{markdownPreview && (
					<AiOutlineEye
						className="text-white"
						size={12}
					/>
				)}
			</div>
		</div>
	);
}

export default FooterRibbon;
