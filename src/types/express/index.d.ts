// to make the file a module and avoid the TypeScript error
export {}
interface UserData extends jwt.JwtPayload {
  account: string
  userName: string
  iat: number
  exp: number
}
declare global {
  namespace Express {
    export interface Request {
      id?: string
      userData: UserData
    }
  }
}
