fetch("http://localhost:5678/api/works")
    .then(function(res) {
        if (res.ok) {
        return res.json();
        }
    })
    .then(function(value) {
        let galleryWorks = [];
        let gallery = document.querySelector(".gallery");
        gallery.classList.add("gallery");

        for(i=0; i<value.length; i++){
            let galleryFigure = document.createElement("figure");
            galleryFigure.classList.add("galleryFigure");

            let figureImage = document.createElement("img");
            let image = value[i].imageUrl;
            console.log(image);
            figureImage.src = image;

            let figureText = document.createElement("figcaption");
            let figcaption = value[i].title;
            console.log(figcaption)
            figureText.textContent = figcaption;

            galleryFigure.appendChild(figureImage);
            galleryFigure.appendChild(figureText);
            gallery.appendChild(galleryFigure);
        }
    });














    


  // console.log(value);
        // for(i=0;i<value.length;i++){
        //     let work = value[i]
        //     console.log(work)
        // }
        // value.map((work) => {
        //     console.log(work.imageUrl)
        // })





// let works = [];
// let gallery = document.querySelector(".gallery");
// gallery.classList.add("gallery");

// for(i=0; i<value.length; i++){
//     let galleryFigure = document.createElement("figure");

//     let figureImage = document.createElement("img");
//     figureImage = fetch("http://localhost:5678/api/" + work[i].imageUrl)
//     let figureText = document.createElement("figcaption");

//     works[i] = galleryFigure;
//     galleryFigure.appendChild(figureImage);
//     galleryFigure.appendChild(figureText);
//     gallery.appendChild(galleryFigure);
// }


