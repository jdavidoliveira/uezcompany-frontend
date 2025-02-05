import NextAuth, { User } from "next-auth"
import { DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt"
import { DefaultJWT } from "next-auth/jwt"
import { USERTYPE } from "./entities/enums"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      name: string
      username: string
      usertype: USERTYPE
      image: string
      status: string
    }
    accessToken: string
    redirectTo: string
  }

  interface User {
    id: string
    email: string
    name: string
    username: string
    usertype: USERTYPE
    image: string
    token: string
    status: string
  }
}
