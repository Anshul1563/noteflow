"use client";

import React, { useState, useEffect } from "react";
import Card from "../../../components/Card";
import Warning from "../../../components/Warning";
import Link from "next/link";
import { notesData } from "../../../data";
import { BsRocketTakeoff } from "react-icons/bs";
import { useSession, signIn } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import {
	CardSkeleton,
	SkeletonHeading,
	SkeletonTitle,
} from "../../../components/Skeleton";
import NotesNavbar from "../../../components/NotesNavbar";

const ClientWrapper = ({ notes }) => {
	const { data: session, status } = useSession();

	const pathname = usePathname();
	const router = useRouter();
	const [user, setUser] = useState({
		name: "Guest User",
		email: "",
		image: "/",
	});

	useEffect(() => {
		if (status == "authenticated") {
			setUser(session.user);
		}
	}, [status]);

	const [greetings, setGreetings] = useState("");
	const [input, setInput] = useState("");
	const [showAddCard, setShowAddCard] = useState(false);
	const [tag, setTag] = useState("");

	const arrSorting = (arr, type, attribute = "") => {
		if (type === "asc") {
			const ascending = arr.sort(
				(a, b) => new Date(a.createdDate) - new Date(b.createdDate)
			);
			return ascending;
		} else {
			const descending = arr.sort((a, b) => {
				return (
					new Date(b.lastModifiedDate) - new Date(a.lastModifiedDate)
				);
			});
			return descending;
		}
	};

	const [info, setInfo] = useState(arrSorting(notes, "asc"));

	const randomGreeting = [
		`Salutations! ${user.name}`,
		`Hey there, ${user.name}!`,
		`Hi, ${user.name}!`,
		`Greetings, ${user.name}!`,
		`Hello, ${user.name}!`,
		`Welcome, ${user.name}!`,
		`Hey, ${user.name}, Let's Begin!`,
		`Hiya, ${user.name}!`,
		`Howdy, ${user.name}!`,
		`Aloha, ${user.name}!`,
		`Yo, ${user.name}!`,
		`Hi there, ${user.name}!`,
		`Hola, ${user.name}!`,
		`Hey, ${user.name}, Let's Start!`,
		`Hey, ${user.name}, Ready to Roll?`,
	];

	useEffect(() => {
		if (randomGreeting.length > 0) {
			const randomIndex = Math.floor(
				Math.random() * randomGreeting.length
			);
			setGreetings(randomGreeting[randomIndex]);
		} else {
			setGreetings("Hi! Guest User");
		}
	}, [user]); // eslint-disable-line no-console

	async function addNewCard() {
		
        
        const newNoteData = {
			noteInfo: {
				title: input,
				content: "",
				tag: tag,
				createdDate: new Date(),
				lastModifiedDate: new Date(),
            },
            email : user.email
		};

        // send data to api post
        const res = await fetch('/api/notes', {
            method: 'POST',
            body: JSON.stringify(newNoteData),
            headers: {
                'Content-Type': 'application/json'
            }
		})
		
		const data = await res.json()

		console.log("Data back",data)

		setInput("");
		// localStorage.setItem(
		// 	"allNotes",
		// 	JSON.stringify([...info, newNoteData])
		// );
		setTag("");
		setShowAddCard(false);

		router.push(`/${user.email.split("@")[0]}/${data.id}`);

	}

	const handleInputChange = (event) => {
		setInput(event.target.value);
	};

	const handleCardClick = (item) => {
		const { title, id } = item;
	};

	if (status === "unauthenticated") {
		return (
			<Warning
				title="User Unauthenticated"
				caption="Sign In again to access your notes"
				onClick={() => signIn("github")}
			>
				Sign In
			</Warning>
		);
	}

	if (
		status === "authenticated" &&
		pathname !== `/${session.user.email.split("@")[0]}`
	) {
		console.log(status, pathname);
		console.log(pathname !== `/${session.user.email.split("@")[0]}`);
		router.push(`/${session.user.email.split("@")[0]}`);
	}

	return (
		<>
			<main className="flex flex-col flex-1 w-full overflow-x-hidden font-poppins">
				<NotesNavbar user={user} main={true} />
				<div
					style={{ maxHeight: "100vh" }}
					className="flex-1 overflow-y-auto"
				>
					<div className="mx-6 flex justify-start items-center my-14">
						{status === "loading" ||
						(status == "authenticated" &&
							greetings.includes("Guest User")) ? (
							<SkeletonHeading />
						) : (
							<div className="">
								<h1 className="text-white underline text-clamp-notes-greeting font-bold font-poppins ">
									{greetings}
								</h1>
								<p className="text-text-100">
									Let&apos;s continue with the notes
								</p>
							</div>
						)}
					</div>

					{status === "loading" ||
					(status === "authenticated" &&
						greetings.includes("Guest User")) ? (
						<>
							<SkeletonTitle />
							<div className="mx-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
								<CardSkeleton />
								<CardSkeleton />
								<CardSkeleton />
								<CardSkeleton />
							</div>
						</>
					) : (
						<div className="mx-6">
							<h2 className="text-text-100 my-2">Recent Notes</h2>
							<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
								{arrSorting(info, "desc")
									.slice(0, 4)
									.map((item) => (
										<Link
											href={`/${
												user.email.split("@")[0]
											}/${item.id}`}
											key={item.id}
										>
											<Card
												{...item}
												onClick={() =>
													handleCardClick(item)
												}
											/>
										</Link>
									))}
							</div>
						</div>
					)}

					<div className="my-6">
						{status === "loading" ? (
							<SkeletonTitle />
						) : (
							<h2 className="text-text-100 mx-6 my-2">
								All Notes
							</h2>
						)}
						<div className="mx-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3">
							{status === "loading" ||
							(status == "authenticated" &&
								greetings.includes("Guest User")) ? (
								<>
									<CardSkeleton />
									<CardSkeleton />
									<CardSkeleton />
									<CardSkeleton />
									<CardSkeleton />
									<CardSkeleton />
									<CardSkeleton />
									<CardSkeleton />
								</>
							) : (
								<>
									{arrSorting(info, "asc").map((item) => (
										<Link
											href={`/${
												user.email.split("@")[0]
											}/${item.id}`}
											key={item.id}
										>
											<Card
												{...item}
												onClick={() =>
													handleCardClick(item)
												}
											/>
										</Link>
									))}

									<div className="h-28 p-5 transition-all hover:border-stone-500 rounded text-white bg-dark-100 flex flex-col items-center justify-center">
										{showAddCard ? (
											<div className="flex h-full items-center justify-center w-full">
												<div className="flex justify-between h-full flex-col items-center">
													<input
														className="text-sm w-full flex-grow flex-[1] font-medium placeholder:text-text-200 placeholder:text-xs p-0 text-text-100 bg-transparent focus:ring-0 putline-none border-0 focus:outline-none focus:border-0"
														placeholder="Note title"
														type="text"
														value={input}
														autoFocus
														onChange={
															handleInputChange
														}
													/>
													<input
														className="text-sm w-full flex-grow flex-[1] font-medium placeholder:text-text-200 placeholder:text-xs p-0 text-text-100 bg-transparent focus:ring-0 putline-none border-0 focus:outline-none focus:border-0"
														placeholder="Note Tag"
														type="text"
														value={tag}
														onChange={(e) =>
															setTag(
																e.target.value
															)
														}
													/>
												</div>
												<button
													onClick={
														input.length > 0
															? addNewCard
															: undefined
													}
												>
													<BsRocketTakeoff
														className={`${
															input.length > 0 &&
															"animate-waving-hand text-white "
														} w-8 h-8 flex-wrap hover:bg-text-200 focus:bg-text-200 rounded p-1.5`}
													/>
												</button>
											</div>
										) : (
											<button
												className="h-full w-full flex justify-center items-center text-xs text-text-100"
												onClick={() =>
													setShowAddCard(true)
												}
											>
												<span>+ New</span>
											</button>
										)}
									</div>
								</>
							)}
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default ClientWrapper;
