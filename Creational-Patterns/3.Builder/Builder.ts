interface Builder {
    producePartA(): void;
    producePartB(): void;
    producePartC(): void;
}


class ConcreteBuilder1 implements Builder{
    private product: Product1;
    constructor(){
        this.reset();
    }

    reset(): void{
        this.product = new Product1();
    }

    producePartA(): void{
        this.product.parts.push('partA1')
    }

    producePartB(): void{
        this.product.parts.push('partB1')
    }

    producePartC(): void{
        this.product.parts.push('partC1')
    }

    getProduct(): Product1{
        const result = this.product;
        this.reset();
        return result;
    }
}

class Product1 {
    parts: string[] = [];

    listParts(): void{
        console.log(`Product parts: ${this.parts.join(', ')}\n`);
    }
}


class Director{
    private builder: Builder;

    setBuilder(builder: Builder): void{
        this.builder = builder;
    }

    buildMinimalViableProduct(): void{
        this.builder.producePartA();
    }

    buildFullFeaturedProduct(): void{
        this.builder.producePartA();
        this.builder.producePartB();
        this.builder.producePartC();
    }
}



function clientCode(director: Director){

    const builder = new ConcreteBuilder1();
    
    director.setBuilder(builder);

    console.log(`Standard basic product:`);

    director.buildMinimalViableProduct();

    builder.getProduct().listParts();

    console.log(`Standard full featured product:`);

    director.buildFullFeaturedProduct();

    builder.getProduct().listParts();

    console.log(`Custom product:`);

    builder.producePartA();

    builder.producePartC();

    builder.getProduct().listParts();
}

console.log()
clientCode(new Director())