abstract class AbstractUser {
    public name: string; // si no pones nada es public por default

    constructor(name: string) {
        this.name = name;
    }
    abstract validate(): string;
    // abstract toPrimitive(): string;
    sayHello() { // Esto solo se usar´ía si no tienes TS, asi si la class User no tiene un método sayHello, devolverá error (aunque no pete en el IDE)
        throw new Error('Method not implemented.');
    }

    getName() {
        // puedo definirlo aqui de manera general, y lo extenderán las clases que lo usen sin necesitar declararlo
    }
}

class User extends AbstractUser {
    constructor(name: string) {
        super(name);
    }

    validate() {
        return `Hello ${this.name}`;
    }
}

const user = new User('John Doe');
user.sayHello();

class Admin extends AbstractUser {
    constructor(name: string) {
        super(name);
    }

    validate() {
        return `Hello Admin ${this.name}`;
    }
}