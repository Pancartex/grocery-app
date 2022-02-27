const groceryItems = {
    milk: {
        id: 1,
        name: "Milk",
        description: "Before the late 1960s, milk was packaged in heavy, Now plastic bags!",
        image: "https://beatrice.ca/static/wp-content/uploads/updates/2pct-partly-skimmed-milk-1l-carton-nat-thumb.png",
        price: 1.99
    },
    chips: {
        id: 2,
        name: "Chips",
        description: "Very spicy, avoid giving to childrens",
        image: "https://image.made-in-china.com/202f0j00QPdYioAKwnbO/Three-Side-Seal-Food-Bag-Coffee-Packaging-Chips-Crisps.jpg",
        price: 4.99
    },
    eggs: {
        id: 3,
        name: "Eggs",
        description: "comes in a pack of 12, in a box",
        image: "http://grayridge.com/dev/wp-content/uploads/2017/12/brown-xl.jpg",
        price: 3.50
    },
    bread: {
        id: 4,
        name: "Bread",
        description: "Fresh from this morning",
        image: "http://www.canadabreadfoodservice.ca/wp-content/uploads/350.jpg",
        price: 2.69
    },
    cheese: {
        id: 5,
        name: "cheese",
        description: "swiss cheese",
        image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2019%2F07%2F09%2Fswiss-cheese-2000.jpg",
        price: 6.99
    }
}

const checkoutList = document.querySelector('.checkout-list')
const addedToCartHeader = document.getElementById('added-to-cart')
const checkoutTotal = document.getElementById('checkout-total')

let currentTotal = 0

class Item {
  constructor(data) {

    Object.assign(this, data)
    this.itemNode = this.createItemNode()
    this.checkoutItemNode = this.createCheckoutItem()
    this.quantityInput = this.itemNode.querySelector('input') // ???? .value?
    this.checkoutItemPrice = 0
    this.checkoutItemQuantity = 0
  }
  
      createItemNode() {
        const { name, description, image, price } = this;
        const li = document.createElement('li')
         li.innerHTML = `
          <img class="item-img" src="${image}">
          <h2 class="item-title">${name} - $${(price).toFixed(2)}</h2>
          <p class="item-description">${description}</p>

          <div class="item-footer">
            <label for="quantity">Quantity</label>
            <input type="number" id="quantity" name="quantity" onkeypress="return event.charCode >= 48" value="1" min="1" max="99">
            <p id="total">Total: $${(price).toFixed(2)}</p>
            <button class="item-btn">Add to cart</button>
          </div>`;
          li.classList.add('item-box')
          return li
        }

      createCheckoutItem() {
        const { name, image, price, quantityInput } = this;
        const checkoutItem = document.createElement('li')
        checkoutItem.classList.add('checkout-item')
        
        checkoutItem.innerHTML = `
            <img class="checkout-img" src="${image}">
            <p></p>
            <button class="delete-checkout-btn"><i class="fa-solid fa-xmark"></i></button>
            `
            return checkoutItem
      }

      setupEventListeners() {
        const { name, price, quantityInput } = this;
        const totalPriceParagraph = this.itemNode.querySelector('#total')
        const addToCart = this.itemNode.querySelector('button')
        const deleteFromCart = this.checkoutItemNode.querySelector('.delete-checkout-btn')
        const checkoutParagraph = this.checkoutItemNode.querySelector('p') // ??????

        quantityInput.addEventListener("input", () => {
          totalPriceParagraph.textContent = `Total: $${(quantityInput.value * price).toFixed(2)}`;
        })

        addToCart.addEventListener('click', () => {
          checkoutList.append(this.checkoutItemNode)
          this.checkoutItemPrice += quantityInput.value * price
          this.checkoutItemQuantity += Number(quantityInput.value)
          currentTotal += quantityInput.value * price
          checkoutParagraph.textContent = `${this.checkoutItemQuantity}x ${name} - $${(this.checkoutItemPrice).toFixed(2)}`
          addedToCartHeader.textContent = `${(currentTotal).toFixed(2)}`
          quantityInput.value = 1;
          totalPriceParagraph.textContent = `Total: $${(quantityInput.value * price).toFixed(2)}`;
          checkoutTotal.textContent = `${(currentTotal).toFixed(2)}`

        })

        deleteFromCart.addEventListener('click', () => {
          this.checkoutItemNode.remove()
          currentTotal -= this.checkoutItemPrice
          this.checkoutItemPrice = 0
          this.checkoutItemQuantity = 0
          checkoutTotal.textContent = `${(currentTotal).toFixed(2)}`
          addedToCartHeader.textContent = `${(currentTotal).toFixed(2)}`
        })



      }

      render() {
        const listContainer = document.querySelector('.list-container')
        listContainer.append(this.itemNode)
        this.setupEventListeners()
      }
    
}


//there must be a simpler way to create/ render these

const milk = new Item(groceryItems.milk)
const chips = new Item(groceryItems.chips)
const eggs = new Item(groceryItems.eggs)
const bread = new Item(groceryItems.bread)
const cheese = new Item(groceryItems.cheese)

milk.render()
chips.render()
eggs.render()
bread.render()
cheese.render()

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





