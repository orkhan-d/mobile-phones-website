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
            <button class="btn">Добавить в корзину</button>
        </div>
        `
    );
    const phones_grid = document.getElementById('phones');
    phones_grid.innerHTML = html.join('');
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
    console.log(Boolean(only_discounted.value));
    phones_to_show = phones.filter(phone => (
        check_price(phone.price) && 
        check_rom(phone.rom) &&
        check_ram(phone.ram) &&
        makers.filter(cb => cb.checked).map(cb => cb.name).includes(phone.maker) &&
        (!only_discounted.checked || phone.discount)
    ));

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
    console.log('filters applied');
    apply_filters();
});
reset_filters_btn.addEventListener('click', () => {
    console.log('filters resetted');
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

})