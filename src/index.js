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

    Object.assign(this, data)
    this.itemNode = this.createItemNode()
    
  }
  
      createItemNode() {
        const { id, name, description, image, price } = this;
        const li = document.createElement('li')
         li.innerHTML = `
          <img class="item-img" src="${image}">
          
          <h2>${name}</h2>
          <p>$${price} per Item</p>
          <p>${description}</p>
          <div class="item-footer">
            <label for="quantity">Quantity</label>
            <input type="number" id="quantity" name="quantity" value="1" min="1" max="99">
            <p id="total">Total: $${(price).toFixed(2)}</p>
            <button class="item-btn" id="btn">Add to cart</button>
          </div>`;
          li.classList.add('item-box')
          return li
        }

      setupEventListeners() {
        const { id, name, description, image, price } = this;
        const quantityInput = this.itemNode.querySelector('input');
        const totalPriceParagraph = this.itemNode.querySelector('#total')

        quantityInput.addEventListener("input", function() {
          totalPriceParagraph.textContent = `Total: $${(quantityInput.value * price).toFixed(2)}`;
        })

        // add logic for the button here, to be able to push to checkout
      }

      render() {
        const listContainer = document.querySelector('.list-container')
        listContainer.append(this.itemNode)
        this.setupEventListeners()
      }
    
}

const milk = new Item(groceryItems.milk)
const crisp = new Item(groceryItems.crisp)
const eggs = new Item(groceryItems.eggs)
const bread = new Item(groceryItems.bread)

milk.render()
crisp.render()
eggs.render()
bread.render()





