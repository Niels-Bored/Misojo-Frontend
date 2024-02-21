export interface Credentials{
  access:string,
  refresh:string
}
export interface IAuthenticationResponse {
  status:string,
  message:string,
  data:Credentials
}
