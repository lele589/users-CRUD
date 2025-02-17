import UserController from './in/userController';
import FindUserCommand from '../application/commands/findUserCommand';
import CreateUserCommand from '../application/commands/createUserCommand';
// import SQLiteRepository from './out/repositories/SQLiteRepository';
import { UserModel } from '../domain/User/UserModel';
import * as awilix from 'awilix';
import InMemoryUserRepository from './out/repositories/inMemoryUserRepository';

const container = awilix.createContainer({
    // CLASSIC VS PROXY
    // CLASSIC: se basa en el orden de los argumentos (más rápido pero menos flexible)(no se recomienda minificando)
    // PROXY: se basa en el nombre de los argumentos (como si fuese un object)(usar en frontend porque se minifica)
    injectionMode: awilix.InjectionMode.CLASSIC,
    strict: true,
})

container.register({
    userController: awilix.asClass(UserController),
    createUserCommand: awilix.asClass(CreateUserCommand),
    findUserCommand: awilix.asClass(FindUserCommand),
    userModel: awilix.asClass(UserModel),
    // userRepository: awilix.asClass(SQLiteRepository).singleton(), // no necesita obligatoriamente singleton porquela DB es la que se encarga de mantener la persistencia, pero se podría poner por eficiencia, pero cuidado que la clase no tenga estado propio que gestiones
    userRepository: awilix.asClass(InMemoryUserRepository).singleton(), // si no se pone singleton, se crea una instancia por cada vez que se inyecta y en memoria no se comparten instancias
})

// automaticamente detecta lo que debe recibir inyectado
export const userController = container.resolve('userController');