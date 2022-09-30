import fetch from "node-fetch";
import mongoose, { mongo } from 'mongoose';

mongoose.connect();

const postSchema = new mongoose.Schema({

    inr:{
        type:Number,
        required:true

    },
    
});

const post = mongoose.model('Post',postSchema);

var minutes = 5, the_interval = minutes * 60 * 1000;

setInterval(async function getPosts(){
    const myPost = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr");
    const response = await myPost.json();
    for(let i=0;i<response.length;i++){
        const Post = new post({
            inr: response[i]['inr'],
        });
        post.Save();
    }

    console.log(response);

    getPosts();
},the_interval);
