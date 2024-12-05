const loginUsername = document.getElementById('username');
const loginPassword = document.getElementById("password")
const loginError = document.getElementById("loginerror")
const loginSubmit = document.getElementById("login")

loginSubmit.addEventListener("click", ()=>{
    let username = loginUsername.value
    let password = loginPassword.value

    if(!username && !password){
        return loginError.innerHTML = "Please enter a username and password"
    }

    if(!username){
        return loginError.innerHTML = "Please enter a username"
    }

    if(!password){
        return loginError.innerHTML = "Please enter a password"
    }

    if(username.length > configs.user.usernames.maxCharacters){
        return loginError.innerHTML = "User not found"
    }

    if(password.length > configs.user.passwords.maxCharacters){
        return loginError.innerHTML = "Incorrect password"
    }

    loginSubmit.disabled = true;

    $.ajax({
        url: '/api/users/login',
        type: 'POST',
        data: {
            username: username,
            password: password
        },
        success: ()=>{
            window.location.href = "/home"
        },
        complete: ()=>{
            loginSubmit.disabled = false
        },
        error: e=>{
            switch (e.status) {
                case 404:
                    loginError.innerHTML = "User not found"
                    break;

                case 401:
                    loginError.innerHTML = "Incorrect password"
                    break;
            
                default:
                    loginError.innerHTML = "An unknown error occurred"
                    break;
            }
            console.log(e)
        }
    })
})

const createUsername = document.getElementById("createusername")
const createScreenname = document.getElementById("createscreenname")
const createPassword = document.getElementById("createpassword")
const createVerify = document.getElementById("createverifypassword")
const createError = document.getElementById("createerror")
const createSubmit = document.getElementById("create")

createSubmit.addEventListener("click", ()=>{
    let username = createUsername.value
    let screenname = createScreenname.value
    let password = createPassword.value
    let verify = createVerify.value

    if(!username){
        return createError.innerHTML = "Please enter a username"
    }

    if(!screenname){
        return createError.innerHTML = "Please enter a display name"
    }

    if(!password){
        return createError.innerHTML = "Please enter a password"
    }

    if(!verify){
        return createError.innerHTML = "Please verify your password"
    }

    if(password != verify){
        return createError.innerHTML = "Passwords do not match"
    }

    if(username.length > configs.user.usernames.maxCharacters){
        return createError.innerHTML = `Username exceeds ${configs.user.usernames.maxCharacters} character limit`
    }

    if(screenname.length > configs.user.screennames.maxCharacters){
        return createError.innerHTML = `Display name exceeds ${configs.user.screennames.maxCharacters} character limit`
    }

    if(password.length > configs.user.passwords.maxCharacters){
        return createError.innerHTML = `Password exceeds ${configs.user.passwords.maxCharacters} character limit`
    }

    if(username.length < configs.user.usernames.minCharacters){
        return createError.innerHTML = `Username must be at least ${configs.user.usernames.minCharacters} characters long`
    }

    if(screenname.length < configs.user.screennames.minCharacters){
        return createError.innerHTML = `Display name must be at least ${configs.user.screennames.minCharacters} characters long`
    }

    if(password.length < configs.user.passwords.minCharacters){
        return createError.innerHTML = `Password must be at least ${configs.user.passwords.minCharacters} characters long`
    }

    if(configs.user.usernames.reserved.includes(username)){
        return createError.innerHTML = "Username is reserved. Please choose a different one"
    }

    for(let char of username){
        if(!configs.user.usernames.allowedCharacters.includes(char)){
            return createError.innerHTML = "Username contains invalid characters. Only alphanumeric characters, _, -, and . are permitted"
        }
    }

    $.ajax({
        'url': '/api/users/create',
        'type': 'POST',
        'data': {
            username: username,
            screenname: screenname,
            password: password
        },
        success: ()=>{
            window.location.href = "/home"
        },
        error: e=>{
            switch (e.status) {
                case 451:
                    createError.innerHTML = "Username is already taken"
                    break;
                default:
                    createError.innerHTML = "An unknown error occurred"
                    break;
            }
            console.log(e)
        }
    })


})