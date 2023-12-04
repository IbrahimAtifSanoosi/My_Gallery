const landingPage = document.querySelector(".landing");
const BackgroundImgOption = document.querySelectorAll(".random-background span");
let backgroundInterval;
const colorsList = document.querySelectorAll(".colors-list li");
let randomizPermison = true;
// Show Option Box 
document.querySelector(".fa-gear").onclick = function () {
    this.classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("open");
};

// Show Drop Down Menu
document.querySelector(".icon").addEventListener("click", (e) => {
    document.querySelector(".menu").classList.toggle("show-menu");
    document.querySelector(".first").classList.toggle("first-span");
    document.querySelector(".second").classList.toggle("second-span");
    document.querySelector(".third").classList.toggle("third-span");
});

// Change Color From Local Storage
const mainColor = window.localStorage.getItem("lastColor");
if (mainColor !== null) {
    document.documentElement.style.setProperty("--main-color", mainColor)
    colorsList.forEach(element => {
        element.classList.remove("active");
        if (element.dataset.color === mainColor) {
            element.classList.add("active");
        }
    });
}

// Change Background Option From Local Storage
const backgroundOptionLocal = localStorage.getItem("randomizeOption");
if (backgroundOptionLocal !== null) {
    if (backgroundOptionLocal === "true") {
        randomizPermison = true;
        randomBackground();
    } else {
        randomizPermison = false;
        clearInterval(backgroundInterval);
    }
    BackgroundImgOption.forEach(element => {
        element.classList.remove("active");
    });
    if (backgroundOptionLocal === 'true') {
        document.querySelector(".yes").classList.add("active");
    }
    else {
        document.querySelector(".no").classList.add("active");
    }
}
// Change Color From Color Box Option
colorsList.forEach(li => {
    li.addEventListener("click", (e) => {
        // Set Color To The Root Element
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        // Set Color To The Local Storage
        localStorage.setItem("lastColor", e.target.dataset.color);
        handleActive(e);
    });
});

// Switch Active Class To Selected Element In Drop Menu
document.querySelectorAll("ul a").forEach(a => {
    a.addEventListener("click", (e) => {
        // Remove Class Active From All Elements
        handleActive(e);
    });
});

// Change Background Image Randomly
function randomBackground() {
    if (randomizPermison === true) {
        let imagesArray = ["01.jpg.jpg", "02.jpg.jpg", "03.jpg.jpg", "04.jpg.jpg"];
        backgroundInterval = setInterval(() => {
            landingPage.style.backgroundImage = 'url("images/' + imagesArray[Math.floor(Math.random() * imagesArray.length)] + '")';
            console.log(Math.floor(Math.random() * imagesArray.length));
        }, 10000)
    }
}

// Change Background Image Option
BackgroundImgOption.forEach(span => {
    span.addEventListener("click", (e) => {
        handleActive(e);
        if (e.target.dataset.background === "yes") {
            randomizPermison = true;
            randomBackground();
            localStorage.setItem("randomizeOption", true);
        }
        else {
            randomizPermison = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("randomizeOption", false);
        }
    });
});

randomBackground();

// Get Skills Selectors
let skills = document.querySelector(".skills");
window.onscroll = function () {
    // Skills Ofset Top
    let skillsOffsetTop = skills.offsetTop;
    // Skills Outer Height
    let skillsOutersHeight = skills.offsetHeight;
    // Window Height
    let windowHeight = this.innerHeight;
    // Window Scroll Top
    let windowScrollTop = this.pageYOffset;
    if (windowScrollTop > ((skillsOffsetTop + skillsOutersHeight) - windowHeight)) {
        this.console.log("Skills Reached");
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach(skill => {
            skill.style.width = skill.dataset.progress
            skill.innerText = skill.dataset.progress;
            if (skill.dataset.progress >= "90") {
                skill.style.backgroundColor = "green";
            } else if (skill.dataset.progress >= "80") {
                skill.style.backgroundColor = "blue";
            }
        });
    }
};
// Get Galary  Images Selectors
let galaryImgs = document.querySelectorAll(".galary-images img");
galaryImgs.forEach(img => {
    img.addEventListener('click', (e) => {
        //Create Overlay for Clicked Image
        let overlayImg = document.createElement("div");
        // Add Class For Overlay
        overlayImg.className = "popup-overlay";
        // Apend Overlay To The Body
        document.body.appendChild(overlayImg);
        //Create Popup Box for Clicked Image
        let popupBox = document.createElement("div");
        popupBox.className = 'popup-box';
        // Create Image Heading
        if (img.alt !== null) {
            let heading = document.createElement("h3");
            let headingText = document.createTextNode(img.alt);
            heading.appendChild(headingText);
            popupBox.appendChild(heading);
        }
        // Create Close Button
        let closeButton = document.createElement("span");
        // Add Class To Button
        closeButton.className = 'close-button';
        // Close Button Text
        let closeBtnText = document.createTextNode("X");
        // Append Text To Button
        closeButton.appendChild(closeBtnText);
        // Apend Close Button To Popup Box
        popupBox.appendChild(closeButton);
        // Create Image
        let image = document.createElement("img");
        image.src = img.src;
        // Apend Image To The Popup Box
        popupBox.appendChild(image);
        // Apend Image To The Overlay
        document.body.appendChild(popupBox);
    });
});

// Close Popup
document.addEventListener("click", function (e) {
    if (e.target.className == 'close-button') {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }
});

function handleActive(eve) {
    // Remove Class Active From All Elements
    eve.target.parentElement.querySelectorAll(".active").forEach((element => {
        element.classList.remove("active");
    }));
    // Set Class Active To Choosen Element
    eve.target.classList.add("active");
}
