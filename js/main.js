import mainProducts from './products.js'

const STORAGE = 'CART_TEST'

let cart = []

const output = document.querySelector('#output')
const cartCounter = document.querySelector('#cart-counter')

initCounter()

switch (window.location.pathname) {
    case '/':
    case '/index.html':
        initMainPage()
        document.title = 'QPICK - Products'
        break
    case '/cart.html':
        document.title = 'QPICK - Cart'
        initCartPage()
        break
    default:
        break
}

// ----------

function initCartPage() {
    const newSection = document.createElement('section')
    const html = `
<h2 class="h2-dark">Корзина</h2>
<div class="long-cards"></div>`
    newSection.insertAdjacentHTML('afterbegin', html)

    const longCards = newSection.querySelector('.long-cards')
    cart.forEach((product) => {
        // console.log(product)
        const testCard = createLongCard(product)
        longCards.append(testCard)
    })

    output.innerHTML = ''
    output.appendChild(newSection)
    newFullPrice()
    updateCount()
}

function createLongCard(obj) {
    const { title, id, price, count } = obj

    const card = document.createElement('div')
    card.classList = 'card-l'

    const html = `
    <div class="cart-l__line">
        <div class="card-l__image">
            <img src="./assets/photo/${id}.png" alt="${title}">
        </div>
        <div class="card-l__content">
            <h4><a href="./products/${id}">${title}</a></h4>
            <div class="price-current">${price} ₽</div>
        </div>
        <button id="${id}-delete" class="delete-btn"><img src="./assets/icons/del.svg" alt="Delete"></button>
    </div>
    <div class="card-l__toolbar">
        <div id="${id}-minus" class="round-button">
            <img src="./assets/icons/minus.svg" alt="Minus">
        </div>
        <div id="${id}-cart-counter" class="card-counter">${count}</div>
        <div id="${id}-plus" class="round-button">
            <img src="./assets/icons/plus.svg" alt="Plus">
        </div>
        <div class="toolbar-space"></div>
        <div id="${id}-card-full-price" class="card-full-price">9999 ₽</div>
    </div>`

    card.insertAdjacentHTML('afterbegin', html)

    newCardPrice(id, count * price)

    card.querySelector(`#${id}-delete`).addEventListener('click', () => {
        console.log('Удалить:', id)
        cart = cart.filter((product) => product.id !== id)
        initCartPage()
        newFullPrice()
        // TODO Update store
    })

    card.querySelector(`#${id}-plus`).addEventListener('click', () => {
        console.log('Прибавить:', id)
        const index = cart.findIndex((product) => product.id === id)
        ++cart[index].count
        card.querySelector(`#${id}-cart-counter`).textContent = cart[index].count
        newCardPrice(id, cart[index].count * price)
        newFullPrice()
        // TODO Update store
    })

    card.querySelector(`#${id}-minus`).addEventListener('click', () => {
        console.log('Уменьшить:', id)
        const index = cart.findIndex((product) => product.id === id)
        if (cart[index].count > 1) {
            --cart[index].count
            card.querySelector(`#${id}-cart-counter`).textContent = cart[index].count
            newCardPrice(id, cart[index].count * price)
            newFullPrice()
        }
        // TODO Update store
    })

    function newCardPrice(id, price) {
        card.querySelector(`#${id}-card-full-price`).textContent = price + ' ₽'
    }

    return card
}

function newFullPrice() {
    let price = 0
    cart.forEach((product) => {
        price += product.price * product.count
    })
    document.querySelector('#full-price-count').textContent = '₽ ' + price
}

function initMainPage() {
    mainProducts.forEach((category) => {
        console.log('Категория: ' + category.category)

        const newSection = document.createElement('section')
        const html = `
<h2>${category.category}</h2>
<div class="small-cards"></div>`
        newSection.insertAdjacentHTML('afterbegin', html)

        const products = category.products
        const smallCards = newSection.querySelector('.small-cards')
        products.forEach((product) => {
            // console.log(product)
            const testCard = createCard(product)
            smallCards.append(testCard)
        })

        output.appendChild(newSection)
    })
}

function createCard(obj) {
    const { title, id, price, priceOld, rating } = obj

    const card = document.createElement('div')
    card.classList = 'card'

    const html = `
<div class="card__image"><img src="./assets/photo/${id}.png" alt="${title}"></div>
<div class="card__content">
    <div class="card__line">
        <h4><a href="./products/${id}">${title}</a></h4>
        <div class="price">
            <div class="price-current">${price} ₽</div>
            <div class="price-old">${priceOld} ₽</div>
        </div>
    </div>
    <div class="card__line">
        <div class="rating">
            <img src="./assets/icons/star.svg" alt="">${rating}</div>
        <button>Купить</button>
    </div>
</div>`

    card.insertAdjacentHTML('afterbegin', html)
    card.querySelector('button').addEventListener('click', () => buy(obj))

    if (!priceOld) card.querySelector('.price-old').remove()

    return card
}

function initCounter() {
    const data = sessionStorage.getItem(STORAGE)
    if (data) {
        cart = JSON.parse(data)
    }
    updateCount()
}

function buy(obj) {
    console.log('Добавить в корзину:', obj.title, obj.id)

    const check = cart.some((product) => {
        return product.id == obj.id
    })

    if (!check) {
        cart.push({ ...obj, count: 1 })
        sessionStorage.setItem(STORAGE, JSON.stringify(cart))
        updateCount()
    } else {
        console.warn('Найден в корзине')
    }
}

function updateCount() {
    console.log('Обновление счетчика корзины:', cart.length)
    if (!cart.length) cartCounter.classList.add('displaynone')
    else cartCounter.classList.remove('displaynone')
    cartCounter.textContent = cart.length
}
