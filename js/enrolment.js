const enrolmentBtn = document.querySelector(".newUserBtn")
const enrolmentInputName = document.querySelector(".enrolmentInputName")
const enrolmentInputEmail = document.querySelector(".enrolmentInputEmail")
const enrolmentInputPassword = document.querySelector(".enrolmentInputPassword")
const notValid=document.querySelector(".notValid")
let users =JSON.parse(localStorage.getItem("users")) ||[]
//פונקציה לשמירת הנתונים במערך המשתמשים
const saveUsers = () => {
    localStorage.setItem("users", JSON.stringify(users))
}
//פונקציה לבדיקת תקינות הסיסמא
const validPassword = () => {
    let num=false
    let lowLetter=false
    let highLetter=false

    if ((enrolmentInputPassword.value).length < 6)
         return false;

    for(let i=0; i<(enrolmentInputPassword.value).length;i++)
    {
        if((enrolmentInputPassword.value)[i]>='a' && (enrolmentInputPassword.value)[i]<='z')
            lowLetter=true;
        else if((enrolmentInputPassword.value)[i]>='A' && (enrolmentInputPassword.value)[i]<='Z')
            highLetter=true
        else if((enrolmentInputPassword.value)[i]>='0' && (enrolmentInputPassword.value)[i]<='9')
            num=true
    }
    if((!num)||(!lowLetter)||(!highLetter))
        return false
    
    return true
}
//אירוע הוספת משתמש למערך
enrolmentBtn.addEventListener("click", e => {
    let i = 0
    if (!validPassword()) {
        enrolmentBtn.href = 'javascript:void(0)';
        const newP=document.createElement("p")
        newP.innerText="הסיסמא אמורה להכיל לפחות 6 תווים שבינהם יש ספרה, אות גדולה ואות קטנה"
        newP.classList.add("eror")
        notValid.append(newP)
        setTimeout(() => {
            notValid.innerHTML = ""
        }, 5000)
    }

    else {
        for (i = 0; i < users.length; i++) {
            //בדיקה האם משתמש קיים
            if (users[i].name === enrolmentInputName.value && users[i].password === enrolmentInputPassword.value) {
                alert("משתמש קיים")
                enrolmentBtn.href = 'javascript:void(0)';
                break
            }
        }
     
   if(enrolmentInputName.value==""||enrolmentInputEmail.value=="")
            alert("חסר נתונים")
        //אם אינו קיים, הוספה למערך
        else if (i === users.length) {
            users.push({name: enrolmentInputName.value, 
                        password: enrolmentInputPassword.value, 
                        email: enrolmentInputEmail.value ,
                        points:100,
                        level:3,
                        timesSucsess:0})
            saveUsers()
            enrolmentBtn.href='../html/enter.html'

        }

    }
})