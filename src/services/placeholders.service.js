const usersService = require("./users.service")
const postsService = require("./posts.service")
require("dotenv").config()

class UserPlaceholder {
    static users = [];

    constructor(username, screenname, posts){
        this.screenname = screenname
        this.username = username
        this.posts = posts
        UserPlaceholder.users.push(this)
    }

    submit(){
        return new Promise(async (resolve, reject) => {
            let user = await usersService.userCreate(this.screenname, this.username, "password")
            let posts = [];
            this.posts.forEach(post=>{
                posts.push(post.send(user))
            })
            await Promise.all(posts)
            resolve()
        });
    }
}

class PostPlaceholder {
    constructor(content){
        this.content = content
    }

    send(user){
        return new Promise(async (resolve, reject) => {
            await postsService.postCreate(user, this.content)
            resolve()
        });
        
    }
}

if(process.env.MODE == "DEV"){
    const users = [
        new UserPlaceholder("tech_guru", "TechGuru42", [
            new PostPlaceholder("Excited for the latest JavaScript framework updates!"),
            new PostPlaceholder("Just built my first TypeScript app, loving it so far."),
        ]),
        new UserPlaceholder("nature_lover", "NatureLover88", [
            new PostPlaceholder("The hike this weekend was breathtaking! Here's to more adventures."),
        ]),
        new UserPlaceholder("fitness_fan", "FitLifeForever", [
            new PostPlaceholder("Deadlifted a new PR today! #fitness"),
            new PostPlaceholder("Meal prepping for the week. Let's crush those goals!"),
        ]),
        new UserPlaceholder("book_worm", "BookAddict99", [
            new PostPlaceholder("Just finished 'The Midnight Library'—what a thought-provoking read."),
            new PostPlaceholder("Looking for sci-fi book recommendations. Drop your favorites!"),
        ]),
        new UserPlaceholder("gamer_dude", "EpicGamerX", [
            new PostPlaceholder("Just hit Platinum rank in Overwatch. Time to grind for Diamond!"),
        ]),
        new UserPlaceholder("foodie_life", "FoodLover2023", [
            new PostPlaceholder("Tried the new Italian place downtown. The lasagna was heavenly."),
            new PostPlaceholder("Experimenting with sourdough bread this weekend. Wish me luck!"),
            new PostPlaceholder("Weekend brunch goals: pancakes, bacon, and coffee. #foodie"),
        ]),
        new UserPlaceholder("travel_bug", "WorldExplorer", [
            new PostPlaceholder("Wanderlust strikes again! Next stop: Iceland."),
        ]),
        new UserPlaceholder("movie_buff", "CinephileKing", [
            new PostPlaceholder("Finally watched Oppenheimer. Christopher Nolan never disappoints!"),
            new PostPlaceholder("Rewatching The Godfather tonight. Timeless classic."),
        ]),
        new UserPlaceholder("artsy_gal", "CanvasDreamer", [
            new PostPlaceholder("Started a new watercolor project today. It's coming along beautifully!"),
        ]),
        new UserPlaceholder("pet_parent", "FluffyCompanion", [
            new PostPlaceholder("My dog just learned a new trick! Such a smart pup."),
        ]),
        new UserPlaceholder("techie_nerd", "CodeAndChill", [
            new PostPlaceholder("Debugging until 2 AM is the real coder's life."),
            new PostPlaceholder("Learning Rust—this language is a beast but so worth it."),
        ]),
        new UserPlaceholder("sports_fanatic", "AllThingsSports", [
            new PostPlaceholder("What a game last night! That buzzer-beater was insane."),
        ]),
    ];

    // Send placeholder users
    users.forEach(async user => {
        await user.submit()
    });
}