// ANIMATIONS


// Scroll To Top Button

const scrollToTop = () => {
    $(document).scrollTop(0)
}

$(document).scroll(() => {
    if ($(document).scrollTop() > 200) {
        $(".scroll-top-button").fadeIn(1000)
    } else {
        $(".scroll-top-button").fadeOut(1000)
    }
})