export interface IAuthenticationResponse {
  status:string,
  message:string,
  data:{
    access:string,
    refresh:string
  }
}
