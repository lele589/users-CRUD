import { UserRepository, CreateUserTypes, FindUserTypes } from "../../../domain/User/userRepository";
import { User } from "../types/User";
import { DatabaseSync } from 'node:sqlite';
import { UserEntity } from "../../../domain/User/UserEntity";
import { ERRORS } from "../../../errors";
import { UserApplicationDTO } from "../../../application/types/UserApplicationDTO";
import { EntityInterface } from "../../../domain/entityInterface";
const database = new DatabaseSync('./database.sqlite');

class DatabaseUnexpectedError extends Error {
    constructor(message: string, scope: string) {
        // El scope podriamos hacer que fuese una constante y que el constructor valide que se pasa una de las definidas
        super(message); // Llama al constructor de la clase que extiendes (Error)
        this.name = ERRORS.INFRASTRUCTURE.DATABASE_UNEXPECTED_ERROR;

        console.log(ERRORS.INFRASTRUCTURE.DATABASE_UNEXPECTED_ERROR, { scope, message }); // reemplazar por un logger, se podría usar para mandar mensajes automaticos...
    }
}

export class DatabaseResponseEmptyError extends Error {
    constructor(message: string, scope: string) {
        // El scope podriamos hacer que fuese una constante y que el constructor valide que se pasa una de las definidas
        super(message); // Llama al constructor de la clase que extiendes (Error)
        this.name = ERRORS.INFRASTRUCTURE.DATABASE_RESPONSE_EMPTY_ERROR;

        console.log('DatabaseResponseEmptyError', { scope, message }); // reemplazar por un logger, se podría usar para mandar mensajes automaticos...
    }
}

// aquí podría ir el knex
class SQLiteRepository implements UserRepository {

    // TODO: por qué necesito aqui explicitar CreateUserResult?
    createUser(userData: User): CreateUserTypes {
        try {
            const insert = database.prepare('INSERT INTO users (id, name, email) VALUES (?, ?, ?)');
            insert.run(userData.id, userData.name, userData.email);
            return { success: true, data: userData };
        } catch (error) {
            return { success: false, error: 'createUser - Error creating user' };
        }
    }

    findUser(userId: number): FindUserTypes {
        return new Promise<EntityInterface<UserApplicationDTO>>((resolve, reject) => {
            // Al usar 'AS' no se quejaría del undefined, pero necesitamos igualmente controlarlo para evitar errores
            // evitar usar 'AS', mejor un genérico si se puede definir
            let user;
            try {
                user = database.prepare('SELECT * FROM users WHERE id = ?').get(userId) as User | undefined;
                if (!user) {
                    reject(new DatabaseResponseEmptyError('Response empty', 'findUser'));
                } else {
                    const userName = user.name.split(' ');
                    const userInstance = new UserEntity({
                        id: user.id,
                        firstName: userName[0],
                        lastName: userName[1],
                        email: user.email
                    });
                    resolve(userInstance);
                }
            } catch (error: unknown) { // TODO: revisar type
                reject(new DatabaseUnexpectedError(error as string, 'findUser'));
            }
        });
    }
}

export default SQLiteRepository;