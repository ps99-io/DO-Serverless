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
        const blogs = await Blog.find();
        if(blogs.length){
            return {
                statusCode: 200,
                body : blogs
            };
        }else{
            return {
                statusCode: 404,
                body: {message: 'Blogs not found'}
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