import { db } from "database";
import { UserRepository } from "./userRepository";
import { TokenRepository } from "./tokenRepository";
import { AccountRepository } from "./accountRepository";

export const userDBRepo = new UserRepository(db);
export const tokenDBRepo = new TokenRepository(db);
export const accountDBRepo = new AccountRepository(db);

