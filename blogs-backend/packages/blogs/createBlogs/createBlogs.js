const mongoose = require('mongoose');

require('./db');

const blogsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
});

const Blog = mongoose.model('blogs', blogsSchema);


module.exports.main = async (args) => {
    try {
        if(Object.keys(args).length !==0){
            const blog = await Blog.create(args);
            console.log(blog);
            return {
                statusCode : 201,
                body: blog
            };
        }else{
            return {
                statusCode: 204
            }
        }
    }catch (err) {
        console.log(err);
        return{
            statusCode: 500,
            body: err.message
        }
    }
}