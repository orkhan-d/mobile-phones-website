phones = [
    {
        id: 1,
        img: 'TelShopMedia/1.jpg',
        name: '4" Смартфон DEXP A440 8 ГБ розовый',
        price: 3200,
        discount: null,
        ram: 1,
        rom: 8,
        maker: 'DEXP'
    },
    {
        id: 2,
        img: 'TelShopMedia/2.jpg',
        name: 'Samsung Galaxy M52',
        price: 40999,
        discount: 4,
        ram: 6,
        rom: 256,
        maker: 'Samsung'
    },
    {
        id: 3,
        img: 'TelShopMedia/3.jpg',
        name: 'Смартфон POCO F3 Черный',
        price: 32999,
        discount: null,
        ram: 6,
        rom: 128,
        maker: 'POCO'
    },
    {
        id: 4,
        img: 'TelShopMedia/4.jpg',
        name: 'Смартфон POCO F3 Белый',
        price: 34999,
        discount: 6,
        ram: 6,
        rom: 128,
        maker: 'POCO'
    },
];

let cart = [];

let phones_to_show = phones.map(a => {return {...a}});

generate_html = () => {

    const html = phones_to_show.map(
        phone => `
        <div class="phone shadow">
            ${ phone.discount ? `<div class="discount">Скидка ${phone.discount}%</div>` : ''}
            <img src="${phone.img}" alt="">
            <p class="phone-name">${phone.name}</p>
            <div class="phone-prop">
                <p class="prop-name">Встроенная память</p>
                <p class="prop-value rom">${phone.rom} ГБ</p>
            </div>
            <div class="phone-prop">
                <p class="prop-name">Оперативная память</p>
                <p class="prop-value">${phone.ram} ГБ</p>
            </div>
            <div class="phone-prop">
                <p class="prop-name">Производитель</p>
                <p class="prop-value">${phone.maker}</p>
            </div>
            <div class="phone-prop">
                <p class="prop-name">Цена</p>
                <div class="prop-value">
                    <div class="prices">
                        ${
                            phone.discount ?
                            `
                            <p class="phone-prop old-price">${phone.price}</p>
                            <p class="phone-prop new-price">${Math.ceil(phone.price*(1-phone.discount/100))}</p>
                            `
                            :
                            `
                            <p class="phone-prop price">${phone.price}</p>
                            <br>
                            `
                        }
                    </div>
                </div>
            </div>
            <div class="controls" data-phone-id="${phone.id}">
                ${
                    (cart.filter(obj => obj.phoneId==phone.id).length>0 ? cart.filter(obj => obj.phoneId==phone.id)[0].amount : 0>0) ?
                        `
                            <button class="btn del-btn" data-phone-id="${phone.id}">-</button>
                            <p>${cart.filter(obj => obj.phoneId==phone.id).length>0 ? cart.filter(obj => obj.phoneId==phone.id)[0].amount : 0}</p>
                            <button class="btn add-btn" data-phone-id="${phone.id}">+</button>
                        `
                    :
                        `<button class="btn add-to-cart-btn" data-phone-id="${phone.id}">Добавить в корзину</button>`
                }
            </div>
        </div>
        `
    );
    const phones_grid = document.getElementById('phones');
    phones_grid.innerHTML = html.join('');

    const add_btns = document.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            cart.filter(obj => obj.phoneId==event.target.dataset.phoneId)[0].amount++;
            generate_html();
            document.querySelector('.cart-amount').innerText = cart.map(c => c.amount).reduce((a, b) => a+b, 0);
        });
    });
    const del_btns = document.querySelectorAll('.del-btn').forEach(btn => {
        btn.addEventListener('click', (event) => {
            cart.filter(obj => obj.phoneId==event.target.dataset.phoneId)[0].amount--;
            cart = cart.filter(c => c.amount>0);

            generate_html();
            document.querySelector('.cart-amount').innerText = cart.map(c => c.amount).reduce((a, b) => a+b, 0);
        });
    });

    const add_to_cart_btns = document.querySelectorAll('.add-to-cart-btn');
    [...add_to_cart_btns].forEach(btn => {
        btn.addEventListener('click', (event) => {
            if (cart.filter(obj => obj.phoneId==event.target.dataset.phoneId).length>0) {
                cart.filter(obj => obj.phoneId).forEach(obj => obj.amount++)
            } else {
                cart.push({
                    phoneId: event.target.dataset.phoneId,
                    phone: [...phones].filter(phone => phone.id==event.target.dataset.phoneId)[0],
                    amount: 1
                });
            }

            generate_html();
            document.querySelector('.cart-amount').innerText = cart.map(c => c.amount).reduce((a, b) => a+b, 0);
        });
    })
};

generate_html();

let from_price = document.querySelector('.from-price');
let to_price = document.querySelector('.to-price');
let from_rom = document.querySelector('.from-rom');
let to_rom = document.querySelector('.to-rom');
let from_ram = document.querySelector('.from-ram');
let to_ram = document.querySelector('.to-ram');
let only_discounted = document.querySelector('.only-discounted');
let makers = [...document.querySelectorAll('.maker')];

const check_price = (phone_price) => {
    return (!from_price.value || phone_price >= Number(from_price.value)) &&
    (!to_price.value || phone_price <= Number(to_price.value))
}

const check_rom = (phone_rom) => {
    return (!from_rom.value || phone_rom >= Number(from_rom.value)) &&
    (!to_rom.value || phone_rom <= Number(to_rom.value))
}

const check_ram = (phone_ram) => {
    return (!from_ram.value || phone_ram >= Number(from_ram.value)) &&
    (!to_ram.value || phone_ram <= Number(to_ram.value))
}

const apply_filters = () => {
    phones_to_show = phones.filter(phone => (
        check_price(phone.price) && 
        check_rom(phone.rom) &&
        check_ram(phone.ram) &&
        makers.filter(cb => cb.checked).map(cb => cb.name).includes(phone.maker) &&
        (!only_discounted.checked || phone.discount)
    ));

    
    if (search.value!="") {
        apply_filters();
    }{
        phones_to_show = [...phones_to_show].filter(
            phone => phone.name.includes(search.value)
        );
        generate_html();
    }

    generate_html();
};

const reset_filters = () => {
    from_price.value = "";
    to_price.value = "";
    from_rom.value = "";
    to_rom.value = "";
    from_ram.value = "";
    to_ram.value = "";
    only_discounted.checked = false;
    makers.forEach(element => {
        element.checked = true
    });
};

const apply_filters_btn = document.querySelector('.apply-filters-btn');
const reset_filters_btn = document.querySelector('.reset-filters-btn');

apply_filters_btn.addEventListener('click', () => {
    apply_filters();
});
reset_filters_btn.addEventListener('click', () => {
    reset_filters();
});

const search = document.querySelector('.search');
const sort_select = document.querySelector('#sort');

sort_select.addEventListener('change', (event) => {
    switch (event.target.value) {
        case "price-asc":
            phones_to_show = [...phones_to_show].sort(
                (p1, p2) => p1.price-p2.price
            );
            break;
        case "price-desc":
            phones_to_show = [...phones_to_show].sort(
                (p1, p2) => p2.price-p1.price
            );
            break;
        case "date-asc":
            phones_to_show = [...phones_to_show].sort(
                (p1, p2) => p1.id-p2.id
            );
            break;
        case "date-desc":
            phones_to_show = [...phones_to_show].sort(
                (p1, p2) => p2.id-p1.id
            );
            break;
        default:
            break;
    }
    generate_html();
});

search.addEventListener('input', () => {
    if (search.value=="") {
        apply_filters();
    }
    else{
        phones_to_show = [...phones_to_show].filter(
            phone => phone.name.includes(search.value)
        );
        generate_html();
    }
});

const modal = document.querySelector('.modal');
modal.addEventListener('click', (event) => {
    if (event.target==modal) {
        modal.style.display = 'none';
    }
});

document.querySelector('.cart').addEventListener('click', (event) => {
    modal.style.display = 'block';
    const amount = cart.map(c => c.amount).reduce((a, b) => a+b, 0);
    const sum = cart.map(c => c.phone.price*c.amount).reduce((a, b) => a+b, 0);
    const cart_html = `<div class="cart-wrapper">`+cart.map(
        phone => `
        <div class="cart-phone shadow">
            <img src="${phone.phone.img}" alt="">
            <p class="phone-name">${phone.phone.name}</p>
            <div class="prices">
                ${
                    phone.phone.discount ?
                    `
                    <p class="phone-prop old-price">${phone.phone.price}</p>
                    <p class="phone-prop new-price">${Math.ceil(phone.phone.price*(1-phone.phone.discount/100))}</p>
                    `
                    :
                    `
                    <p class="phone-prop price-cart">${phone.phone.price}</p>
                    `
                }
            </div>
            <p class="phone-name">${phone.amount} штук</p>
        </div>
        `
    ).join('')+`
    </div>
    <div class="grid-cart-all">
        <p>${amount} товаров на сумму ${sum}</p>
        <button class="btn">Купить</button>
    </div>`
    document.querySelector('.modal-win').innerHTML+=cart_html;
});