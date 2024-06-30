class Context {
    private state: State;

    constructor(state: State){
        this.transitionTo(state);
    }

    transitionTo(state: State): void {
        console.log(`Context: Transition to ${(<any>state).constructor.name}`);
        this.state = state;

        this.state.setContext(this);
    }

    request1(): void {
        this.state.handle1();
    }

    request2(): void {
        this.state.handle2();
    }
}


abstract class State {

    protected context: Context;
    setContext(context: Context): void{
        this.context = context;
    }

    abstract handle1(): void;

    abstract handle2(): void;

}


class ConcreteStateA extends State {
    handle1(): void {
        console.log(`ConcreteStateA handles request1`);
        console.log(`ConcreteStateA wants to change the state of the context`);
        this.context.transitionTo(new ConcreteStateB());
    }

    handle2(): void {
        console.log(`ConcreteStateA handles request2`);
    }
}


class ConcreteStateB extends State {
    handle1(): void {
        console.log(`ConcreteStateB handles request1`);
    }

    handle2(): void {
        console.log(`ConcreteStateB handles request2`);
        console.log(`ConcreteStateB wants to change the state of the context`);
        this.context.transitionTo(new ConcreteStateA());
    }
}

const context = new Context(new ConcreteStateA());

context.request1();

context.request2();