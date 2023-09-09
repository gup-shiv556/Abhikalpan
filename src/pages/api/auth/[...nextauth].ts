// import NextAuth from 'next-auth';
import login from '../../login'
// export default NextAuth({
//   providers: [],
//   authorize: async (credentials, req) => {
//     // This will call the authorize() method in pages/api/auth/credentials.js.
//     return await NextAuth.callAuthorize('credentials', credentials, req);
//   },
// });

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize(credentials, req) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        // perform you login logic
        // find out user from db
        if (email !== "dev@abhikalpan.co.in" || password !== "Abhikalpan$2023") {
          throw new Error("invalid credentials");
        }

        // if everything is fine
        return {
          id: "1234",
          name: "John Doe",
          email: "dev@abhikalpan.co.in",
          role: "admin",
        };
      },
    }),
  ],
  pages: {
    signIn: "../../login",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
  // callbacks: {
  //   jwt(params) {
  //     // update token
  //     if (params.user?.role) {
  //       params.token.role = params.user.role;
  //     }
  //     // return final_token
  //     return params.token;
  //   },
  // },
};

export default NextAuth(authOptions);