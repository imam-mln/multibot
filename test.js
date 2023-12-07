
function expDate() {
    const date = new Date()
    date.setMonth(date.getMonth() + 1)
    const datetime = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
    time = date.toLocaleTimeString("id-ID", {hour12: false}),
    exp = `${datetime} ${time}`
    return exp
}

// console.log(seconds);
// console.log(expDate());
// console.log(new Date(seconds * 1000).toISOString());


const ini = "ini adalah Budi"
console.log(ini.search("Budi"));