const groceryItems = {
    milk: {
        name: "milk",
        description: "comes in a bag",
        image: "url",
        price: 2
    },
    crisp: {
        name: "Doritos - spicy",
        description: "Very spicy, avoid giving to childrens",
        image: "url",
        price: 4
    },
    eggs: {
        name: "eggk",
        description: "comes in a pack of 12, in a box",
        image: "url",
        price: 3
    },
    bread: {
        name: "bread",
        description: "Fresh from this morning",
        image: "url",
        price: 2
    }
}

function Item(data) {
    this.name = data.name;
    this.description = data.description;
    this.image = data.image;
    this.price = data.price;
}

const milk = new Item(groceryItems.milk)
const crisp = new Item(groceryItems.crisp)
const eggs = new Item(groceryItems.eggs)
const bread = new Item(groceryItems.bread)
