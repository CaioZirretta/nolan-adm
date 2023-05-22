export class LoginRequest {
  username: string = "";
  password: string = "";
}

export type LoginResponse = {
  token: string,
}
