let modal = null
const focusableSelector = 'button, a, input, textarea'
let focusables = []

// ***** Gallery Modal ******

let modalGallery = document.querySelector(".modal_gallery")

const fetchAllWorks = function() {
    fetch("http://localhost:5678/api/works")
    .then(function(res) {
        if (res.ok) {
            return res.json()
        }
    })
    .then(function(value) {
        modalGallery.innerHTML = ''
        for(i=0; i<value.length; i++){
            let modalFigure = document.createElement("figure")
            modalFigure.classList.add("gallery_card")
            modalFigure.setAttribute("id", "modalFigure")

            let modalFigureImage = document.createElement("img")
            let modalImage = value[i].imageUrl
            modalFigureImage.src = modalImage
            modalFigureImage.classList.add("modal_figureImage")

            let modalFigureText = document.createElement("figcaption")
            modalFigureText.classList.add("gallery_textEdit")
            modalFigureText.innerHTML = '<a href="#" class="gallery_textEdit">éditer</a>'

            let modalFigureDeleteIcon = document.createElement("button")
            modalFigureDeleteIcon.classList.add("modal_deleteButton")
            modalFigureDeleteIcon.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
            modalFigureDeleteIcon.addEventListener('click', deleteWork.bind(this, value[i].id))

            modalFigure.appendChild(modalFigureImage)
            modalFigure.appendChild(modalFigureText)
            modalFigure.appendChild(modalFigureDeleteIcon)
            modalGallery.appendChild(modalFigure)
        }
    })
} 

fetchAllWorks()

// ***** Modal ******

const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    focusables[0].focus()
    modal.style.display = null
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
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

// ***** Modal 2 *****

let modalWrapper = document.querySelector('.modal_wrapper')
let modalTitle = document.querySelector('.modal_title')
let modalLigne1 = document.querySelector('.ligne')
let newPictureButton = document.querySelector('.modal_button')
let galleryDeleteButton = document.querySelector('.modal_delete')

let buttonArrowModal2 = document.createElement("button")
let modalForm = document.createElement("form")
let modalLigne = document.createElement("div")

const openModal2 = function (e) {
    e.preventDefault();

    modalWrapper.removeChild(modalGallery)
    modalWrapper.removeChild(newPictureButton)
    modalWrapper.removeChild(galleryDeleteButton)
    modalWrapper.removeChild(modalLigne1)
    
    modalTitle.innerHTML = 'Ajout Photo'

    buttonArrowModal2.innerHTML = '<i class="fa-solid fa-arrow-left"></i>'
    buttonArrowModal2.classList.add("arrow_button")

    modalForm.innerHTML = '<div class="addPicture_container"><i class="fa-regular fa-image addPicture_icon"></i><label for="uploadPictureButton" class="addPicture_button">+ Ajouter photo</label><input type="file" class="upload" id="uploadPictureButton" name="image" accept=".png, .jpg, .jpeg" style="opacity: 0;"/><p class="addPicture_text">jpg, png : 4mo max</p></div><label class="modal2_formLabel">Titre</label><input class="modal2_formInpute" id="formTitle" type="text" name="title" required><label class="modal2_formLabel">Catégorie</label><select id="formCategory" class="modal2_formInpute" name="category" type="select" required><option value="" selected disabled></option><option value="1">Objets</option><option value="2">Appartements</option><option value="3">Hôtels & restaurants</option></select><input class="validate_button" type="submit" value="Valider" />'
    modalForm.classList.add('modal2_form')
    modalForm.setAttribute("method", "post")
    modalForm.setAttribute("enctype", "multipart/form-data")

    modalLigne.classList.add('ligne2')

    modalWrapper.appendChild(buttonArrowModal2)
    modalWrapper.appendChild(modalForm)
    modalWrapper.appendChild(modalLigne)

    // ***** Return modal with arrow button *****

const returnModal1 = function(e) {
    e.preventDefault()

    modalTitle.innerHTML = 'Galerie Photo'

    modalWrapper.removeChild(buttonArrowModal2)
    modalWrapper.removeChild(modalForm)
    modalWrapper.removeChild(modalLigne)

    modalWrapper.appendChild(modalTitle)
    modalWrapper.appendChild(modalGallery)
    modalWrapper.appendChild(modalLigne1)
    modalWrapper.appendChild(newPictureButton)
    modalWrapper.appendChild(galleryDeleteButton)
}

buttonArrowModal2.addEventListener('click', (returnModal1))

    // ***** Ajout preview picture *****

    let addPictureContainer = document.querySelector('.addPicture_container')
    let addPictureIcon = document.querySelector('.addPicture_icon')
    let addPictureButton = document.querySelector('.addPicture_button')
    let addPictureText = document.querySelector('.addPicture_text')
    let addPictureInput = document.querySelector('.upload')

    addPictureInput.addEventListener('change', preview)

    function preview() {
        addPictureContainer.removeChild(addPictureIcon)
        addPictureContainer.removeChild(addPictureButton)
        addPictureContainer.removeChild(addPictureText)

        let picturePreviewFile = addPictureInput.files

        if(validFileType(picturePreviewFile[0])) {
            let picturePreview = document.createElement('img')
            picturePreview.classList.add('previewPicture')
            picturePreview.src = window.URL.createObjectURL(picturePreviewFile[0])

            addPictureContainer.appendChild(picturePreview)
        }
    }

    var fileTypes = [
        'image/jpeg',
        'image/png'
      ]
      
    function validFileType(file) {
    for(var i = 0; i < fileTypes.length; i++) {
        if(file.type === fileTypes[i]) {
        return true;
        }
    }
    
    return false
    }

    // **** Ajout nouveaux travaux dans la galerie ****
    modalForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const form = new FormData(modalForm)

        let token = localStorage.getItem('token')

        fetch("http://localhost:5678/api/works", {
            method: 'POST',
            headers: {
            'Authorization' : `Bearer ${token}`
            },
            body: form
        }).then(res => {
            if (res.ok) {
                console.log("ok")
                return res.json()
            } else if (res.status === 400) {
                console.log("erreur 400")
            } else if (res.status === 401) {
                console.log("erreur 401")
            } else if (res.status === 500) {
                console.log("erreur 500")
            }
        })
    })
}

newPictureButton.addEventListener('click', (openModal2))

// **** Suppression des travaux via modal 1 *****
let token = localStorage.getItem('token')

const deleteWork = function(id) {
    fetch("http://localhost:5678/api/works/" + id, {
        method: 'DELETE',
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        },
    }).then(res => {
        console.log(res)
        if (res.status === 204) {
            return 'deleted'
        } else if (res.status === 401) {
        
        } else if (res.status === 500) {
            
        }
    }).then(data => {
        if(data === "deleted") {
            fetchAllWorks()
        }
    })
}