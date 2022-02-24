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
        const { name, description, image, price } = this;
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
        const { name, image, price } = this;
        const quantityInput = this.itemNode.querySelector('input');
        const totalPriceParagraph = this.itemNode.querySelector('#total')
        const addToCart = this.itemNode.querySelector('button')
        const checkoutLi = document.createElement('li')
        const checkoutItems = document.querySelector('.checkout-items')
        const addedToCart = document.getElementById('added-to-cart')
        checkoutLi.classList.add('checkout-list')

        quantityInput.addEventListener("input", () => {
          totalPriceParagraph.textContent = `Total: $${(quantityInput.value * price).toFixed(2)}`;
        })

        addToCart.addEventListener('click', e => {
          e.preventDefault()
          checkoutLi.innerHTML = `
            <img class="checkout-img" src="${image}">
            <p>${quantityInput.value}x ${name} - $${(quantityInput.value * price).toFixed(2)}</p>
            <button class="delete-checkout-btn"><i class="fa-solid fa-xmark"></i></button>
            `
            checkoutItems.append(checkoutLi)

            addedToCart.textContent = `          added ${quantityInput.value}x ${name} to cart`
        })

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

// function for mobile functionality & logic below

const checkoutHeader = document.querySelector('.checkout-header')
const checkoutContent = document.getElementById('checkout-content')

checkoutHeader.addEventListener("click", () => {
  
    if (checkoutContent.style.display === "none") {
      checkoutContent.style.display = "block"
    } else {
      checkoutContent.style.display = "none"
    }
})





