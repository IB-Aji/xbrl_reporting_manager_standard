import { Role } from '../model/role';
import { Ljk } from './ljk';

export class User {

  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  authdata?: string;
  token?: string;
  avatar: any;
  ljk: Ljk;
  userType: string;
  instType: string;

  roles: Role[];

  constructor(id: number, username: string, firstName: string, lastName: string, email: string, password: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
  }

}
