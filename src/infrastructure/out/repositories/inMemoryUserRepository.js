// aquí podría ir el knex
class inMemoryUserRepository {
    constructor() {
        this.users = [];
    }

    createUser(user) {
        this.users.push(user);
        return user;
    }

    getUser(userId) {
        const user = this.users.find(currentUser => currentUser.id === userId);
        return user;
    }
}

module.exports = inMemoryUserRepository;