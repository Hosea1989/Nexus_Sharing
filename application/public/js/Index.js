
    let fetchURL = "https://jsonplaceholder.typicode.com/albums/2/photos";
    fetch(fetchURL)
        .then((data) => data.json())
        .then((photos) => {
            let photosLength = photos.length;

            photos.forEach((photo) => {
                const parentImageTitleContainer = document.createElement('photo_box');
                const photoTitle = document.createElement('p');
                const img = document.createElement('img');

                parentImageTitleContainer.setAttribute('display', 'inline-block');
                parentImageTitleContainer.appendChild(photoTitle);
                parentImageTitleContainer.appendChild(img);

                img.setAttribute('width', '300')
                img.setAttribute('height', '300')

                img.id = photo.id;
                img.src = photo.url;
                photoTitle.innerHTML = photo.title;

                img.addEventListener('click', function (i) {
                    photosLength = photosLength -1;
                    console.log('reducedLength--->',photosLength)
                    fadeOut(i, photo.id, photosLength, parentImageTitleContainer);
                });
                document.getElementById('wrapper').appendChild(parentImageTitleContainer);
            });
            document.getElementById('items-count').innerHTML = 'There are ' + photosLength + ' photo(s) being shown';
        })

// function fadeOut(event, id, length, parentDiv){
//     const element = document.getElementById(id);
//     const fadeEffect = setInterval(function () {
//         if (!element.style.opacity) {
//             element.style.opacity = 1;
//         }
//         if (element.style.opacity > 0) {
//             element.style.opacity -= 0.1;
//         } else {
//             clearInterval(fadeEffect);
//             parentDiv.remove();
//             document.getElementById('items-count').innerHTML = 'There are ' + length + ' photo(s) being shown';
//         }
//     }, 50);

    function fadeOut(parentDiv, id){
        const element = document.getElementById(id);
        const fadeEffect = setInterval(function () {
            if (!element.style.opacity) {
                element.style.opacity = 1;
            }
            if (element.style.opacity > 0) {
                element.style.opacity -= 0.1;
            } else {
                clearInterval(fadeEffect);
                parentDiv.remove();
                document.getElementById('items-count').innerHTML = 'There are ' + length + ' photo(s) being shown';
            }
        }, 50);
    // let myIcon = document.getElementById('myIcon');
    //
    // myIcon.addEventListener('click', function (i) {
    //     console.log('Clicked')
    //     window.location.href = '/';
    // };
}


