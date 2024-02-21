export interface User {
  id: number,
  email: string,
  first_name: string,
  last_name: string
}

export interface IUserResponse {
  status:string,
  message:string,
  data:User[]
}
