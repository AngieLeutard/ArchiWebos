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

            galleryWorks[i] = galleryFigure;
            gallery.appendChild(galleryFigure);
        }

         // Filter

            // button

        let filterTousButton = document.querySelector(".filterTous");
        let filterObjetsButton = document.querySelector(".filterObjets");
        let filterAppartementsButton = document.querySelector(".filterAppartements");
        let filterHotelButton = document.querySelector(".filterHotel");


        // images

        let objets = galleryWorks[0, 4];
        let appartements = galleryWorks[1];
        let hotel = galleryWorks[2, 9, 10];

            // add categories 

        filterObjetsButton.addEventListener('click', () => {
            console.log("hello");
            appartements.classList.add("displayNone");
            hotel.classList.add("displayNone");
            objets.classList.add("displayBlock");
        });

        filterAppartementsButton.addEventListener('click', () => {
            console.log("hello");
            objets.classList.add("displayNone");
            hotel.classList.add("displayNone");
            appartements.classList.add("displayBlock");

        });

        filterHotelButton.addEventListener('click', () => {
            console.log("hello");
            objets.classList.add("displayNone");
            appartements.classList.add("displayNone");
            hotel.classList.add("displayBlock");

        })

        filterTousButton.addEventListener('click', () => {
            console.log("hello");
            objets.classList.remove("displayNone");
            appartements.classList.remove("displayNone");
            hotel.classList.remove("displayNone");
        })



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


