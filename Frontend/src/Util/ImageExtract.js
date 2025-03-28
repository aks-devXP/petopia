async function getImageURL(name) {
    const image= await import(/* @vite-ignore */`../assets/${name}`);
    return image.default;
}

// is working when complete path is being given
function getImgUrl(name) {
    return  new URL(`${name}`, import.meta.url).href
}


export { getImageURL, getImgUrl };
