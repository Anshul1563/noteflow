"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import Button from "../../../../components/Button";
import Textarea from "../../../../components/Textarea";
import SideMenu from "../../../../components/Sidebar";
import FooterRibbon from "../../../../components/FooterRibbon.jsx";
import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";
import MenuButton from "../../../../components/MenuButton";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import { MdArrowBack } from "react-icons/md";
import NotesNavbar from "../../../../components/NotesNavbar";


const Notes = ({ currentNote }) => {
	const { data: session } = useSession();
	const router = useRouter();
	const pathname = usePathname();

	let user;
	try {
		user = session.user;
	} catch {
		user = {
			name: "Guest User",
			email: "",
			image: "/",
		};
	}

	if (!currentNote) {
		currentNote = {
			id: 0,
			title: "It's not a bug it's a feature 🐞",
			createdDate: new Date(),
			lastModifiedDate: new Date(),
			content: "TODO",
		};
	}

	const [notes, setNotes] = useState(currentNote);
	const [diff, setDiff] = useState(0)
	const [markdownPreview, setMarkdownPreview] = useState(false);
	const textareaRef = useRef(null);

	const [isRecording, setIsRecording] = useState(false);
	const [status, setStatus] = useState("saved");

	async function handleSave() {
		const res = await fetch("/api/SaveNote", {
			method: "POST",
			body: JSON.stringify({
				id: notes.id,
				content: notes.content,
				title : notes.title
			}),
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data = await res.json();

		console.log(data)

		setDiff(0);

	}

	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			textareaRef.current.focus();
		}
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

		router.push(`/${user.email.split("@")[0]}`);
	}

	const handleTextareaChange = (e) => {
		console.log(e.target.value)
		setDiff((dif)=> dif + 1)
		const inputString = e.target.value;

		setNotes({ ...notes, content: inputString });
		setStatus("pending");
	};

	const currentNotePath = [
		{
			id: notes.id,
			title: notes.title,
			href: pathname,
		},
	];
	
	if (diff == 10) {
		handleSave();
	}

	return (
		<>
			<main className="flex flex-col flex-1 w-full overflow-x-hidden font-poppins hide-scrollbar">
				<NotesNavbar user={user} paths={currentNotePath} />
				<div
					style={{ maxHeight: "100vh" }}
					className="flex-1 overflow-y-auto hide-scrollbar"
				>
					{/* <div className="font-handlee flex text-text-100 gap-y-10 flex-col mx-4 my-14 sm:mx-20 md:mx-28 "> */}
					<div className="font-handlee flex text-text-100 gap-y-10 flex-col mx-4 mt-2 mb-8">
						<div className="flex gap-4 justify-between items-center">
							<Link
								className="text-xs text-center text-text-100 font-semibold hover:bg-dark-100 rounded px-4 py-2 transition font-poppins"
								href={
									session
										? `/${user.email.split("@")[0]}`
										: "/"
								}
							>
								<span className="hidden sm:block">Back</span>
								<span className="block sm:hidden">
									<MdArrowBack size={18} />
								</span>
								<span className="sr-only">Go Back</span>
							</Link>

							<div className="flex gap-x-2">
								<Button
									size="sm"
									className="border-gray-800 border bg-transparent hover:bg-gray-800 transition-colors text-primary "
									onClick={() => deleteNotes(notes.id)}
								>
									<BsTrash className="" size={16} />
								</Button>
							
								<Button
									size="sm"
									className={`${
										isRecording &&
										"ring-1 ring-offset-1 rounded-lg ring-white"
									}`}
									onClick={() =>
										setMarkdownPreview((prev) => !prev)
									}
								>
									{markdownPreview ? (
										<AiOutlineEyeInvisible size={20} />
									) : (
										<AiOutlineEye size={20} />
									)}
								</Button>
								<Button onClick={handleSave}>Save</Button>
							</div>
						</div>
						<div className="flex flex-col gap-y-2 sm:gap-y-4">
							<input
								type="text"
								label="title"
								placeholder="Note Title"
								defaultValue={notes.title}
								onChange={(e) =>
									setNotes({
										...notes,
										title: e.target.value,
									})
								}
								onKeyDown={(e) => handleKeyDown(e)}
								className={`${
									markdownPreview && "font-poppins text-white"
								} leading-10 text-clamp-notes-greeting font-bold block rounded py-2 placeholder:text-gray-600 text-text-100 sm:leading-6 bg-transparent focus:ring-0 border-0`}
								maxLength={40}
								minLength={3}
								required
							/>

							{markdownPreview ? (
								<div className="prose prose-sm prose-custom selection:bg-secondary-500 pb-8 ml-2 mb-8 mt-2 mr-4 max-w-none hide-scrollbar font-poppins">
									<ReactMarkdown
									// renderers={{ code: SyntaxHighlight }}
									>
										{notes.content}
									</ReactMarkdown>
								</div>
							) : (
								<Textarea
									userNotes={notes.content}
									reference={textareaRef}
									// onInput={handleTextareaChange}
									onChange={handleTextareaChange}
								/>
							)}

							<FooterRibbon
								{...notes}
								markdownPreview={markdownPreview}
								status={status}
								isRecording={isRecording}
								userNotes={notes.content}
							/>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default Notes;

