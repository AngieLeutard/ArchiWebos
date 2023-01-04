console.log("hello")

let modal = null
const focusableSelector = 'button, a, input, textarea'
let focusables = []

const openModal = function (e) {
    e.preventDefault();
    modal = document.querySelector(e.target.getAttribute('href'));
    focusables = Array.from(modal.querySelectorAll(focusableSelector));
    focusables[0].focus()
    modal.style.display = null;
    modal.removeAttribute('aria-hidden');
    modal.setAttribute('aria-modal', 'true');
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation);
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal);
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation);
    modal = null; 
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

const focusInModal = function (e) {
    e.preventDefault();
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'));
    if (e.shiftKey === true) {
        index--
    } else {
        index ++
    } 
    if (index >= focusables.length) {
        index = 0
    }
    if (index < 0) {
        index = focusables.length - 1
    }
    focusables[index].focus()
}

document.querySelectorAll('.js-modal').forEach(a => {
    a.addEventListener('click', openModal);
}) 

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === "Tab" && modal !== null) {
        focusInModal(e)
    }
})

// Gallery du modal

let modalGallery = document.querySelector(".modal_gallery");

fetch("http://localhost:5678/api/works")
    .then(function(res) {
        if (res.ok) {
            return res.json();
        }
    })
    .then(function(value) {
        for(i=0; i<value.length; i++){
            let modalFigure = document.createElement("figure");
            modalFigure.classList.add("gallery_card")

            let modalFigureImage = document.createElement("img");
            let modalImage = value[i].imageUrl;
            modalFigureImage.src = modalImage;
            modalFigureImage.classList.add("modal_figureImage");

            let modalFigureText = document.createElement("figcaption");
            modalFigureText.classList.add("gallery_textEdit");
            modalFigureText.innerHTML = '<a href="#" class="gallery_textEdit">éditer</a>';

            let modalFigureDeleteIcon = document.createElement("button");
            modalFigureDeleteIcon.classList.add("modal_deleteButton");
            modalFigureDeleteIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

            modalFigure.appendChild(modalFigureImage);
            modalFigure.appendChild(modalFigureText);
            modalFigure.appendChild(modalFigureDeleteIcon);
            modalGallery.appendChild(modalFigure);
        }
    });