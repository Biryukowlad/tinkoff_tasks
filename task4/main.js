class Card {
    constructor(id, name, desc, link, code, provider) {
        this.id = id
        this.name = name;
        this.link = link;
        this.description = desc;
        this.code = code;
        this.provider = provider;
    }
}

function loaderVisible() {
    document.getElementById('loader_id').classList.remove('invisible');
    document.getElementById('nonclick-overlay').classList.add('nonclick-overlay');
}

function loaderInvisible() {
    document.getElementById('loader_id').classList.add('invisible');
    document.getElementById('nonclick-overlay').classList.remove('nonclick-overlay');
}

function skeletonVisible() {
    document.getElementById('skeleton').classList.remove('invisible');
}

function skeletonInvisible() {
    document.getElementById('skeleton').classList.add('invisible');
}

function cardsVisible() {
    let cards = document.getElementsByClassName('list-block_card');
    for (let one_card of cards) {
        one_card.classList.remove('invisible');
    }
}

function cardsInvisible() {
    let cards = document.getElementsByClassName('list-block_card');
    for (let one_card of cards) {
        one_card.classList.add('invisible');
    }
}

function buildCardHTML(card, i) {
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
    card_id_h2.textContent = `id: ${card.code}`;
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
    card_change_button.setAttribute('class', "primary-button");
    card_change_button.textContent = `Изменить`;
    card_change_button.addEventListener('click', fillForm);
    card_change_button.change_id = card.id;
    document.getElementById(`card_buttons${i}`).appendChild(card_change_button);

    const card_delete_button = document.createElement("button");
    card_delete_button.id = `card_delete${i}`;
    card_delete_button.setAttribute('class', "primary-button");
    card_delete_button.textContent = `Удалить`;
    card_delete_button.addEventListener('click', deleteCard);
    card_delete_button.delete_id = card.id;
    document.getElementById(`card_buttons${i}`).appendChild(card_delete_button);
}

const banana = new Card(11111, "Банан", "Есть много вариантов использования", "https://m.media-amazon.com/images/I/51fGLlXrH+L._AC_UL960_QL65_.jpg", 1, "Африка");
const watermelon = new Card(22222, "Арбуз", "Блин, такой вкусный просто ужас, мне его папа привез с отпуска, наконец-то ему дали отпуск", "http://kartinkof.club/uploads/posts/2022-04/1649964730_32-kartinkof-club-p-arbuz-kartinki-prikolnie-34.jpg", 2, "Соль-Илецк");
const peach = new Card(33333, "Персик", "Без комментариев.", "https://i.pinimg.com/originals/f1/f2/72/f1f2727b671e396efeb454599b834767.jpg", 3, "РОССИЯ");
const its_me = new Card(44444, "Это я", "А почему среди фруктов овощ?", "https://sun9-7.userapi.com/impf/RlqEq29b6p006ZqrbWmnk3kuC1RKtYPDQLiwDQ/vwYFibwv6xs.jpg?size=1620x2160&quality=95&sign=e5f9f276e43983ee03b0ab2d59dbf788&type=album", 4, "Моя мама");

async function uploadCards() {
    loaderVisible();
    const arr = [banana, watermelon, peach, its_me];
    let cards = document.getElementsByClassName('list-block_card');
    if (!cards.length) skeletonVisible();
    await deleteAllCards();
    try {
        for (let c = 0; c < arr.length;) {
            await fetch('http://localhost:3000/items', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(arr[c])}).then(++c);
        }
    }
    catch(e) {
        alert("Или что-то пошло не так, или кто-то поленился добавить карточки\n" + e);
    }
    getCards();
    loaderInvisible();
    skeletonInvisible();
}

async function deleteAllCards() {
    loaderVisible();
    try {
        let cards = await fetch('http://localhost:3000/items').then((result) => result.json());
        for (let c = 0; c < cards.length;) {
            await fetch(`http://localhost:3000/items/${cards[c].id}`, {
                method: 'DELETE'
            }).then(++c)
        }
    }
    catch(e) {
        alert("Что-то пошло не так при удалении всех карточек\n" + e);
    }
    loaderInvisible();
}

async function serializeForm(formNode, obj) {
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
                card.code = value;
                break;
            case 'provider':
                card.provider = value;
                break;
            default:
                break;
        }
    }
    if (card.code < 0) {
        alert("Пожалуйста введите неотрицательный code!");
        return;
    }
    if (!card.name || !card.link || !card.description || !card.code || !card.provider) {
        alert("Пожалуйста заполните все поля!");
        return;
    }
    return card;
}

async function randomId() {
    return Math.floor(Math.random() * 100000);
}

async function addCard() {
    loaderVisible();
    let cards = document.getElementsByClassName('list-block_card');
    if (!cards.length) skeletonVisible();
    const card = await serializeForm(cardForm, new Card());
    card.id = await randomId();
    try {
        await fetch('http://localhost:3000/items', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(card)
        }).then(buildCardHTML(card, cards.length));
    }
    catch(e) {
        alert("Что-то пошло не так при добавлении карточки\n" + e);
    }
    loaderInvisible();
    skeletonInvisible()
}

async function deleteCard(event) {
    loaderVisible();
    try {
        await fetch(`http://localhost:3000/items/${event.target.delete_id}`, {
            method: 'DELETE'
        }).then(() => location.reload());
    }
    catch(e) {
        alert("Что-то пошло не так при удалении карточки\n" + e);
    }
    loaderInvisible();
}

async function fillForm(event) {
    try {
        let card = await fetch(`http://localhost:3000/items/${event.target.change_id}`).then((result) => result.json());
        document.getElementsByName('name')[0].value = card.name;
        document.getElementsByName('description')[0].value = card.description;
        document.getElementsByName('link')[0].value = card.link;
        document.getElementsByName('code')[0].value = card.code;
        document.getElementsByName('provider')[0].value = card.provider;
        document.getElementById('add-button').classList.add('invisible');
        document.getElementById('change-button').classList.remove('invisible');
        document.getElementById('change-button').change_id = card.id;
    }
    catch(e) {
        alert("Что-то пошло не так при GET запросе для заполнения формы\n" + e);
    }
}

async function changeCard(event) {
    loaderVisible();
    const card = await serializeForm(cardForm, new Card());
    try {
        await fetch(`http://localhost:3000/items/${event.target.change_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(card)
        }).then(() => {
            document.getElementById('add-button').classList.remove('invisible');
            document.getElementById('change-button').classList.add('invisible');
            //location.reload()
            getCards()
        });
    }
    catch(e) {
        alert("Что-то пошло не так при изменении карточки\n" + e);
    }
    loaderInvisible();
}

async function getCreator() {
    try {
        let creator = await fetch('http://localhost:3000/creatorInfo').then((result) => result.json());
        document.getElementById('title-text_id').textContent = creator.name + " " + creator.group;
    } catch (e) {
        alert("Что-то пошло не так при заполнении информации о создателе\n" + e);
    }
}

async function getCards() {
    loaderVisible();
    try {
        let cards = await fetch('http://localhost:3000/items').then((result) => result.json());
        let i = 0;
        for (let card of cards){
            buildCardHTML(card, i);
            ++i;
        }
    } catch (e) {
        alert("Что-то пошло не так при GET запросе карточек\n" + e);
    }
    loaderInvisible();
}

const cardForm = document.getElementById('card-form');
const uploadButton = document.getElementById('upload-button');
const deleteAllButton = document.getElementById('delete_all-button');
const addButton = document.getElementById('add-button');
const changeButton = document.getElementById('change-button');
uploadButton.addEventListener('click', uploadCards);
deleteAllButton.addEventListener('click', deleteAllCards);
addButton.addEventListener('click', addCard);
changeButton.addEventListener('click', changeCard);
getCreator();
getCards();