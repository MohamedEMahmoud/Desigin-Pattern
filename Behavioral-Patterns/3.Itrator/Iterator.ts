interface Iterator<T>{
    current(): T;

    next(): T;

    key(): number;

    valid(): boolean;

    rewind(): void;
}


interface Aggregator{
    getIterator(): Iterator<string>;
}


class AlphabeticalOrderIterator implements Iterator<string>{

    private position: number = 0;

    constructor(private collection: WordsCollection,  private reverse: boolean = false){}

    rewind(): void {
        this.position = this.reverse ? this.collection.getCount() - 1 : 0;
    }

    current(): string {
        return this.collection.getItems()[this.position];
    }

    key(): number {
        return this.position;
    }

    next(): string{
        
        const item = this.collection.getItems()[this.position];
        
        this.position += this.reverse ? -1 : 1;
        
        return item;
    }

    valid(): boolean {
        if(this.reverse){
            return this.position >= 0;
        }

        return this.position < this.collection.getCount();
    }
}



class WordsCollection implements Aggregator{

        private items: string[] = [];

        getItems(): string[]{
            return this.items;
        }

        getCount(): number {
            return this.items.length;
        }

        addItem(item: string): void{
            this.items.push(item);
        }

        getIterator(): Iterator<string> {
            return new AlphabeticalOrderIterator(this);
        }


        getReverseIterator(): Iterator<string> {
            return new AlphabeticalOrderIterator(this, true)
        }
}


const collection = new WordsCollection();

collection.addItem('First');

collection.addItem('Second');

collection.addItem('Third');

const iterator = collection.getIterator();

console.log('Straight traversal:');

while(iterator.valid()){
    console.log(iterator.next());
}

console.log();

console.log('Reverse traversal:');

const reverseIterator = collection.getReverseIterator();

while(reverseIterator.valid()){
    console.log(reverseIterator.next());
}