phones = [
    {
        img: 'TelShopMedia/1.jpg',
        name: '4" Смартфон DEXP A440 8 ГБ розовый',
        price: 3200,
        discount: null,
        ram: 1,
        rom: 8,
        maker: 'DEXP'
    },
    {
        img: 'TelShopMedia/2.jpg',
        name: 'Samsung Galaxy M52',
        price: 40999,
        discount: 4,
        ram: 6,
        rom: 256,
        maker: 'Samsung'
    },
    {
        img: 'TelShopMedia/3.jpg',
        name: 'Смартфон POCO F3 Черный',
        price: 32999,
        discount: null,
        ram: 6,
        rom: 128,
        maker: 'POCO'
    },
    {
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
            <button class="add-to-cart">Добавить в корзину</button>
        </div>
        `
    );
    const phones_grid = document.getElementById('phones');
    phones_grid.innerHTML = html.join('');
};

generate_html();

const from_price = document.querySelector('.from-price');
const to_price = document.querySelector('.to-price');

const from_rom = document.querySelector('.from-rom');
const to_rom = document.querySelector('.to-rom');

const makers = document.querySelectorAll('.maker');
makers.forEach(cb => {
    cb.addEventListener(
        'change', () => {
            filter_results()
        }
    )
});

const filter_results = () => {
    let checkeds = Object.values(makers).filter(cb => cb.checked).map(cb => cb.value);

    phones_to_show = phones.filter(phone => (
        (from_price.value ? phone.price >= Number(from_price.value) : true) &&
        (to_price.value ? phone.price <= Number(to_price.value) : true) &&
        (from_rom.value ? phone.rom >= Number(from_rom.value) : true) &&
        (to_rom.value ? phone.rom <= Number(to_rom.value) : true) &&
        checkeds.includes(phone.maker)
    ));

    generate_html();
};

from_price.addEventListener(
    'input',
    () => {
        filter_results()
    }
);
to_price.addEventListener(
    'input',
    () => {
        filter_results()
    }
);
from_rom.addEventListener(
    'input',
    () => {
        filter_results()
    }
);
to_rom.addEventListener(
    'input',
    () => {
        filter_results()
    }
);