interface Component {
    operation(): string;
}


class ConcreteComponent implements Component {
    operation(): string {
        return `ConcreteComponent`;
    }
}


class Decorator implements Component {

    constructor(protected component: Component){}

    operation(): string {
        return this.component.operation();
    }
}


class ConcreteDecoratorA extends Decorator{
    operation(): string {
        return `ConcreteDecoratorA(${super.operation()})`
    }

}


class ConcreteDecoratorB extends Decorator{
    operation(): string {
        return `ConcreteDecoratorB(${super.operation()})`
    }
}

const clientCode =(component:Component) => {
    console.log(`RESULT: ${component.operation()}`)
}


const simple = new ConcreteComponent();

console.log(`Client: I've got a simple component:`);

clientCode(simple);

console.log('');


const decorator1 = new ConcreteDecoratorA(simple);
const decorator2 = new ConcreteDecoratorB(decorator1);


console.log(`Client: I've got a decorator component:`);
clientCode(decorator2);
