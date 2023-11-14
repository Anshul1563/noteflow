import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { notesData } from "../../../data";
import prisma from "../../../prisma/prisma";

// const prisma = new PrismaClient();

export const AuthOptions = {
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			console.log("Inside callback now", user)
			const exist = await prisma.user.findUnique({
				where: {
					id: user.id,
				},
			});

			console.log("Exists?",exist)

			if (!exist) {
				const newUser = await prisma.user.create({
					data: {
						id : user.id,
						email: user.email,
						profilePicture: user.image,
						name: user.name,
						notes: {
							create: notesData,
						},
					},
				})
				console.log(newUser)
			}

			return true;
		}
	},
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID_DEV!,
			clientSecret: process.env.GITHUB_SECRET_DEV!,
		}),
	],
	secret: process.env.JWT_SECRET,
};

export default NextAuth(AuthOptions);
