async function getImageURL(name) {
    const image= await import(/* @vite-ignore */`../assets/PetGuide/${name}`);
    return image.default;
}

// is working when comlete path is being given
function getImgUrl(name) {
    return new URL(`${name}`, import.meta.url).href
  }


export { getImageURL, getImgUrl };


 