import { cart, deleteFromCart, newFullPrice, updateStore } from './main.js'

export function createLongCard(obj) {
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
        <div class="price-current">${price.toLocaleString()} ₽</div>
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

    card.querySelector(`#${id}-delete`).addEventListener('click', () =>
        deleteFromCart(id)
    )

    card.querySelector(`#${id}-plus`).addEventListener('click', () => {
        PlusMinus('plus', id)
    })

    card.querySelector(`#${id}-minus`).addEventListener('click', () => {
        PlusMinus('minus', id)
    })

    return card

    function PlusMinus(mode, id) {
        const index = cart.findIndex((product) => product.id === id)
        if (mode == 'plus') {
            console.log('Прибавить:', id)
            ++cart[index].count
        } else {
            console.log('Уменьшить:', id)
            if (cart[index].count > 1) --cart[index].count
        }
        card.querySelector(`#${id}-cart-counter`).textContent = cart[index].count
        newCardPrice(id, cart[index].count * price)
        newFullPrice()
        updateStore()
    }

    function newCardPrice(id, price) {
        card.querySelector(`#${id}-card-full-price`).textContent = price.toLocaleString() + ' ₽'
    }
}
