window.addEventListener('DOMContentLoaded', eventHandler)

function eventHandler(e){
    appendForm() 
    loadMonsters()
    pageTurner()
}
let page = 21


function loadMonsters(){

    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(res=>res.json())
    .then(monsterData => displayMonsters(monsterData))
}

function displayMonsters(monsterData){
    monsterData.forEach(monster =>buildMonster(monster))
}

function buildMonster(monster){
    let monsterCard = document.createElement('div')
    monsterCard.innerHTML = `
    <h2 class = "monster-name">Name: ${monster.name}</h2>
    <h3 class = "monster-age">Age: ${monster.age}</h3>
    <p class = "monster-description">Description: ${monster.description}</p>
    `
    document.querySelector('#monster-container').appendChild(monsterCard)
}


function appendForm(){
    let createMonsterForm = document.createElement('div')
    createMonsterForm.innerHTML = `
    <form action="" method="get" class="create-monster-form">
        <input type="text" placeholder="Enter Name" id="name" required>
        <input type="text" placeholder="Enter Age" id="age" required>
        <input type="text" placeholder="Enter Description" id="description" required>
        <input type="submit" value="Create Monster!">
    </form>
    `
    createMonsterForm.addEventListener('submit', addMonster)

    document.querySelector('#create-monster').appendChild(createMonsterForm)
}


function addMonster(e){
    e.preventDefault()
    let monsterName = e.target.name.value
    let monsterAge = e.target.age.value
    let monsterDesc = e.target.description.value
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify ({
            name: monsterName,
            age: monsterAge,
            description: monsterDesc, 
        })
        
    })
    .then(res=>res.json())
    .then(monster=>buildMonster(monster))
    
}

function pageTurner(){
    let forwardBtn = document.querySelector('#forward')
    let backBtn = document.querySelector('#back')
    forwardBtn.addEventListener('click', goForward)
    backBtn.addEventListener('click', goBack)
}

function goForward(){
    page +=1
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(res=>res.json())
    .then(monsterData => {
        if(monsterData.length === 0){
            page -=1
            window.alert("No more Monsters")
        } else{        
            document.querySelector('#monster-container').innerHTML = ''
            loadMonsters()
        }
    })
}
 

function goBack(){
    if (page === 1){
        window.alert('This is the first page!')
    } else{
        page -=1
        document.querySelector('#monster-container').innerHTML = ''
        loadMonsters()
    }
}





