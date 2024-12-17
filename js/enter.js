let users = JSON.parse(localStorage.getItem("users")) || []
let currentUser
const enterBtn = document.querySelector(".enterBtn")
const enterInputName = document.querySelector(".enterInputName")
const enterInputPassword = document.querySelector(".enterInputPassword")
const enterErr = document.querySelector(".err")
console.log(enterErr);
const saveCurrentUser = () => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser))
}
enterBtn.addEventListener("click", e => {
    currentUser = users.find(element => {
        return element.name === enterInputName.value && element.password === enterInputPassword.value
    })
    if (currentUser != null) {
        saveCurrentUser()
        enterBtn.href = '../html/application.html';
    }
    else {
        enterBtn.href = 'javascript:void(0)';
        //יצירת הודעה למשתמש במקרה שהכניס נתונים שגויים
        const enterNewDiv = document.createElement("div")
        const enterNewp = document.createElement("a")
        enterNewp.innerText = " שם המשתמש או הסיסמא שגויים נסה שוב או"
        enterNewp.style.color = "red"

        const enterNewA = document.createElement("a")
        enterNewA.innerText = " לחץ להרשמה  "
        enterNewA.href = '../html/enrolment.html'

        enterNewDiv.append(enterNewp)
        enterNewDiv.append(enterNewA)
        enterErr.append(enterNewDiv)
        //פונקציה שמורידה את ההודעה לאחר כמה שניות
        setTimeout(() => {
            enterNewDiv.innerHTML = ""
        }, 3000)
    }
})
