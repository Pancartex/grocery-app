const groceryItems = {
    milk: {
        id: 1,
        name: "Milk",
        description: "Before the late 1960s, milk was packaged in heavy, Now plastic bags!",
        image: "https://i.stack.imgur.com/ofltz.jpg",
        price: 1.99
    },
    crisp: {
        id: 2,
        name: "Doritos",
        description: "Very spicy, avoid giving to childrens",
        image: "https://images2.minutemediacdn.com/image/fetch/w_736,h_485,c_fill,g_auto,f_auto/https%3A%2F%2Ffoodsided.com%2Ffiles%2F2021%2F12%2FFLCH-Photo-1-850x560.jpg",
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
    },
    cheese: {
        id: 5,
        name: "cheese",
        description: "swiss cheese",
        image: "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F19%2F2019%2F07%2F09%2Fswiss-cheese-2000.jpg",
        price: 6.99
    }
}


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
          
          <h2>${name}</h2>
          <p>$${price} per Item</p>
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
        const checkoutList = document.querySelector('.checkout-list')
        const addedToCartHeader = document.getElementById('added-to-cart')
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
          addedToCartHeader.textContent = ` - added ${quantityInput.value}x ${name} to cart`
          quantityInput.value = 1;
          totalPriceParagraph.textContent = `Total: $${(quantityInput.value * price).toFixed(2)}`;
          document.getElementById('checkout-total').textContent = `${currentTotal}`

        })

        deleteFromCart.addEventListener('click', () => {
          this.checkoutItemNode.remove()
          currentTotal -= this.checkoutItemPrice
          this.checkoutItemPrice = 0
          this.checkoutItemQuantity = 0
          document.getElementById('checkout-total').textContent = `${currentTotal}`
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
const cheese = new Item(groceryItems.cheese)

milk.render()
crisp.render()
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





