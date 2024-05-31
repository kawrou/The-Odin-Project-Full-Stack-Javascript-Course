// Use __proto__ to assign prototypes in a way that any property lookup will follow the path:
// pockets → bed → table → head.
// For instance, pockets.pen should be 3 (found in table), and bed.glasses should be 1 (found in head).

let head = {
 glasses: 1,
};

let table = {
 pen: 3,
 __proto__: head,
};

let bed = {
 sheet: 1,
 pillow: 2,
 __proto__: table,
};

let pockets = {
 money: 2000,
 __proto__: bed,
};

console.log(pockets.pen);
console.log(bed.glasses);

// We have two hamsters: speedy and lazy inheriting from the general hamster object.
// When we feed one of them, the other one is also full. Why? How can we fix it?

let hamster = {
 stomach: [],

 eat(food) {
  this.stomach.push(food);
 },
};

let speedy = {
 __proto__: hamster,
 stomach: []
};

let lazy = {
 __proto__: hamster,
 stomach: []
};

// This one found the food
speedy.eat("apple"); 
speedy.eat("orange")
console.log(speedy.stomach); // apple

// This one also has it, why? fix please.
console.log(lazy.stomach); // apple
