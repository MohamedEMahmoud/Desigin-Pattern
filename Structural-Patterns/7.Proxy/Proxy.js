var RealSubject = /** @class */ (function () {
    function RealSubject() {
    }
    RealSubject.prototype.request = function () {
        console.log("RealSubject: Handling request.");
    };
    return RealSubject;
}());
var ProxyPattern = /** @class */ (function () {
    function ProxyPattern(realSubject) {
        this.realSubject = realSubject;
    }
    ProxyPattern.prototype.request = function () {
        if (this.checkAccess()) {
            this.realSubject.request();
            this.logAccess();
        }
    };
    ProxyPattern.prototype.checkAccess = function () {
        console.log("Proxy: Checking access prior to firing a real request.");
        return true;
    };
    ProxyPattern.prototype.logAccess = function () {
        console.log("Proxy: Logging the time of request.");
    };
    return ProxyPattern;
}());
var clientCode = function (subject) {
    subject.request();
};
console.log("Client: Executing the client code with a real subject");
var realSubject = new RealSubject();
console.log();
console.log("Client: Executing the same client code with a proxy: ");
var proxy = new ProxyPattern(realSubject);
clientCode(proxy);
