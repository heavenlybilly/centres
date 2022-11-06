const ui = {
    // "содержание", ссылки в "содержании", заголовки статьей
    contentsRoot: document.querySelectorAll('.contents')[0],
    links: document.querySelectorAll('.contents li'),
    titles: document.querySelectorAll('.article-title'),
}

ui.arrayTitles = [...ui.titles].slice().reverse();

console.log(ui)

/**
 *  поведение "содержания" при прокрутке страницы
 */
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

        if (topTitle <= ui.contentsRoot.offsetHeight + 50) {
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