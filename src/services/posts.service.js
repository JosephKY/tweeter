const { Favorite } = require("../models/favorite.model")
const { Tweet } = require("../models/tweet.model")

function isFavoritedConverter(postOrPosts, user){
    return new Promise(async (resolve, reject) => {
        try {
            if(Array.isArray(postOrPosts)){
                for(let post of postOrPosts){
                    post.dataValues.isFavorited = await hasFavorited(user, post)
                }
            } else {
                postOrPosts.dataValues.isFavorited = await hasFavorited(user, postOrPosts)
            }
            resolve(postOrPosts)
        } catch (e) {
            reject(e)
        }
        
    });
}

function hasFavorited(user, post){
    if(!user)return false;
    return new Promise(async (resolve, reject)=>{
        try {
            let existingFav = await Favorite.findOne({
                where: {
                    user: user.id,
                    post: post.id
                }
            })
            if(
                existingFav == null
            ){
                return resolve(false)
            }
            resolve(existingFav)
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

function favoritesUser(user, limit=25){
    return new Promise(async (resolve, reject) => {
        try {
            let favorites = await Favorite.findAll({
                limit: limit,
                where: {
                    user: user.id
                }
            })
            let posts = [];
            for(let favorite of favorites){
                posts.push(await Tweet.findOne({
                    where: {
                        id: favorite.post
                    }
                }))
            }
            resolve(posts)
        } catch(e) {
            reject(e)
        }
    });
}

module.exports = { hasFavorited, favoriteCreate, favoriteDelete, postCreate, postGet, postDelete, postsLatest, postsUser, isFavoritedConverter, favoritesUser }