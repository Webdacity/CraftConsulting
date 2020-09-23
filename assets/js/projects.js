// ----------------------------------------
// PROJECTS

// Load All Projects
let globalProjects = {};

const loadAllProjects = () => {
    axios({
        method: "get",
        url: "../../assets/js/projects.json"
    })
        .then(result => {
            projects = result.data;
            globalProjects = projects;

            projects.forEach(project => {
                let projectGrid = project.type.toLowerCase().replace(" ", "-") + "-grid";
                let projectLocation = project.location;
                projectLocation = projectLocation.substring(projectLocation.indexOf(", ") + 2);
                $(`#${projectGrid}`).append(`
                    <div class="project">
                    <img class="project-image" src="/assets/images/projects/${project.type}/${project.name}/${project.name} (1).jpg" alt="${project.name}">
                        <a class="project-inner" href="./projects.html#${project.name}">
                            <h3>${project.name}</h3>
                            ${project.underConstruction ? "<h5> - Under Construction - </h5>" : ""}
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


loadAllProjects();


// Project Modal
let currentHash = window.location.hash;

const closeProjectModal = () => {
    $(".project-modal").fadeOut(500);
    $(".project-modal .project-images-grid").empty();
    $(".project-modal .project-images-construction-grid").empty();
    $("html, body").removeClass("no-scroll");
    location.hash = "";
}

const loadProject = () => {
    $(".project-modal").fadeIn(1000);
    $("html, body").addClass("no-scroll");

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
            $(".project-image-modal").attr("data-project-name", project.name)

            // Insert Logos
            $(".project-logos").empty();
            project.association.forEach(image => {
                $(".project-logos").append(
                    `
                    <img src="./assets/images/project-logos/${image}.png" alt="${image}" title="${image}">
                    `
                )
            })

            // Insert Project Images
            $(".project-modal .project-images-grid").empty();

            for (let i = 1; i <= project.images; i++) {
                $(".project-modal .project-images-grid").append(`
                <div class="project-image">
                <img src='./assets/images/projects/${project.type}/${project.name}/${project.name} (${i}).jpg'>  
                </div>
                `)
            }

            // Insert Project Construction Images
            $(".project-modal .project-images-construction-grid").empty();
            if (project.construction) {
                $(".project-modal .project-images-construction").show();

                for (let i = 1; i <= project.construction; i++) {
                    $(".project-modal .project-images-construction-grid").append(`
                    <div class="project-image">
                    <img src='./assets/images/projects/${project.type}/${project.name}/Construction/${project.name} (${i}).jpg'>  
                    </div>
                    `)
                }

            } else {
                $(".project-modal .project-images-construction").hide()
            }


        })
        .catch(err => {
            console.log(err)
        })
}

if (currentHash !== "") {
    console.log(true)
    loadProject()
}

$(document).on("click", ".project-grid .project-inner", () => {
    loadProject();
})


$(window).on("hashchange", () => {
    currentHash = window.location.hash;
    if (currentHash !== "") {
        loadProject()
    }
})


// Project Image Modal

$(document).on("click", ".project-images .project-image img", function () {
    let imageUrl = $(this).attr("src")
    console.log(imageUrl)
    $(".project-image-modal").addClass("active");

    // Insert Image
    $(".project-image-modal .image img").attr("src", imageUrl)
});

const closeProjectImageModal = () => {
    $(".project-image-modal").removeClass("active");
}

// Project Modal Arrows

const getProjectImageModalDetails = () => {
    const currentProjectName = $(".project-image-modal").attr("data-project-name");
    const currentProject = globalProjects.find(project => project.name === currentProjectName);
    let currentImageURL = $(".project-image-modal img").attr("src");
    const currentImageCount = parseInt(currentImageURL.substring(currentImageURL.indexOf("(") + 1, currentImageURL.indexOf(")")));

    let construction = false;
    let constructionString = "";
    if (currentImageURL.includes("Construction")) {
        construction = !construction;
    }

    if (construction) {
        constructionString = "/Construction/"
    }

    return [currentProjectName, currentProject, currentImageCount, constructionString]
}

const nextProjectImageModal = () => {
    const [currentProjectName, currentProject, currentImageCount, constructionString] = getProjectImageModalDetails();

    if (currentImageCount < currentProject.images) {
        $(".project-image-modal img").attr("src", `./assets/images/projects/${currentProject.type}/${currentProject.name}/${constructionString}${currentProject.name} (${currentImageCount + 1}).jpg`);
    } else {
        $(".project-image-modal img").attr("src", `./assets/images/projects/${currentProject.type}/${currentProject.name}/${constructionString}${currentProject.name} (1).jpg`);
    }
}

const prevProjectImageModal = () => {
    const [currentProjectName, currentProject, currentImageCount, constructionString] = getProjectImageModalDetails();

    if (currentImageCount === 1) {
        $(".project-image-modal img").attr("src", `./assets/images/projects/${currentProject.type}/${currentProject.name}/${constructionString}${currentProject.name} (${currentProject.images}).jpg`);
    } else {
        $(".project-image-modal img").attr("src", `./assets/images/projects/${currentProject.type}/${currentProject.name}/${constructionString}${currentProject.name} (${currentImageCount - 1}).jpg`);
    }
}

