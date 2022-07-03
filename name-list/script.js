function showData(data){
    let userCard = document.querySelector('#userCard');
    userCard.innerHTML="";
    data.forEach(val => {
        let box = document.createElement('div');
        let name = document.createElement('p');
        let user = document.createElement('h1');
        user.innerText = `${val.username}`;
        name.innerText = `${val.name} ${val.surname}`;
        box.appendChild(user);
        box.appendChild(name);
        userCard.appendChild(box);
    })
}
let data = {};

async function getData(){
    const response = await fetch('http://isd-test.cucheck.in/users');
    data = await response.json();
    showData(data);
}
getData();


function search(keyword){
    let searched = [];
    if(keyword===''){
        showData(data);
    } else {
        for(let i=0;i<data.length;i++){
            console.log(i);
            if(data[i].name === keyword || data[i].surname === keyword || data[i].username === keyword){
                searched.push(data[i]);
            }
        }
        showData(searched);
    }
}

document.addEventListener("keypress", function(e) {
    if (e.keyCode == 13) {
        search(document.getElementById("search").value);
    }
});