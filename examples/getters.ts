class Project {
  private _name: string; // private = solo de TS, da error en tiempo de compilación
  #objective: string; // # = private = es de JS, da error en tiempo de ejecución
  readonly status: string = 'Active'; // se podría definir el default aqui, en vez de en el constructor
  // To Review: protected = solo accesible desde la clase que lo define y desde las clases que heredan de ella
  protected _description: string = 'Description';

  constructor(name) {
    this._name = name;
    this.#objective = 'Objective';
    // this.status = 'Inactive'; // aunque sea readonly aqui si que se puede inicializar con un valor nuevo. Si no lo añado aqui, se mantiene lo inicializado fuera
  }

  get name() {
    return this._name;
  }

  getName() {
    return this._name;
  }

  setStatus(status) {
    this.status = status;
  }

  set name(name) {
    this._name = name;
  }

  setName(name) {
    this._name = name;
  }
}

const project = new Project('Project 1');
// Get
console.log(project.name)
console.log(project.getName())
//Set
project.name = 'Project 2';
project.setName('Project 3');

console.log(project.status)
// console.log(project.#objective);
project._description = 'New Description';
console.log(project._description);