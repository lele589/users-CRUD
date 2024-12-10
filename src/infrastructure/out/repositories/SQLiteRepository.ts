import { UserRepository } from "../../../domain/userRepository.ts";
import { User } from "../../../types/User.ts";
import { DatabaseSync } from 'node:sqlite';
const database = new DatabaseSync('./database.sqlite');

// aquí podría ir el knex
class SQLiteRepository implements UserRepository {

    createUser(userData: User) {
        return new Promise<User>((resolve, reject) => {
            try {
                const insert = database.prepare('INSERT INTO users (id, name) VALUES (?, ?)');
                insert.run(userData.id, userData.name);
                resolve(userData);
            } catch (error) {
                reject(error);
            }
        });
    }

    getUser(userId: number) {
        return new Promise<User>((resolve, reject) => {
            try {
                // Al usar 'AS' no se quejaría del undefined, pero necesitamos igualmente controlarlo para evitar errores
                // evitar usar 'AS', mejor un genérico si se puede definir
                const user = database.prepare('SELECT * FROM users WHERE id = ?').get(userId) as User | undefined; 
                if (!user) {
                    reject(new Error('Error getting user'));
                } else {
                    resolve(user);
                }
            } catch (error) {
                reject(new Error('Error getting user'));
            }
        });
    }
}

export default SQLiteRepository;