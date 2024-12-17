let users = JSON.parse(localStorage.getItem("users"))
let currentUser = JSON.parse(localStorage.getItem("currentUser"))

//מערך של ארבעת כפתורי הצבעים
const colorBtns = document.querySelectorAll(".colorBtn")

const newGameBtn = document.querySelector(".newStart")
const continueBtn = document.querySelector(".continue")

//מערך לצבעים הכהים
const arrColors = ["red", "blue", "yellow", "rgb(24, 232, 24)"]
//מערך לצבעים הבהירים
const newArrColors = ["rgb(224, 133, 133)", "rgb(143, 143, 244)", "rgb(254, 254, 169)", "rgb(173, 252, 173)"]

const points = document.querySelector(".points")
const twoBtns = document.querySelector(".twoBtns")
const body = document.querySelector("body")
let computerChoises = []
let indexOfArr = 0
let flag = false

const showAudio = new Audio('../audio/show.wav');
const goodClickAudio = new Audio('../audio/goodClick.wav');
const mistakeAudio = new Audio('../audio/mistake.mp3');
const pachyAudio = new Audio('../audio/pachy.mp3');
const finishRetzefAudio = new Audio('../audio/goodRetzef.mp3');

//הגדרה דווקא כאן כדי שיכיר אותו בפונקציה נוספת (עבור ההסרה)
const gameOver = document.createElement("img")
const winner = document.createElement("img")
const count = document.createElement("p")
const level = document.createElement("p")

//פונקציה להצגת הניקוד והשלב על המסך
const showPoints = () => {
    points.innerHTML = ""
    level.innerText = `שלב: ${currentUser.level - 2}`
    count.innerText = `ניקוד: ${currentUser.points}`
    points.append(level)
    points.append(count)
    level.classList.add("showPoints")
    count.classList.add("showPoints")
}
showPoints()

//פונקציה להצגת הצבעים הכהים על כל העיגולים יחד
const showDarkColors = () => {
    for (let k = 0; k < colorBtns.length; k++) {
        //עוברת על מערך ארבעת עיגולי האורות ומחליפה את צבען לכהה ע"י מערך הצבעים הכהים
        colorBtns[k].style.backgroundColor = arrColors[k]
    }
}
//פונקציה להצגת הצבעים הבהירים על כל העיגולים יחד
const showLightColors = () => {
    for (let k = 0; k < colorBtns.length; k++) {
        //עוברת על מערך ארבעת עיגולי האורות ומחליפה את צבען לבהיר ע"י מערך הצבעים הבהירים
        colorBtns[k].style.backgroundColor = newArrColors[k]
    }
}

//פונקציה להגרלת רצפים
function randomColors() {
    for (let i = 0; i < currentUser.level; i++) {
        //מכניסה לתוך מערך את הרצף הרנדומלי
        computerChoises.push(Math.floor(Math.random() * 4))
    }
}

//פונקציה להצגת רצף האורות 
function showColors() {
    //מניעת אפשרות הלחיצה על עיגולי האורות
    flag = false
    //הופך לבהיר
    showLightColors()
    let i = 0
    //פונקציה להחלפת הצבעים עפ"י הרצף הנוכחי
    let change = true
    const changeColor = () => {
        if (change === true) {
            colorBtns[computerChoises[i]].style.backgroundColor = arrColors[computerChoises[i]]//מדליק כפתור
            showAudio.play();
            change = false
        }
        else if (change === false) {
            colorBtns[computerChoises[i]].style.backgroundColor = newArrColors[computerChoises[i]]//מכבה כפתור
            change = true
            i++
        }

        if (i === computerChoises.length) {
            clearInterval(intervalId)
            flag = true
        }
    }
    const intervalId = setInterval(changeColor, 500)
}

//פונקציה לניהול המשחק
const newGame = () => {
    //כל עוד המשתמש באמצע משחק
    if (currentUser.level < 10 && currentUser.points > 0) {
        //איפוס מערך הרצף
        computerChoises = []
        //איפוס אינדקס רצף ההקשות של המשתמש
        indexOfArr = 0
        //הגרלת רצף חדש
        randomColors()
        //הצגת הרצף
        showColors()
    }
    else {
        //במקרה של ניצחון
        if (currentUser.level === 10) {
            //הצגת הודעה למשתמש (תמונה)- הגדרת המשתנה בתחילת העמוד
            winner.src = "../animation/win.gif"
            body.append(winner)
            winner.classList.add("win")
            pachyAudio.play()
            //מניעת אפשרות לחיצה על עיגולי האורות
            flag = false
            //התמונה נשארת עד שלוחץ על משחק חדש
            //או על כפתור מעבר לדף ישומים אם נוסיף
        }
        //כאשר המשחק נגמר-כישלון
        else {
            //הצגת הצבעים הכהים
            showDarkColors()
        }
        //הצגת כפתור למשחק חדש
        twoBtns.append(newGameBtn)
        newGameBtn.classList.add("newGBtn")
    }
}

//'ארוע לחיצה על 'משחק חדש
//מאתחל את לוח המשחק והנתונים של המשתמש
newGameBtn.addEventListener("click", e => {
    newGameBtn.remove()
    continueBtn.remove()
    gameOver.remove()
    winner.remove()
    currentUser.points = 100
    currentUser.timesSucsess = 0
    currentUser.level = 3
    showPoints()
    saveCurrentUser()
    newGame()
})

//ארוע לחיצה על המשך לשחק
continueBtn.addEventListener("click", e => {
    //צריך להוריד את הלחצן במקרה שאין משחק להמשיך-כאשר משחק בפעם הראשונה או שנגמר לו המשחק מכישלון או ניצחון
    newGameBtn.remove()
    continueBtn.remove()
    newGame()
})

const saveCurrentUser = () => {
    //שמירת נתוני המשתמש הנוכחי
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
    for (let j = 0; j < users.length; j++) {
        if (users[j].name === currentUser.name && users[j].password === currentUser.password) {
            //עדכון נתוני המשתמש הנוכחי בתוך מערך כל המשתמשים
            users[j] = currentUser
            break
        }
    }
    //שמירת מערך כל המשתמשים
    localStorage.setItem("users", JSON.stringify(users))
}

//פונקציה שמופעלת בזמן שהמשתמש עולה שלב
const showLevel = () => {
    pachyAudio.play()
    level.classList.add("levelUp")
    count.classList.add("goldcolor")
    winner.src = "../animation/win.gif"
    body.append(winner)
    winner.classList.add("win")
    setTimeout(() => {
        newGame()
        level.classList.remove("levelUp")
        count.classList.remove("goldcolor")
        winner.remove()
    }, 6000)
}

//הוספת אירוע לחיצה לכל הכפתורים
for (i = 0; i < colorBtns.length; i++) {
    let x = i
    colorBtns[i].addEventListener("click", e => {
        if (flag === true) //אם המחשב סיים להראות את הרצף
        {
            colorBtns[x].style.backgroundColor = arrColors[x]// הדלקת' הכפתור'
            setTimeout(() => {
                colorBtns[x].style.backgroundColor = newArrColors[x]// כיבוי' הכפתור'
            }, 200)
            if (x != computerChoises[indexOfArr++]) { //במקרה של טעות
                mistakeAudio.play();
                if (currentUser.points >= 20)
                    currentUser.points -= 20
                else {
                    currentUser.points = 0
                }
                saveCurrentUser()
                count.classList.add("countdn");
                setTimeout(() => {
                    count.classList.remove("countdn");
                }, 500);
                if (currentUser.points == 0) {  //כאשר נגמר המשחק-כישלון
                    //הצגת הודעה למשתמש (תמונה)- הגדרת המשתנה בתחילת העמוד
                    gameOver.src = "../image/GameOver.PNG"
                    gameOver.classList.add("game-over")
                    body.append(gameOver)
                    //מניעת לחיצה על כפתורי המשחק
                    flag = false
                    newGameBtn.classList.add("newGBtn")
                }
                saveCurrentUser()
                showPoints()
                newGame()
            }
            else {
                goodClickAudio.play() //אם המשתמש מקיש הקשה נכונה
            }
            //אם המשתמש סיים להקיש את הרצף
            if (indexOfArr === computerChoises.length) {
                finishRetzefAudio.play()
                count.classList.add("countup");
                currentUser.points += currentUser.level * 10
                currentUser.timesSucsess++
                saveCurrentUser()
                showPoints()
                setTimeout(() => {
                    count.classList.remove("countup");
                }, 500);
                //אם סיים שלב
                if (currentUser.timesSucsess === 5) {
                    currentUser.level++
                    showPoints()
                    saveCurrentUser()
                    setTimeout(() => {
                        showDarkColors()
                    }, 200)
                    //עליית שלב
                    if (currentUser.level < 10) {
                        currentUser.timesSucsess = 0
                        showLevel()
                    }
                    //ניצחון- לאחר עליית כל השלבים
                    else {
                        newGame()
                    }
                }
                
                else {//רצף נוסף באותו שלב
                    setTimeout(() => {
                        newGame()
                    }, 200)
                }
            }

        }

    })
}
