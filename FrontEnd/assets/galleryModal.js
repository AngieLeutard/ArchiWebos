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