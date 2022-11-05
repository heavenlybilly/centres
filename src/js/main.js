const ui = {
    // "содержание", ссылки в "содержании", заголовки статьей
    contentsRoot: document.querySelectorAll('.contents')[0],
    links: document.querySelectorAll('.contents li'),
    titles: document.querySelectorAll('.article-title'),
}

ui.arrayTitles = [...ui.titles].slice().reverse();

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
            link.classList.remove('active');
        });
    }

    // scroll spy
    ui.arrayTitles.some(title => {
        const topTitle = title.getBoundingClientRect().top;

        if (topTitle <= 400) {
            ui.links.forEach(link => {
                link.classList.remove('active');
            });

            ui.contentsRoot.querySelector(`li a[href="#${title.id}"]`).closest('li').classList.add('active');
            return true;
        }

        ui.links.forEach(link => {
            link.classList.remove('active');
        });
        return false;
    });
});


/**
 * carousel
 */
const myCarousel = new Carousel(document.querySelector(".carousel"), {
    'center' : true,
    'slidesPerPage' : 1
});