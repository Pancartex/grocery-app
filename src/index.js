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

const INPUT_CONSTRAINTS = {
  default: 0,
  min: 0,
  max: 99,
}

class Product {
  static nextId = 0;

  constructor({ id, name, price, description, image } = {}) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
    this.node = null;
  }

  render(parent) {
    this.node = document.createElement('li');
    this.node.id = `item-${Product.nextId++}`;
    this.node.className = "item-box";
    this.node.innerHTML = `
      <img class="item-img" src="${this.image}">    
      <h2>${this.name}</h2>
      <p>$${this.price} per Item</p>
      <p>${this.description}</p>
      <div class="item-footer">
        <label for="quantity">Quantity</label>
        <input type="number" name="quantity" value="${INPUT_CONSTRAINTS.default}" min="${INPUT_CONSTRAINTS.min}" max="${INPUT_CONSTRAINTS.max}">
        <p class="total-price">${this.getTotalPrice()}</p>
        <button class="item-btn">Add to cart</button>
      </div>
    `;
    parent.appendChild(this.node);
    this.addEventListeners();
  }

  getTotalPrice() {
    const quantity = this.quantityInput ? this.quantityInput.value : INPUT_CONSTRAINTS.default;
    return `Total: $${(quantity * this.price).toFixed(2)}`;
  }

  addEventListeners() {
    this.quantityInput.addEventListener("input", () => {
      this.totalPriceParagraph.textContent = this.getTotalPrice();
    });
    this.addToCartButton.addEventListener("click", () => {
      console.log("TODO: Implement add to cart")
    });
  }

  get addToCartButton() {
    return this.node.querySelector('.item-btn');
  }

  get quantityInput() {
    return this.node.querySelector('input[name="quantity"]');
  }

  get totalPriceParagraph() {
    return this.node.querySelector('.total-price');
  }
}

const milk = new Product(groceryItems.milk)
const crisp = new Product(groceryItems.crisp)
const eggs = new Product(groceryItems.eggs)
const bread = new Product(groceryItems.bread)

const listContainer = document.querySelector('.list-container');
milk.render(listContainer)
crisp.render(listContainer)
eggs.render(listContainer)
bread.render(listContainer)
