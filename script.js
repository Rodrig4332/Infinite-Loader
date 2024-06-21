const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

const count = 30;
const apiKey = 'PQl4tL7RFWxSx9BPmHiBvP-5wsEWWXmMcfVFqas8BLQ';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded successfully
function imageLoaded() {
  imagesLoaded++
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}

function setAttributes(element, attributes) { 
  for(const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Links & Photos, add to the DOM
function displayPhotos() {
  totalImages = photosArray.length;
 
    // Run function for each object in photsArray
  photosArray.forEach((photo) => {
    // Create <a> to link to unsplash
    const item = document.createElement('a');
    setAttributes(item, {
    href: photo.links.html,
    target: '_blank'
    }) 
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.small,
      alt: photo.alt_description,
      title: photo.alt_description
    })
    // Event listener , check when each image is finished loading
    img.addEventListener('load',imageLoaded)


    // Put image inside <a> 
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from unsplashAPI
async function getPhotos() {
    try {
      const response = await fetch(apiUrl);
      photosArray = await response.json();
      displayPhotos();
    } catch (error) {
        console.log(error, 'Something Happened!');
    }
}

// Check to see if scrolling near bottom of page, load more photos
 window.addEventListener('scroll', () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
    getPhotos();
    console.log('Get more')
  }
});


// On Load
getPhotos();
