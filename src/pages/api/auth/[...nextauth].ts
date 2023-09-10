import login from '../../login'

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
        if (email !== "dev@abhikalpan.co.in" ) {
          throw new Error("invalid email");
        }

        else if (password !== "Abhikalpan$2023") {
          throw new Error("invalid password");
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