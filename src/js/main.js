const ui = {
    // "содержание", ссылки в "содержании", заголовки статьей
    contentsRoot: document.querySelectorAll('.contents')[0],
    links: undefined,
    titles: document.querySelectorAll('.article-title'),
    article: document.querySelectorAll('.article'),

    // заголовки и подзаголовки в статье
    contentsList: document.querySelectorAll('.contents__list')[0],
    headers: document.querySelectorAll('.article h2,.article h3')
}

/**
 * Автоматическое наполнение содержания и расстановка id заголовков в контентной части
 */
/*
Пример:

<ul class="contents__list">
    <li class="contents__item"><a class="anchor" href="#article-anchor-1">Бизнес-центр Dominion Tower</a></li>
    <li class="contents__item"><a href="#article-anchor-2">Бизнес-центр «Белая площадь»</a></li>
    <li class="contents__item"><a href="#article-anchor-3">Для чего бизнес-центрам хороший дизайн</a>
        <ul class="contents__list--sub">
            <li class="contents__item contents__item--sub"><a href="#article-anchor-4">Современный бизнес</a></li>
            <li class="contents__item contents__item--sub"><a href="#article-anchor-5">Важность дизайна</a></li>
        </ul>
    </li>
</ul>
 */
function initContentsMenu() {
    // счетчик для id-заголовков
    let i = 1;

    // элемент-родитель, в который будут добавляться новые пункты содержания
    // это может быть как главный список, как и элементы списка с подпунктами
    let parent = ui.contentsList;
    console.log(parent);

    // последний созданный элемент содержания
    let lastElement;

    for (const header of ui.headers) {
        // новый id
        const newId = 'article-anchor-' + i;
        header.setAttribute('id', newId);

        // текст и тип заголовка статьи
        const text = header.innerHTML;
        const type = header.tagName;

        if (type === 'H2') {
            parent = ui.contentsList;

            parent.insertAdjacentHTML('beforeend', `
                <li class="contents__item"><a class="anchor" href="#${newId}">${text}</a></li>
            `);

            lastElement = parent.lastElementChild;
        }
        else if (type === 'H3') {
            lastElement.insertAdjacentHTML('beforeend', '<ul class="contents__list--sub"></ul>');
            parent = lastElement.lastElementChild;

            parent.insertAdjacentHTML('beforeend', `
                <li class="contents__item contents__item--sub"><a href="#${newId}">${text}</a></li>
            `);
        }

        i++;
    }
}

/**
 *  поведение "содержания" при прокрутке страницы
 */
function initContentsMenuBehaviour() {
    ui.links = document.querySelectorAll('.contents li');
    ui.arrayTitles = [...ui.headers].slice().reverse();

    document.addEventListener('scroll', function () {
        const top = window.scrollY;

        if (top >= 220) {
            ui.contentsRoot.setAttribute('data-scroll', '1');
        } else {
            ui.contentsRoot.removeAttribute('data-scroll');
            ui.links.forEach(link => {
                link.removeAttribute('data-type');
            });
        }

        // scroll spy
        ui.arrayTitles.some(title => {
            const topTitle = title.getBoundingClientRect().top;

            if (topTitle <= ui.contentsRoot.offsetHeight) {
                ui.links.forEach(link => {
                    link.removeAttribute('data-type');
                });

                ui.contentsRoot.querySelector(`li a[href="#${title.id}"]`).closest('li').setAttribute('data-type', 'active');
                return true;
            }

            ui.links.forEach(link => {
                link.removeAttribute('data-type');
            });
            return false;
        });
    });
}


initContentsMenu();
initContentsMenuBehaviour();


// -------------------------------------------------------------------
/**
 * carousel
 */
const popularCarousel = new Carousel(document.querySelector(".popular .carousel"), {
    'center' : true,
    'slidesPerPage' : 1
});


const similarCarousel = new Carousel(document.querySelector(".similar .carousel"), {
    'center' : true,
    'slidesPerPage': 'auto',
});