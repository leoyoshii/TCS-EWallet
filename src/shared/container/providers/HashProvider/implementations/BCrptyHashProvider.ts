import { hash, compare } from 'bcryptjs';
import { IHashProvider } from '../interface/IHashProvider';

export class BcryptHashProvider implements IHashProvider {
  compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }

  public generateHash(payload: string): Promise<string> {
    return hash(payload, 8);
  }
}
