class Singleton {

    private static instance: Singleton;

    private constructor(){}

    static getInstance(): Singleton {
        if(!Singleton.instance){
            Singleton.instance = new Singleton();
        }

        return Singleton.instance;
    }

    someBusinessLogic(){
        console.log('someBusinessLogic')
    }
}


function clientCode(){
    
    const s1 = Singleton.getInstance();
    const s2 = Singleton.getInstance();

    if(s1 === s2){
        console.log('Singleton works, both variables contain the same instance.');
    } else{
        console.log('Singleton failed, variables contain different instances.');
    }
}

clientCode();