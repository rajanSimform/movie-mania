import jwtDecode from 'jwt-decode';

export interface DecodedToken {
  id: string;
  email: string;
  iat: number;
  exp: number;
}

export class User {
  constructor(
    public _id: string,
    public email: string,
    public name: string,
    private _token: string,
    public expiresIn?: number
  ) {
    // set the expiresIn property as Time in mili seconds
    const decodedToken: DecodedToken = jwtDecode(_token);
    this.expiresIn = decodedToken.exp * 1000;
  }

  get token() {
    // if token is expired then return null
    if (new Date().getTime() > this.expiresIn) {
      return null;
    }
    return this._token;
  }
}
