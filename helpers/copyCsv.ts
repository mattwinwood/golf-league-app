const copyCsv = {
copy: (csvContent) => {
    //Creating textarea element
    let textarea = document.createElement("textarea")
    //Settings its value to the thing you want to copy
    textarea.value = csvContent.value.innerHTML
    //Appending the textarea to body
    document.body.appendChild(textarea)
    //Selecting its content
    textarea.focus()
    textarea.select()
    //Copying the selected content to clipboard
    document.execCommand("copy")
    //Removing the textarea
    document.body.removeChild(textarea)
},
getDate : () => {
    let dateObj = new Date()
    let month = dateObj.getUTCMonth()
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    let hours = dateObj.getHours()
    let minute= dateObj.getMinutes()
    return  `${month}-${day}-${year}-${hours}:${minute} `
}
}
export default copyCsv;
