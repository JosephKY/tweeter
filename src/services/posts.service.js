const { Favorite } = require("../models/favorite.model")
const { Tweet } = require("../models/tweet.model")

function hasFavorited(user, post){
    return new Promise(async (resolve, reject)=>{
        try {
            let existingFav = await Favorite.findOne({
                where: {
                    user: user.id,
                    post: post.id
                }
            })
            if(
                existingFav
            ){
                return resolve(existingFav)
            }
            resolve(false)
        } catch(e) {
            reject(e)
        }
    })
}

function favoriteCreate(user, post){
    return new Promise(async (resolve, reject)=>{
        try {
            Favorite.create({
                post: post.id,
                user: user.id
            })
        } catch(e) {
            reject(e)
        }
    })
}

function favoriteDelete(favorite){
    return new Promise(async (resolve, reject)=>{
        try {
            await favorite.destroy()
            resolve(true)
        } catch(e){
            reject(e)
        } 
    })
}

function postCreate(user, content){
    return new Promise(async (resolve, reject)=>{
        try {
            let newPost = await Tweet.create({
                content: content,
                author: user.id
            })
            resolve(newPost)
        } catch(e) {
            reject(e)
        }
    })
}

function postDelete(post){
    return new Promise(async (resolve, reject)=>{
        try {
            await post.destroy()
            resolve(true)
        } catch(e) {
            reject(e)
        }
    })
}

function postGet(id){
    return new Promise(async (resolve, reject)=>{
        try {
            let post = await Tweet.findOne({
                where: {
                    id: id
                }
            })
            resolve(post)
        } catch(e) {
            reject(e)
        }
    })
}

function postsLatest(){
    return new Promise(async (resolve, reject)=>{
        try {
            let posts = await Tweet.findAll({
                limit: 25
            })
            resolve(posts)
        } catch(e) {
            reject(e)
        }
    })
}

function postsUser(user){
    return new Promise(async (resolve, reject)=>{
        try {
            let posts = await Tweet.findAll({
                limit: 25,
                where: {
                    author: user.id
                }
            })
            resolve(posts)
        } catch(e) {
            reject(e)
        }
    })
}

module.exports = { hasFavorited, favoriteCreate, favoriteDelete, postCreate, postDelete, postsLatest, postsUser }