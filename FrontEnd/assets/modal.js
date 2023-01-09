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

// modal 2

let modalWrapper = document.querySelector('.modal_wrapper')
let modalTitle = document.querySelector('.modal_title')
let modalLigne1 = document.querySelector('.ligne')
let newPictureButton = document.querySelector('.modal_button')
let galleryDeleteButton = document.querySelector('.modal_delete')

let buttonArrowModal2 = document.createElement("button")
let addPictureContainer = document.createElement("div")
let modalForm = document.createElement("form")
let modalLigne = document.createElement("div")
let modal2Button = document.createElement("button")

const openModal2 = function (e) {
    e.preventDefault();

    modalWrapper.removeChild(modalGallery)
    modalWrapper.removeChild(newPictureButton)
    modalWrapper.removeChild(galleryDeleteButton)
    modalWrapper.removeChild(modalLigne1)
    
    modalTitle.innerHTML = 'Ajout Photo'

    buttonArrowModal2.innerHTML = '<i class="fa-solid fa-arrow-left"></i>'
    buttonArrowModal2.classList.add("arrow_button")

    addPictureContainer.innerHTML = '<i class="fa-regular fa-image addPicture_icon"></i><button class="addPicture_button" type="button">+ Ajouter photo</button><p class="addPicture_text">jpg, png : 4mo max</p>'
    addPictureContainer.classList.add("addPicture_container")

    modalForm.innerHTML = '<label class="modal2_formLabel">Titre</label><input class="modal2_formInpute" type="text" name="title"><label class="modal2_formLabel">Catégorie</label><select class="modal2_formInpute" type="select"><option value="choose"></option><option value="objets">Objets</option><option value="appartements">Appartements</option><option value="hotels-restaurants">Hôtels & restaurants</option></select>'
    modalForm.classList.add('modal2_form')

    modalLigne.classList.add('ligne')

    modal2Button.innerHTML = 'Valider'
    modal2Button.classList.add('validate_button')

    modalWrapper.appendChild(buttonArrowModal2)
    modalWrapper.appendChild(addPictureContainer)
    modalWrapper.appendChild(modalForm)
    modalWrapper.appendChild(modalLigne)
    modalWrapper.appendChild(modal2Button)
}

newPictureButton.addEventListener('click', (openModal2))

const returnModal1 = function (e) {
    e.preventDefault();

    modalTitle.innerHTML = 'Galerie Photo'

    modalWrapper.removeChild(buttonArrowModal2)
    modalWrapper.removeChild(addPictureContainer)
    modalWrapper.removeChild(modalForm)
    modalWrapper.removeChild(modalLigne)
    modalWrapper.removeChild(modal2Button)

    modalWrapper.appendChild(modalTitle)
    modalWrapper.appendChild(modalGallery)
    modalWrapper.appendChild(modalLigne1)
    modalWrapper.appendChild(newPictureButton)
    modalWrapper.appendChild(galleryDeleteButton)
}

buttonArrowModal2.addEventListener('click', (returnModal1))