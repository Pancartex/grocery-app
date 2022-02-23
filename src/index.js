const groceryItems = {
    milk: {
        id: 1,
        name: "Milk",
        description: "Before the late 1960s, milk was packaged in heavy, reusable Imperial unit glass milk bottles and later cardboard cartons and plastic jugs. Now plastic bags!",
        image: "https://i.stack.imgur.com/ofltz.jpg",
        price: 1.99
    },
    crisp: {
        id: 2,
        name: "Doritos - spicy",
        description: "Very spicy, avoid giving to childrens",
        image: "https://www.doritos.com/sites/doritos.com/files/2018-08/new-spicy-nacho.png",
        price: 4.99
    },
    eggs: {
        id: 3,
        name: "Eggs",
        description: "comes in a pack of 12, in a box",
        image: "https://i5.walmartimages.ca/images/Enlarge/924/227/6000197924227.jpg",
        price: 3.50
    },
    bread: {
        id: 4,
        name: "Bread",
        description: "Fresh from this morning",
        image: "http://www.canadabreadfoodservice.ca/wp-content/uploads/350.jpg",
        price: 2.69
    }
}



class Item {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.description = data.description;
        this.image = data.image;
        this.price = data.price;
        this.summarizeItem = function() {
            const { id, name, description, image, price } = this;
            document.getElementById(id).innerHTML = `
            <div>
                <img class="item-img" src="${image}">
            </div>
            <h2>${name}</h2>
            <p>$${price} per Item</p>
            <p>${description}</p>
            <div class="item-footer">
                <label for="quantity">Quantity</label>
                <input type="number" id="quantity${id}" name="quantity" value="1" min="1" max="99">
                <p id="total${id}">Total: $${(price).toFixed(2)}</p>
                <button class="item-btn" id="btn${id}">Add to cart</button>
            </div>`;

            
            const quantityInput = document.getElementById(`quantity${id}`)
            const totalItemPrice = document.getElementById(`total${id}`)
            quantityInput.addEventListener("input", function() {
                totalItemPrice.textContent = `Total: $${(quantityInput.value * price).toFixed(2)}`

            })

            document.getElementById(`btn${id}`).addEventListener("click", () => {
                // push totalItemPrice value to checkout card
                // clear input field back to value="1"
            })
            
        };

        
    }
}

const milk = new Item(groceryItems.milk)
const crisp = new Item(groceryItems.crisp)
const eggs = new Item(groceryItems.eggs)
const bread = new Item(groceryItems.bread)

milk.summarizeItem()
crisp.summarizeItem()
eggs.summarizeItem()
bread.summarizeItem()




