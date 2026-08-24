export  const concatUrl = (url) => {
    
    const regex = /[^a-zA-Z0-9\s.\-:]/g;
    return url?.replace(regex, "").split(".").join("")
}


export const convertToHttp = (url) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    } else {
        return 'http://' + url;
    }
}