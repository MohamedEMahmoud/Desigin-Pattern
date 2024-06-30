var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AbstractClass = /** @class */ (function () {
    function AbstractClass() {
    }
    AbstractClass.prototype.templateMethod = function () {
        this.baseOperation1();
        this.requiredOperations1();
        this.baseOperation2();
        this.hook1();
        this.baseOperation3();
        this.hook2();
    };
    AbstractClass.prototype.baseOperation1 = function () {
        console.log("AbstractClass says: i am doing the bulk of the work");
    };
    AbstractClass.prototype.baseOperation2 = function () {
        console.log("AbstractClass says: But i let subclass override some operations");
    };
    AbstractClass.prototype.baseOperation3 = function () {
        console.log("AbstractClass says: But I am doing bulk of the work anyway");
    };
    AbstractClass.prototype.hook1 = function () { };
    AbstractClass.prototype.hook2 = function () { };
    return AbstractClass;
}());
var ConcreteClass1 = /** @class */ (function (_super) {
    __extends(ConcreteClass1, _super);
    function ConcreteClass1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConcreteClass1.prototype.requiredOperations1 = function () {
        console.log("ConcreteClass1 says: Implemented Operation1");
    };
    ConcreteClass1.prototype.requiredOperation2 = function () {
        console.log("ConcreteClass1 says: Implemented Operation2");
    };
    return ConcreteClass1;
}(AbstractClass));
var ConcreteClass2 = /** @class */ (function (_super) {
    __extends(ConcreteClass2, _super);
    function ConcreteClass2() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ConcreteClass2.prototype.requiredOperations1 = function () {
        console.log('ConcreteClass2 says: Implemented Operation1');
    };
    ConcreteClass2.prototype.requiredOperation2 = function () {
        console.log('ConcreteClass2 says: Implemented Operation2');
    };
    ConcreteClass2.prototype.hook1 = function () {
        console.log('ConcreteClass2 says: Overridden Hook1');
    };
    return ConcreteClass2;
}(AbstractClass));
function clientCode(abstractClass) {
    abstractClass.templateMethod();
}
console.log('Same client code can work with different subclasses:');
clientCode(new ConcreteClass1());
console.log();
console.log('Same client code can work with different subclasses:');
clientCode(new ConcreteClass2());
