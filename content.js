// Load divs in doc and hide them
$("body").append("<div class='expand-image-icon' id='expand-image-icon'>Expand</div>");
$("body").append("<div class='expand-image-modal' id='expand-image-modal'></div>");
$("body").append("<div class='expand-image-modal-overlay' id='expand-image-modal-overlay'></div>");

// Add listeners so that each image shows an "Expand" button when you hover over them
addListenersToImages()

// When "Expand image" button is clicked, show modal with overlay
$("#expand-image-icon").click(function () {
    $("#expand-image-modal-overlay").css("visibility", "visible")
    $("#expand-image-modal").css("visibility", "visible")
})

// When overlay is clicked, hide everything
$("#expand-image-modal-overlay").click(function () {
    hideEverything()
})

// When modal is clicked, hide everything
$("#expand-image-modal").click(function () {
    console.log("MODAL IS BEING CLICKED")
    hideEverything()
})

function hideEverything() {
    $("#expand-image-modal").css("visibility", "hidden")
    $("#expand-image-modal-overlay").css("visibility", "hidden")
}

// Hide icon when doc is scrolled
$(".kix-appview-editor").scroll(function () {
    $("#expand-image-icon").css("visibility", "hidden")
    // Re-add listeners sine we may have different images in the page
    addListenersToImages()
})

function addListenersToImages() {
    var images = document.getElementsByTagName('image');

    for (i = 0; i < images.length; i++) {
        var image = images[i]

        image.onmouseover = function (event) {
            let target = event.target
            let imageLink = target.href.baseVal
            let imageProperties = target.getBoundingClientRect()

            // When image is hovered, show "Expand" button and position it in the top-right of the image
            $("#expand-image-icon").css("visibility", "visible")
            $("#expand-image-icon").css("top", imageProperties.y + 5)
            $("#expand-image-icon").css("left", imageProperties.right - 95)

            // Add a new iframe with the image
            $("#expand-image-modal").empty()
            $("#expand-image-modal").append("<iframe id='expand-image-modal-iframe' frameborder='0' scrolling='yes' width='100%' height='100%' src=" + imageLink + ">")
        }
    }
}