const latest = document.getElementById("tweets")

$.ajax({
    url: '/api/posts/latest',
    type: 'GET',
    success: data=>{
        document.getElementById("latestLoading").remove()
        if(!Array.isArray(data) || data.length == 0)return;
        data.forEach(async tweetData=>{
            const user = await userData(tweetData.author)
            latest.appendChild(tweetGenerator(
                user.username,
                user.screenname,
                tweetData.content,
                tweetData.created,
                tweetData.favoritesCount,
                tweetData.isFavorited,
                tweetData.id
            ))
        })
        console.log(data)
    }
})