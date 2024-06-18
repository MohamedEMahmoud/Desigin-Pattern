interface Subject {
    request(): void;
}

class RealSubject implements Subject {
    request(): void {
        console.log("RealSubject: Handling request.");
    }
}

class ProxyPattern implements Subject {
    constructor(private realSubject: RealSubject){}

    request(): void {
        if(this.checkAccess()){
            this.realSubject.request();
            this.logAccess();
        }
    }

    private checkAccess(): boolean {
        console.log("Proxy: Checking access prior to firing a real request.");
        return true;
    }

    private logAccess(): void{
        console.log("Proxy: Logging the time of request.");
    }
}

const clientCode = (subject: Subject) => {
    subject.request();
}


console.log("Client: Executing the client code with a real subject");

const realSubject = new RealSubject();

console.log();

console.log("Client: Executing the same client code with a proxy: ");

const proxy = new ProxyPattern(realSubject);

clientCode(proxy)