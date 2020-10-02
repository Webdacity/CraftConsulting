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

$(document).ready(function () {
    hideLoader()
});


// Projects

$(".project-types p").click(function () {
    $(".project-types p").removeClass("active")
    $(this).addClass("active");
    updateProjectsGrid($(this).html());
});

const updateProjectsGrid = (type) => {
    let projectType = type.toLowerCase();
    projectType = projectType.replace(" ", "-");

    if (projectType == "all") {
        $(".project-grid").fadeOut();
        $(".project-grid").removeClass("active");
        $(".home-project-grid").fadeIn()
    } else {
        $(`.project-grid`).css("display", "none");
        $(".home-project-grid").fadeOut();
        $(`#${projectType}-grid`).fadeIn()
        $(`#${projectType}-grid`).css("display", "grid");
    }

}

$(".dropdown-button").click(() => {
    $(".dropdown-content").toggleClass("active");
})

$(".dropdown-content p").click(function () {
    $(".dropdown-content").toggleClass("active");
    let type = $(this).find("span").html();
    $(".dropdown-button span").html(`${type} Projects`)
    updateProjectsGrid(type);
})