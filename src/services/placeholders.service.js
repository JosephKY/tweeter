const usersService = require("./users.service")
const postsService = require("./posts.service")
require("dotenv").config()

class UserPlaceholder {
    static users = [];

    constructor(username, screenname, bio, posts){
        this.screenname = screenname
        this.username = username
        this.bio = bio
        this.posts = posts
        UserPlaceholder.users.push(this)
    }

    submit(){
        return new Promise(async (resolve, reject) => {
            let user = await usersService.userCreate(this.screenname, this.username, "password")
            user.bio = this.bio
            await user.save()
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

async function main(){
    if(process.env.MODE == "DEV"){
        const users = [
            new UserPlaceholder(
                "tech_guru",
                "TechGuru42",
                "Tech enthusiast, always exploring the latest trends in programming and technology.",
                [
                    new PostPlaceholder("Excited for the latest JavaScript framework updates!"),
                    new PostPlaceholder("Just built my first TypeScript app, loving it so far."),
                ]
            ),
            new UserPlaceholder(
                "nature_lover",
                "NatureLover88",
                "Outdoor adventurer with a love for hiking, camping, and all things nature.",
                [
                    new PostPlaceholder("The hike this weekend was breathtaking! Here's to more adventures."),
                ]
            ),
            new UserPlaceholder(
                "fitness_fan",
                "FitLifeForever",
                "Fitness enthusiast and meal prep expert on a mission to crush personal goals.",
                [
                    new PostPlaceholder("Deadlifted a new PR today! #fitness"),
                    new PostPlaceholder("Meal prepping for the week. Let's crush those goals!"),
                ]
            ),
            new UserPlaceholder(
                "book_worm",
                "BookAddict99",
                "Bookworm with a passion for thought-provoking novels and sci-fi adventures.",
                [
                    new PostPlaceholder("Just finished 'The Midnight Library'—what a thought-provoking read."),
                    new PostPlaceholder("Looking for sci-fi book recommendations. Drop your favorites!"),
                ]
            ),
            new UserPlaceholder(
                "gamer_dude",
                "EpicGamerX",
                "Competitive gamer grinding ranks and always looking for the next challenge.",
                [
                    new PostPlaceholder("Just hit Platinum rank in Overwatch. Time to grind for Diamond!"),
                ]
            ),
            new UserPlaceholder(
                "foodie_life",
                "FoodLover2023",
                "Food lover who enjoys trying new restaurants and experimenting in the kitchen.",
                [
                    new PostPlaceholder("Tried the new Italian place downtown. The lasagna was heavenly."),
                    new PostPlaceholder("Experimenting with sourdough bread this weekend. Wish me luck!"),
                    new PostPlaceholder("Weekend brunch goals: pancakes, bacon, and coffee. #foodie"),
                ]
            ),
            new UserPlaceholder(
                "travel_bug",
                "WorldExplorer",
                "Passionate traveler with a bucket list that grows with every trip.",
                [
                    new PostPlaceholder("Wanderlust strikes again! Next stop: Iceland."),
                ]
            ),
            new UserPlaceholder(
                "movie_buff",
                "CinephileKing",
                "Cinema aficionado who loves dissecting films and discovering timeless classics.",
                [
                    new PostPlaceholder("Finally watched Oppenheimer. Christopher Nolan never disappoints!"),
                    new PostPlaceholder("Rewatching The Godfather tonight. Timeless classic."),
                ]
            ),
            new UserPlaceholder(
                "artsy_gal",
                "CanvasDreamer",
                "Creative soul bringing visions to life through watercolor and other art forms.",
                [
                    new PostPlaceholder("Started a new watercolor project today. It's coming along beautifully!"),
                ]
            ),
            new UserPlaceholder(
                "pet_parent",
                "FluffyCompanion",
                "Loving pet parent sharing the joys of life with my furry best friend.",
                [
                    new PostPlaceholder("My dog just learned a new trick! Such a smart pup."),
                ]
            ),
            new UserPlaceholder(
                "techie_nerd",
                "CodeAndChill",
                "Code junkie diving into new languages and debugging late into the night.",
                [
                    new PostPlaceholder("Debugging until 2 AM is the real coder's life."),
                    new PostPlaceholder("Learning Rust—this language is a beast but so worth it."),
                ]
            ),
            new UserPlaceholder(
                "sports_fanatic",
                "AllThingsSports",
                "Sports enthusiast passionate about thrilling games and epic moments.",
                [
                    new PostPlaceholder("What a game last night! That buzzer-beater was insane."),
                ]
            ),
        ];
    
        let first = users[0];
        if(await usersService.userGetByUsername(first.username)){
            console.log("Placeholders already exist")
            return;
        }
    
        users.forEach(async user => {
            await user.submit()
        });
    }
}

main()