// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import prisma from './db';
// import { NextAuthOptions } from 'next-auth';
// import EmailProvider from 'next-auth/providers/email';
// import GoogleProvider from 'next-auth/providers/google';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import { fetchUser } from './actions/user';
// import bcrypt from 'bcryptjs';

// const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
//   providers: [
//     GoogleProvider({
//       name: 'google',
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     EmailProvider({
//       server: {
//         host: process.env.EMAIL_SERVER_HOST,
//         port: process.env.EMAIL_SERVER_PORT,
//         auth: {
//           user: process.env.EMAIL_SERVER_USER,
//           pass: process.env.EMAIL_SERVER_PASSWORD,
//         },
//         from: process.env.EMAIL_FROM,
//       },
//     }),
//     CredentialsProvider({
//       name: 'credentials',
//       credentials: {},
//       async authorize(credentials: { email: string; password: string }) {
//         const { email, password } = credentials;
//         try {
//           const user = await fetchUser(email);
//           if (!user) return null;
//           const isPasswordValid = bcrypt.compareSync(
//             password,
//             user.password as string
//           );
//           if (!isPasswordValid) return null;

//           return user;
//         } catch (error) {}
//       },
//     }),
//   ],
//   session: {
//     strategy: 'jwt',
//   },
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: '/login',
//   },
// };

// export default authOptions;
