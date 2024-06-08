abstract class Component {

    protected parent!: Component | null;

    setParent(parent: Component | null){
        this.parent = parent;
    }

    getParent(): Component | null {
        return this.parent;
    }

    add(component: Component): void { }

    remove(component: Component): void {}


    isComposite(): boolean  {
        return false;
    }

    abstract operation(): string;

}


class Leaf extends Component {
    operation(): string {
        return 'Leaf';
    }
}


class Composite extends Component {

    protected children: Component[] = [];

    add(component: Component): void {
        this.children.push(component);
        component.setParent(this);
    }

    remove(component: Component): void {
        const componentIndex = this.children.indexOf(component);
        this.children.splice(componentIndex, 1);
        component.setParent(null);
    }


    isComposite(): boolean {
        return true;
    }

    operation(): string {
        const results = [];

        for(const child of this.children){
            results.push(child.operation());
        }

        return `Branch(${results.join('+')})`;
    }
}



const clientCode = (component: Component) => {
    console.log(`RESULT: ${component.operation()}`);
}



const simple = new Leaf();

console.log(`Client: i'v got a simple component:`);

clientCode(simple);

console.log();

const tree = new Composite();

const branch1 = new Composite();

branch1.add(new Leaf());

branch1.add(new Leaf());

const branch2 = new Composite();

branch1.add(new Leaf());

tree.add(branch1);

tree.add(branch2);

console.log(`Client: Now I've got a composite tree:`);

clientCode(tree);

console.log()


const clientCode2 = (component1: Component, component2: Component) => {
    if(component1.isComposite()){
        component1.add(component2);
    }

    console.log(`RESULT: ${component1.operation()}`)
}


console.log(`Client: I don't need to check the components classes even when managing the tree:`);


clientCode2(tree, simple);