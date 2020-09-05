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
});

// Contact Modal
$("#contact-button").click(() => {
    $(".contact-modal").fadeIn(1000);
    $(".contact-modal").css("display", "flex");
    $("body").addClass("no-scroll");
});

$(".contact-modal i").click(() => {
    $(".contact-modal").fadeOut(1000);
    $("body").removeClass("no-scroll")
});


// Navbar

const openNav = () => {
    $(".navbar-overlay").fadeIn(1000);
    $(".navbar-overlay").css("display", "flex");
    $("body").addClass("no-scroll");
}

const closeNav = () => {
    $(".navbar-overlay").fadeOut(1000);
    $("body").removeClass("no-scroll")
}

$(".navbar-content a").click(() => {
    closeNav()
});

let prevScrollPos = $(document).scrollTop();
const homePaths = ["/index.html", "/"];
if (homePaths.includes(window.location.pathname)) {
    $(".navbar").css("top", "-5rem");
}

$(document).scroll(() => {
    let currentScrollPos = $(document).scrollTop();
    if (currentScrollPos < 250 && homePaths.includes(window.location.pathname)) {
        $(".navbar").css("top", "-5rem")
    } else if (prevScrollPos > currentScrollPos) {
        $(".navbar").css("top", "0")
    } else {
        $(".navbar").css("top", "-5rem")
    }
    prevScrollPos = currentScrollPos;
});



// ----------------------------------------
// PROJECTS

// Load All Projects

const loadAllProjects = () => {
    axios({
            method: "get",
            url: "../../assets/js/projects.json"
        })
        .then(result => {
            projects = result.data;
            console.log(projects)

            projects.forEach(project => {
                let projectGrid = project.type.replace(" ", "-") + "-grid";
                let projectLocation = project.location;
                projectLocation = projectLocation.substring(projectLocation.indexOf(", ") + 2)
                $(`#${projectGrid}`).append(`
                    <div class="project" style="background-image: url('./assets/images/projects/${project.type}/${project.name}/${project.name} (1).jpg');">
                        <a class="project-inner" href="./projects.html#${project.name}">
                            <h3>${project.name}</h3>
                            <div class="divider-line"></div>
                            <p> <i class="material-icons">room</i>
                                ${projectLocation}</p>
                        </a>
                    </div>
                `)
            })


        })
        .catch(err => {
            console.log(err)
        })
}


if (window.location.pathname === "/projects.html") {
    loadAllProjects();
}


// Project Modal
let currentHash = window.location.hash;

const closeProjectModal = () => {
    $(".project-modal").fadeOut(1000)
    $("body").removeClass("no-scroll");
    location.hash = ""
}

const loadProject = () => {
    $(".project-modal").fadeIn(1000);
    $("body").addClass("no-scroll");

    axios({
            method: "get",
            url: "../../assets/js/projects.json"
        })
        .then(result => {
            projects = result.data;

            currentHash = window.location.hash;
            let projectNameToLoad = currentHash.replace("#", "");
            projectNameToLoad = projectNameToLoad.replace(/%20/g, " ");

            const project = projects.find(project => project.name === projectNameToLoad);

            if (project === undefined) {
                return closeProjectModal()
            }

            // Insert Data
            $(".project-name").html(project.name)
            $(".project-type span").html(project.type)
            $(".project-date span").html(project.date)
            $(".project-location span").html(project.location);

            // Insert Project Images
            $(".project-logos").empty();
            project.association.forEach(image => {
                $(".project-logos").append(
                    `
                    <img src="./assets/images/project-logos/${image}.png" alt="${image}" title="${image}">
                    `
                )
            })

            // Insert Project Images
            $(".project-modal .project-images").empty();

            for (let i = 1; i <= project.images; i++) {
                $(".project-modal .project-images").append(`
                <div>
                <img src='./assets/images/projects/${project.type}/${project.name}/${project.name} (${i}).jpg'>  
                </div>
                `)
            }
        })
        .catch(err => {
            console.log(err)
        })
}

if (currentHash !== "" && window.location.pathname === "./projects.html") {
    loadProject()
}

if (window.location.pathname === "/projects.html") {
    $(document).on("click", ".project-grid .project-inner", () => {
        loadProject();
    })
}

$(window).on("hashchange", () => {
    if (window.location.pathname === "./projects.html") {
        currentHash = window.location.hash;
        if (currentHash !== "") {
            loadProject()
        }
    }
})


// Project Image Modal

$(document).on("click", ".project-images div img", function () {
    let imageUrl = $(this).attr("src")
    console.log(imageUrl)
    $(".project-image-modal").addClass("active");

    // Insert Image
    $(".project-image-modal .image img").attr("src", imageUrl)
});

const closeProjectImageModal = () => {
    $(".project-image-modal").removeClass("active");
}