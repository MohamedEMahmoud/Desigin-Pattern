class Abstraction{

    constructor(protected implementation: Implementation){}

    operation(): string {
        const result = this.implementation.operationImplementation();
        return `Abstraction: Base operation with : \n${result}`;
    }
}


class ExtendedAbstraction extends Abstraction {
    operation(): string {
        const result = this.implementation.operationImplementation();

        return `ExtendedAbstraction: Extended operation with: \n${result}`;
    }
}


interface Implementation {
    operationImplementation(): string;
}


class ConcreteImplementationA implements Implementation {
    operationImplementation(): string {
        return `ConcreteImplementationA: Here's the result on the platform A.`;
    }
}


class ConcreteImplementationB implements Implementation {
    operationImplementation(): string {
        return `ConcreteImplementationB: Here's the result on the platform B.`
    }
}


const clientCode =  (abstraction: Abstraction) =>{
    console.log(abstraction.operation());
}


let implementation = new ConcreteImplementationA();

let abstraction = new Abstraction(implementation);

clientCode(abstraction);

console.log();

implementation = new ConcreteImplementationB();


abstraction = new ExtendedAbstraction(implementation);

clientCode(abstraction);