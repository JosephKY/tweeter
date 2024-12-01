module.exports = {
    passwords: {
        minCharacters: 8,
        maxCharacters: 64
    },
    screennames: {
        minCharacters: 1,
        maxCharacters: 24,
        reserved: [
            "about",
            "home",
            "admin",
            "administrator",
            "debug",
            "api"
        ]
    },
    usernames: {
        minCharacters: 3,
        maxCharacters: 24,
        allowedCharacters: [
            "a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z",
            "A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z",
            "0","1","2","3","4","5","6","7","8","9",
            "_","-","."
        ]
    }
}