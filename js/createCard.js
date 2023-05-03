import {buy} from './main.js'

export function createCard(obj) {
    const { title, id, price, priceOld, rating } = obj

    const card = document.createElement('div')
    card.classList = 'card'

    const html = `
<div class="card__image"><img src="./assets/photo/${id}.png" alt="${title}"></div>
<div class="card__content">
    <div class="card__line">
        <h4><a href="./products/${id}">${title}</a></h4>
        <div class="price">
            <div class="price-current">${price.toLocaleString()} ₽</div>
            <div class="price-old">${priceOld.toLocaleString()} ₽</div>
        </div>
    </div>
    <div class="card__line">
        <div class="rating">
            <img src="./assets/icons/star.svg" alt="">${rating}</div>
        <button id="${id}-buy">Купить</button>
    </div>
</div>`

    card.insertAdjacentHTML('afterbegin', html)
    card.querySelector('button').addEventListener('click', (e) => {
        e.target.classList.add('inactive-buy-btn')
        buy(obj)})

    if (!priceOld) card.querySelector('.price-old').remove()

    return card
}

