/* The code snippet is a React component called "Hero". It is a functional component that renders a
hero section for a website. */
"use client";

import React from "react";
import Button from "./Button";
import Image from "next/image";
import iconic from "public/images/kybernetwork.svg";
import features from "../data";
import Comment from "../components/Comment";
import { useSession, signIn, signOut } from "next-auth/react";
import { BsGithub } from "react-icons/bs";

const Hero = () => {
	const { data: session } = useSession();
	let avatar;
	if (session) {
		avatar = session.user.image;
	}

	return (
		<main className="container pt-24 text-white flex flex-col justify-center">
			<div className="flex items-center justify-between sm:mb-20 mb-14 -mt-4">
				<div className="flex gap-x-4 items-center">
					<a href="https://github.com/Anshul1563/noteflow">
						<BsGithub className="h-6 w-6 inline-block" />
						<span className="sr-only">Github Repo Link</span>
						<span className="px-2 text-xs text-text-100 hidden sm:inline-block font-semibold">
							Visit, fork, star on GitHub
						</span>
					</a>
				</div>
				<div>
					{session ? (
						<div className="flex gap-x-4 items-center">
							<button
								onClick={() => signOut("github")}
								className="inline-block text-xs text-center text-dark-100 bg-white font-semibold hover:bg-stone-100 rounded px-4 py-2 transition"
							>
								Sign Out
							</button>
							<Image
								src={avatar}
								alt="profile picture"
								width={100}
								height={100}
								className="h-9 w-9 sm:w-10 sm:h-10 rounded-full border hover:bg-stone-100 transition-colors"
							/>
						</div>
					) : (
						<>
							<button
								onClick={() => signIn("github")}
								className="inline-block text-xs text-center text-white bg-gradient-to-br from-primary to-secondary-600 font-semibold hover:bg-stone-100 rounded px-4 py-2 transition"
							>
								Sign In
							</button>
						</>
					)}
				</div>
			</div>

			<div className="-space-y-2">
				<h1 className="text-center text-wrap-balance text-clamp-hero font-poppins font-semibold">
					A Simple way to
				</h1>
				<h1 className="text-center text-wrap-balance text-clamp-hero font-poppins font-semibold">
					create{" "}
					<span className="mx-auto text-transparent bg-gradient-to-r from-primary to-secondary-600 bg-clip-text">
						Notes
					</span>
				</h1>
			</div>
			<p className="w-3/4 sm:h-4/5 ms:2/3 mx-auto text-base text-center tracking-wide text-text-100 font-medium my-2">
				<span className="block leading-4 whitespace-nowrap">
					Capture, Create, Connect
				</span>
				<span className="whitespace-nowrap text-sm sm:text-base">
					Your Personal Note-Making Journey
				</span>
			</p>
			<div className="flex gap-4 mt-6 mb-8 sm:mt-6 sm:mb-12 md:mt-9 md:mb-16 justify-center">
				{session ? (
					<>
						<Button
							type="glory"
							className="px-5 py-2 w-auto text-base sm:text-base sm:px-7 sm:py-2.5 sm:w-auto"
							href={`/${session.user.email.split("@")[0]}`}
						>
							Start with Notes
						</Button>
					</>
				) : (
					<Button
						type="glory"
						onClick={() => signIn("github")}
						className="px-5 py-2 w-auto text-base sm:text-base sm:px-7 sm:py-2.5 sm:w-auto"
					>
						Join Us
					</Button>
				)}
			</div>

			<div className="flex justify-center h-[10vh] sm:h-[15vh] md:h-[20vh] max-h-[250px] pt-10 sm:pt-14">
				<h1 className="font-poppins flex items-center text-clamp-heading font-black">
					NoteVault
				</h1>
			</div>
		</main>
	);
};

export default Hero;
