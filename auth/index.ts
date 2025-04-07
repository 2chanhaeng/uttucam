import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma";
import providers from "./providers";
import { unauthorized } from "next/navigation";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers,
});

export const ensureAuth = async () => (await auth()) ?? unauthorized();
export const getUser = async () => (await auth())?.user;
export const ensureUser = async () => (await getUser()) ?? unauthorized();
