// UI


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
});

// Contact Modal
$("#contact-button").click(() => {
    $(".contact-modal").fadeIn(1000);
    $(".contact-modal").css("display", "flex");
    $("html, body").addClass("no-scroll");
});

$(".contact-modal i").click(() => {
    $(".contact-modal").fadeOut(1000);
    $("html, body").removeClass("no-scroll")
});


// Navbar

$(".navbar-icon").click(() => {
    $(".navbar-icon").toggleClass("active")
    $(".navbar-menu").toggleClass("active")
})

// Loader

const showLoader = () => {
    $(".loader").fadeIn(1000)
}

const hideLoader = () => {
    $(".loader").fadeOut(1000)
}


if (window.location.pathname.includes("/projects/index.html")) {
    window.onload = (event) => {
        hideLoader()
    };
}
