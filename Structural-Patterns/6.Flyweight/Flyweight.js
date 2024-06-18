var Flyweight = /** @class */ (function () {
    function Flyweight(sharedState) {
        this.sharedState = sharedState;
    }
    Flyweight.prototype.operation = function (uniqueState) {
        var s = JSON.stringify(this.sharedState);
        var u = JSON.stringify(uniqueState);
        console.log("Flyweight: Displaying shared (".concat(s, ") and unique (").concat(u, ") state."));
    };
    return Flyweight;
}());
var FlyweightFactory = /** @class */ (function () {
    function FlyweightFactory(initialFlyweights) {
        this.flyweights = {};
        for (var _i = 0, initialFlyweights_1 = initialFlyweights; _i < initialFlyweights_1.length; _i++) {
            var state = initialFlyweights_1[_i];
            this.flyweights[this.getKey(state)] = new Flyweight(state);
        }
    }
    FlyweightFactory.prototype.getKey = function (state) {
        return state.join('_');
    };
    FlyweightFactory.prototype.getFlyweight = function (sharedState) {
        var key = this.getKey(sharedState);
        if (!(key in this.flyweights)) {
            console.log("FlyweightFactory: can't find a flyweight, creating new one.");
            this.flyweights[key] = new Flyweight(sharedState);
        }
        else {
            console.log("FlyweightFactory: Reusing exiting flyweight.");
        }
        return this.flyweights[key];
    };
    FlyweightFactory.prototype.listFlyweights = function () {
        var count = Object.keys(this.flyweights).length;
        console.log("\n FlyweightsFactory: I have ".concat(count, " flyweights: "));
        for (var key in this.flyweights) {
            console.log(key);
        }
    };
    return FlyweightFactory;
}());
var factory = new FlyweightFactory([
    ["Chevrolet", "Camaro2018", "Pink"],
    ["Mercedes Benz", "C300", "Black"],
    ["Mercedes Benz", "C500", "Red"],
    ["BMW", "M5", "Red"],
    ["BMW", "X6", "White"],
]);
factory.listFlyweights();
var addCarToPoliceDatabase = function (ff, plates, owner, brand, model, color) {
    console.log("\n Client: Adding a car to database.");
    var flyweight = ff.getFlyweight([brand, model, color]);
    flyweight.operation([plates, owner]);
};
addCarToPoliceDatabase(factory, "CL23IR", "James Doe", "BMW", "M5", "Red");
addCarToPoliceDatabase(factory, "CL23IR", "James Doe", "BMW", "X1", "Red");
factory.listFlyweights();
