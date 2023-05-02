import mainProducts from './products.js'

const STORAGE = 'CART_TEST'

let cart = []

const output = document.querySelector('#output')
const cartCounter = document.querySelector('#cart-counter')

initCounter()
initMainPage()
// initCartPage()

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
        cart.push(obj)
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
