class Card {
    constructor(name, desc, link, id, provider) {
        this.name = name;
        this.link = link;
        this.description = desc;
        this.id = id;
        this.provider = provider;
    }
}

function renderCards() {
    const cards = JSON.parse(window.localStorage.getItem("cards")) || [];
    let i = 0;
    for (let card of cards) {
        const card_div = document.createElement("div");
        card_div.id = `card${i}`;
        card_div.setAttribute('class', "list-block_card");
        document.getElementsByClassName("list-block_cards")[0].appendChild(card_div);

        const image_div = document.createElement("img");
        image_div.id = `card_image${i}`;
        image_div.setAttribute('class', "list-block_card__image");
        image_div.src = `${card.link}`;
        document.getElementById(`card${i}`).appendChild(image_div);

        const card_content_div = document.createElement("div");
        card_content_div.id = `card_content${i}`;
        card_content_div.setAttribute('class', "list-block_card_content");
        document.getElementById(`card${i}`).appendChild(card_content_div);

        const card_title_div = document.createElement("div");
        card_title_div.id = `card_title${i}`;
        card_title_div.setAttribute('class', "list-block_card_content__title");
        document.getElementById(`card_content${i}`).appendChild(card_title_div);

        const card_name_h2 = document.createElement("h2");
        card_name_h2.id = `card_name${i}`;
        card_name_h2.textContent = `${card.name}`;
        document.getElementById(`card_title${i}`).appendChild(card_name_h2);

        const card_id_h2 = document.createElement("h2");
        card_id_h2.id = `card_id${i}`;
        card_id_h2.textContent = `id: ${card.id}`;
        document.getElementById(`card_title${i}`).appendChild(card_id_h2);

        const card_description_p = document.createElement("p");
        card_description_p.id = `card_description${i}`;
        card_description_p.setAttribute('class', "list-block_card_content__description");
        card_description_p.textContent = `${card.description}`;
        document.getElementById(`card_content${i}`).appendChild(card_description_p);

        const card_provider_p = document.createElement("p");
        card_provider_p.id = `card_provider${i}`;
        card_provider_p.setAttribute('class', "list-block_card_content__provider");
        card_provider_p.textContent = `${card.provider}`;
        document.getElementById(`card_content${i}`).appendChild(card_provider_p);

        const card_buttons_div = document.createElement("div");
        card_buttons_div.id = `card_buttons${i}`;
        card_buttons_div.setAttribute('class', "list-block_card_buttons");
        document.getElementById(`card${i}`).appendChild(card_buttons_div);

        const card_change_button = document.createElement("button");
        card_change_button.id = `card_change${i}`;
        card_change_button.setAttribute('class', "list-block_card__button");
        card_change_button.textContent = `Изменить`;
        card_change_button.addEventListener('click', fillForm);
        card_change_button.pos = i;
        document.getElementById(`card_buttons${i}`).appendChild(card_change_button);

        const card_delete_button = document.createElement("button");
        card_delete_button.id = `card_delete${i}`;
        card_delete_button.setAttribute('class', "list-block_card__button");
        card_delete_button.textContent = `Удалить`;
        card_delete_button.addEventListener('click', deleteCard);
        card_delete_button.pos = i;
        document.getElementById(`card_buttons${i}`).appendChild(card_delete_button);

        ++i;
    } 
}

function uploadCards() {
    const banana = new Card("Банан", "Есть много вариантов использования", "https://m.media-amazon.com/images/I/51fGLlXrH+L._AC_UL960_QL65_.jpg", 1, "Африка");
    const watermelon = new Card("Арбуз", "Блин, такой вкусный просто ужас, мне его папа привез с отпуска, наконец-то ему дали отпуск", "http://kartinkof.club/uploads/posts/2022-04/1649964730_32-kartinkof-club-p-arbuz-kartinki-prikolnie-34.jpg", 2, "Соль-Илецк");
    const peach = new Card("Персик", "Без комментариев.", "https://i.pinimg.com/originals/f1/f2/72/f1f2727b671e396efeb454599b834767.jpg", 3, "РОССИЯ");
    const its_me = new Card("Это я", "А почему среди фруктов овощ?", "https://sun9-7.userapi.com/impf/RlqEq29b6p006ZqrbWmnk3kuC1RKtYPDQLiwDQ/vwYFibwv6xs.jpg?size=1620x2160&quality=95&sign=e5f9f276e43983ee03b0ab2d59dbf788&type=album", 4, "Моя мама");
    const arr = [banana, watermelon, peach, its_me];
    try {
        window.localStorage.clear();
        window.localStorage.setItem('cards', JSON.stringify(arr));
        location.reload();
    } catch {
        alert("Или что-то пошло не так, или кто-то поленился добавить карточки");
    }
}

function serializeForm(formNode, obj) {
    const data = Array.from(new FormData(formNode).entries());
    let card = obj;
    for (let i = 0; i < data.length; ++i) {
        const [key, value] = data[i];
        switch (key) {
            case 'name':
                card.name = value;
                break;
            case 'description':
                card.description = value;
                break;
            case 'link':
                card.link = value;
                break;
            case 'code':
                card.id = value;
                break;
            case 'provider':
                card.provider = value;
                break;
            default:
                break;
        }
    }
    if (card.id < 0) {
        alert("Пожалуйста введите неотрицательный id!");
        return 0;
    }
    if (!card.name || !card.link || !card.description || !card.id || !card.provider) {
        alert("Пожалуйста заполните все поля!");
        return 0;
    }
    return card;
}

function addCard() {
    const card = serializeForm(cardForm, new Card());
    if (card) {
        const cards = JSON.parse(window.localStorage.getItem("cards")) || [];
        cards.push(card);
        window.localStorage.clear();
        window.localStorage.setItem('cards', JSON.stringify(cards));
    }
}

function deleteCard(event) {
    const cards = JSON.parse(window.localStorage.getItem("cards")) || [];
    cards.splice(event.target.pos, 1);
    window.localStorage.setItem('cards', JSON.stringify(cards));
    location.reload();
}

function fillForm(event) {
    const cards = JSON.parse(window.localStorage.getItem("cards")) || [];
    const card = cards[event.target.pos];
    document.getElementsByName('name')[0].value = card.name;
    document.getElementsByName('description')[0].value = card.description;
    document.getElementsByName('link')[0].value = card.link;
    document.getElementsByName('code')[0].value = card.id;
    document.getElementsByName('provider')[0].value = card.provider;
    document.getElementById('add-button').classList.add('invisible');
    document.getElementById('change-button').classList.remove('invisible');
    document.getElementById('change-button').pos = event.target.pos;
}

function changeCard(event) {
    const cards = JSON.parse(window.localStorage.getItem("cards")) || [];
    const card = serializeForm(cardForm, cards[event.target.pos]);
    if (card) {
        cards[event.target.pos] = card;
        window.localStorage.clear();
        window.localStorage.setItem('cards', JSON.stringify(cards));
        document.getElementById('add-button').classList.remove('invisible');
        document.getElementById('change-button').classList.add('invisible');
    }
}

const cardForm = document.getElementById('card-form');
const uploadButton = document.getElementById('upload-button');
const addButton = document.getElementById('add-button');
const changeButton = document.getElementById('change-button');
uploadButton.addEventListener('click', uploadCards);
addButton.addEventListener('click', addCard);
changeButton.addEventListener('click', changeCard);
window.onload = renderCards;