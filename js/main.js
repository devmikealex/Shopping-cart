import mainProducts from './products.js'
import { createCard } from './createCard.js'
import { createLongCard } from './createLongCard.js'
import createFullPrice from './createFullPrice.js'

export const STORAGE = 'CART_TEST'

export let cart = []

const output = document.querySelector('#output')
const cartCounter = document.querySelector('#cart-counter')

initCart()

// switch (window.location.pathname) {
//     case '/':
//     case '/index.html':
//         console.log('Главная страница');
//         initMainPage()
//         document.title = 'QPICK - Products'
//         break
//     case '/cart.html':
//         console.log('Корзина');
//         document.title = 'QPICK - Cart'
//         initCartPage()
//         break
//     default:
//         console.error('Необработанный адрес!');
//         break
// }

if (window.location.pathname.includes('/cart.html')) {
    console.log('Корзина');
    document.title = 'QPICK - Cart'
    initCartPage()
} else {
    console.log('Главная страница');
    document.title = 'QPICK - Products'
    initMainPage()
}

// ----------

export function initCartPage() {
    const newSection = document.createElement('section')
    const html = `
<h2 class="h2-dark">Корзина</h2>
<div class="long-cards"></div>`
    newSection.insertAdjacentHTML('afterbegin', html)

    const longCards = newSection.querySelector('.long-cards')

    if (cart.length) {
        cart.forEach((product) => {
            // console.log(product)
            const testCard = createLongCard(product)
            longCards.append(testCard)
        })
    } else {
        longCards.append('Корзина пуста')
    }

    output.innerHTML = ''
    output.appendChild(newSection)

    const fullPrice = createFullPrice()
    output.prepend(fullPrice)
    document.querySelector('#output').style = "position: relative;"

    newFullPrice()
    updateCount()
}

export function initMainPage() {
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

function initCart() {
    const data = sessionStorage.getItem(STORAGE)
    if (data) {
        cart = JSON.parse(data)
    }
    updateCount()
}

export function deleteFromCart(id) {
    console.log('Удалить:', id)
    cart = cart.filter((product) => product.id !== id)
    updateStore()
    initCartPage()
    // newFullPrice()
}

export function updateCount() {
    console.log('Обновление счетчика корзины:', cart.length)
    if (!cart.length) cartCounter.classList.add('displaynone')
    else cartCounter.classList.remove('displaynone')
    cartCounter.textContent = cart.length
}

export function newFullPrice() {
    let price = 0
    cart.forEach((product) => {
        price += product.price * product.count
    })
    document.querySelector('#full-price-count').textContent = '₽ ' + price.toLocaleString()
}

export function updateStore() {
    sessionStorage.setItem(STORAGE, JSON.stringify(cart))
    updateCount()
}

export function buy(obj) {
    console.log('Добавить в корзину:', obj.title, obj.id)

    const check = cart.some((product) => {
        return product.id == obj.id
    })

    if (!check) {
        cart.push({ ...obj, count: 1 })
        updateStore()
    } else {
        console.warn('Найден в корзине')
    }
}
