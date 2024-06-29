class Originator {
    constructor(private state: string){
        console.log(`Originator: My initial state is: ${state}`);
    }

    doSomething(): void {
        console.log(`Originator: I'm doing something important`);
        this.state = this.generateRandomString(30);
        console.log(`Originator: and my state has changed to : ${this.state}`);
    }

    generateRandomString(length: number = 10): string{
        const charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        return Array.apply(null, {length}).map(() => charSet.charAt(Math.floor(Math.random() * charSet.length))).join('');
    }

    save(): Memento {
        return new ConcreteMemento(this.state);
    }

    restore(memento: Memento): void {
        this.state = memento.getState();
        console.log(`Originator: My state has changed to : ${this.state}`);
    }
}

interface Memento {
    getState(): string;
    getName(): string;
    getDate(): string;
}


class ConcreteMemento implements Memento {
    
    private date: string;
    
    constructor(private state: string){
        this.date = new Date().toISOString().slice(0, 19).replace('T',' ')
    }

    getState(): string {
        return this.state;
    }

    getName(): string {
        return `${this.date} / (${this.state.substring(0, 9)}...)`;
    }

    getDate(): string {
        return this.date;
    }
}


class Caretaker{
    private mementos: Memento[] = [];

    constructor(private originator: Originator){}

    backup(): void{
        console.log(`\n Caretaker: Saving originator's state...`);
        this.mementos.push(this.originator.save());
    }

    undo(): void{
        if(!this.mementos.length){
            return;
        }
        
        const memento = this.mementos.pop();

        console.log(`Caretaker: Restoring state to: ${memento?.getName()}`);

        this.originator.restore(memento!);
    }

    showHistory(): void{
        console.log(`Caretaker: Here's the list of mementos:`);

        for(const memento of this.mementos){
            console.log(memento?.getName());
        }
    }
}


const originator = new Originator('Super-duper-super-puper-super.');

const caretaker = new Caretaker(originator);


caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

caretaker.backup();
originator.doSomething();

console.log('');
caretaker.showHistory();

console.log(`\n Client: Now, let's rollback! \n`);
caretaker.undo();

console.log(`\n Client: Once more! \n`);
caretaker.undo();