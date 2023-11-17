const saveCsv= {
    save: (csvContent, activeCourse) => {
    let text= csvContent.value.innerHTML;
    text = text.replace(/\n/g, "\r\n"); // To retain the Line breaks.
    let blob = new Blob([text], { type: "text/plain"});
    let anchor = document.createElement("a");

    anchor.download = activeCourse.replace(/\s+/g, '-').toLowerCase() + "-" + saveCsv.getDate() + ".csv";
    anchor.href = window.URL.createObjectURL(blob);
    anchor.target ="_blank";
    anchor.style.display = "none"; // just to be safe!
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
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
export default saveCsv;
