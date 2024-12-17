let currentUser = JSON.parse(localStorage.getItem("currentUser"))
const appUserName = document.querySelector(".appUserName")
const appTheGame = document.querySelector(".appTheGame")
const appImg = document.querySelectorAll(".appImg")
const appNewHead = document.createElement("h3")
appNewHead.innerText = "שלום, " + currentUser.name
appUserName.append(appNewHead)

appTheGame.addEventListener("mouseover", e => {
    const appNewP = document.createElement("h2")
    appNewP.innerText = "שלב : " + (currentUser.level - 2) + " ניקוד : " + (currentUser.points)
    appNewP.classList.add("txt")
    appTheGame.append(appNewP)
    appTheGame.addEventListener("mouseout", e => {
        appNewP.remove()
    })

})

for(let i=0; i<appImg.length; i++)
{
    appImg[i].addEventListener("click",e=>{
        appImg[i].classList.add("change")
        appImg[i].classList.remove("h")

        setTimeout(() => {
            appImg[i].classList.remove("change")
            appImg[i].classList.add("h")
        }, 1500)
    })
}



