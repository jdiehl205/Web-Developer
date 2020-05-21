let search = document.querySelector("input"),
    div = document.querySelectorAll("div")[1],
    a = document.querySelector(".again"),
    title = document.querySelector("h1"),
    link = document.head.querySelector("link"),
    ul = document.querySelector("ul"),
    h4 = document.querySelector("h4");

    let style = document.createElement("link");

    style.innerHTML = `<link rel="stylesheet" href="style2.css">`

search.addEventListener("keyup", async (e) => {
    if(e.keyCode == 13){
        let res = await fetch("anime.json"),
        data = await res.json(),
        matches;
        matches = data.filter(datas => {
            let regex = new RegExp(`${search.value}`, "gi");
            return datas.name.match(regex);
        });

        if(search.value.length === 0){
        matches = [];
        };
        getHtml(matches);
        styles()
    }
});

const getHtml = matches => {
    if(matches.length > 0){
        const html = matches.map(match => 
            `<h4>${match.name}</h4>
            <img src="${match.img}">
            <p>${match.description}</p>`
        ).join('');

        div.innerHTML = html;
    }
};

function styles(){
    search.style.display = "none";
    a.style.display = "block";
    div.style.display = "block";
    title.style.display = "none";
    ul.style.display = "none";
    h4.style.display = "none";
    document.head.removeChild(link);
    document.head.appendChild(style);
}

a.addEventListener("click", () => {
    div.style.display = "none";
    search.style.display = "block";
    a.style.display = "none";
    title.style.display = "block";
    ul.style.display = "block";
    h4.style.display = "block";
    document.head.appendChild(link);
    document.head.removeChild(style);
});
