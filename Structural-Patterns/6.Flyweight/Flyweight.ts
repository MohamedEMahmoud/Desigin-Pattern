class Flyweight {

    constructor(private sharedState: any){}

    operation(uniqueState: string[]): void{

        const s = JSON.stringify(this.sharedState);

        const u = JSON.stringify(uniqueState);

        console.log(`Flyweight: Displaying shared (${s}) and unique (${u}) state.`);

    }
}


class FlyweightFactory {

    private flyweights: {[key: string]: Flyweight} = <any>{};

    constructor(initialFlyweights: string[][]){
        for (const state of initialFlyweights){
            this.flyweights[this.getKey(state)] = new Flyweight(state);
        }
    }

    private getKey(state: string[]): string {
        return state.join('_');
    }

    getFlyweight(sharedState: string[]): Flyweight {

        const key = this.getKey(sharedState);

        if(!(key in this.flyweights)){
            console.log(`FlyweightFactory: can't find a flyweight, creating new one.`);
            this.flyweights[key] = new Flyweight(sharedState);
        } else{
            console.log("FlyweightFactory: Reusing exiting flyweight.");
        }

        return this.flyweights[key];
    }

    listFlyweights(): void {

        const count = Object.keys(this.flyweights).length;

        console.log(`\n FlyweightsFactory: I have ${count} flyweights: `);

        for(const key in this.flyweights){
            console.log(key);
        }
    }
}


const factory = new FlyweightFactory([
    ["Chevrolet", "Camaro2018", "Pink"],
    ["Mercedes Benz", "C300", "Black"],
    ["Mercedes Benz", "C500", "Red"],
    ["BMW", "M5", "Red"],
    ["BMW", "X6", "White"],
]);

factory.listFlyweights();

const addCarToPoliceDatabase = (ff: FlyweightFactory, plates: string, owner: string, brand: string, model: string, color: string) =>{

    console.log(`\n Client: Adding a car to database.`);

    const flyweight = ff.getFlyweight([brand, model, color]);

    flyweight.operation([plates, owner]);

}


addCarToPoliceDatabase(factory, "CL23IR", "James Doe", "BMW", "M5", "Red");

addCarToPoliceDatabase(factory, "CL23IR", "James Doe", "BMW", "X1", "Red");

factory.listFlyweights();
