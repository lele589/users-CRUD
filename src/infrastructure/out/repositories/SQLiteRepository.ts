import { resolve } from "dns";
import { data } from "../../../../../../node_modules/@remix-run/router/dist/utils";
import { UserRepository, CreateUserTypes, FindUserTypes, SearchUsersTypes as SearchUsersTypes } from "../../../domain/User/userRepository";
import { User } from "../types/User";
import { DatabaseSync } from 'node:sqlite';
import { UserEntity } from "../../../domain/User/UserEntity";
const database = new DatabaseSync('./database.sqlite');

// aquí podría ir el knex
class SQLiteRepository implements UserRepository {

    // TODO: por qué necesito aqui explicitar CreateUserResult?
    createUser(userData: User): CreateUserTypes {
            try {
                const insert = database.prepare('INSERT INTO users (id, name, email) VALUES (?, ?, ?)');
                insert.run(userData.id, userData.name, userData.email);
                return { success: true, data: userData };
            } catch (error) {
                return { success: false, error: 'Error creating user' };
            }
    }

    findUser(userId: number): FindUserTypes {
        try {
            // Al usar 'AS' no se quejaría del undefined, pero necesitamos igualmente controlarlo para evitar errores
            // evitar usar 'AS', mejor un genérico si se puede definir
            const user = database.prepare('SELECT * FROM users WHERE id = ?').get(userId) as User | undefined; 
            if (!user) {
                return { success: false, error: 'User not found' };
            }
            const userName = user.name.split(' ');
            const userInstance = new UserEntity({
                id: user.id,
                firstName: userName[0],
                lastName: userName[1],
                email: user.email
            });
            return { success: true, data: userInstance.toPrimitive() };
        } catch (error) {
            return { success: false, error: 'Error getting user' };
        }
    }
}

export default SQLiteRepository;