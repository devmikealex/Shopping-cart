export default function createFullPrice() {
    const card = document.createElement('div')
    card.classList = 'total-price-card'

    const html = `

    <div class="full-price">
        <div class="full-price__title">Итого</div>
        <div id="full-price-count" class="full-price__price">₽ 2 927</div>
    </div>
    <a class="full-price__btn" href="/payment">Перейти к оформлению</a>
`

    card.insertAdjacentHTML('afterbegin', html)
    return card
}
