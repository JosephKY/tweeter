const configs = {
    user: {
        passwords: {
            minCharacters: 8,
            maxCharacters: 64
        },
        screennames: {
            minCharacters: 1,
            maxCharacters: 24,
        },
        usernames: {
            minCharacters: 3,
            maxCharacters: 24,
            allowedCharacters: [
                "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
                "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
                "0","1","2","3","4","5","6","7","8","9",
                "_","-","."
            ],
            reserved: [
                "about",
                "home",
                "admin",
                "administrator",
                "debug",
                "api",
                "search",
                "logout",
                "login"
            ]
        },
        bios: {
            maxCharacters: 128
        }
    },
    post: {
        maxCharacters: 140
    }
}

function tweetGenerator(username, screenname, content, created, favCount, isFavorited, id){
    const tweetContainer = document.createElement("div")
    tweetContainer.classList.add("tweet")

    const tweetHeader = document.createElement("div")
    tweetHeader.classList.add("tweetHeader")
    tweetContainer.appendChild(tweetHeader)

    const tweetScreenname = document.createElement("span")
    tweetScreenname.classList.add("tweetScreenname")
    tweetScreenname.innerHTML = screenname
    tweetHeader.appendChild(tweetScreenname)

    const tweetUsername = document.createElement("a")
    tweetUsername.classList.add("tweetUsername")
    tweetUsername.href = `/${username}`
    tweetUsername.innerHTML = `@${username}`
    tweetHeader.appendChild(tweetUsername) 

    const tweetContentContainer = document.createElement("div")
    tweetContentContainer.classList.add("tweetContent")
    tweetContainer.appendChild(tweetContentContainer)

    const tweetContent = document.createElement("p")
    tweetContent.innerHTML = content
    tweetContentContainer.appendChild(tweetContent)

    const tweetFavorite = document.createElement("div")
    tweetFavorite.classList.add("tweetFavorite")
    tweetContainer.appendChild(tweetFavorite)

    const tweetFavoriteButton = document.createElement("button")
    tweetFavoriteButton.classList.add("favoriteButton")
    tweetFavorite.appendChild(tweetFavoriteButton)

    const tweetFavoriteIcon = document.createElement("span")
    tweetFavoriteIcon.classList.add("favoriteIcon")
    if(isFavorited)tweetFavoriteIcon.classList.add("selected")
    tweetFavoriteButton.appendChild(tweetFavoriteIcon)

    const tweetFavoriteCount = document.createElement("span")
    tweetFavoriteCount.classList.add("favoriteCount")
    tweetFavoriteCount.innerHTML = favCount;
    if(isFavorited)tweetFavoriteCount.innerHTML = parseInt(tweetFavoriteCount.innerHTML) + 1
    tweetFavoriteButton.appendChild(tweetFavoriteCount)

    const tweetFooter = document.createElement("div")
    tweetFooter.classList.add("tweetFooter")
    tweetContainer.appendChild(tweetFooter)

    const tweetTimestamp = document.createElement("span")
    tweetTimestamp.innerHTML = new Date(created).toLocaleString()
    tweetFooter.appendChild(tweetTimestamp)

    tweetFavoriteButton.addEventListener("click", ()=>{
        if(!userId){
            return window.location.href = "/login"
        }
        if(tweetFavoriteIcon.classList.contains("selected")){
            tweetFavoriteIcon.classList.remove("selected")
            tweetFavoriteCount.innerHTML = parseInt(tweetFavoriteCount.innerHTML) - 1
            $.ajax({
                url: '/api/posts/favorite',
                type: 'DELETE',
                data: {
                    post: id
                }
            })
        } else {
            tweetFavoriteIcon.classList.add("selected")
            tweetFavoriteCount.innerHTML = parseInt(tweetFavoriteCount.innerHTML) + 1
            console.log(id)
            $.ajax({
                url: '/api/posts/favorite',
                type: 'POST',
                dataType: 'json',
                data: {
                    post: id
                }
            })
        }
        
    })

    return tweetContainer
}

function userData(id){
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/api/users/${id}`,
            type: 'GET',
            success: data=>{
                resolve(data)
            }
        }) 
    });
    
}

if(userId){
    document.getElementById("logout").addEventListener("click", ()=>{
        $.ajax({
            url: '/api/users/logout',
            type: 'POST',
            success: ()=>{
                window.location.href = "/home"
            }
        })
    })
}