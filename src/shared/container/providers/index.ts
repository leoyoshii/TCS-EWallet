import { container } from 'tsyringe';
import { BcryptHashProvider } from './HashProvider/implementations/BCrptyHashProvider';
import { IHashProvider } from './HashProvider/interface/IHashProvider';

container.registerSingleton<IHashProvider>('HashProvider', BcryptHashProvider);
