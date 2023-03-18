const dummy = (blogs) => {
    return 1
}

const totalLikes = (listWithOneBlog) => {
	const likes = listWithOneBlog[0].likes;

	return likes
}

const totalLikesAllBlogs = (listWithBlogs) => {
	const allLikes = listWithBlogs.reduce((accumulator, currentValue) => {
		return currentValue.likes + accumulator
	}, 0);

	return allLikes
}

const mostLikedBlog = (listWithBlogs) => {
	let blogWithMostLikes = {
		likes: 0
	}

	for (let i = 0; i < listWithBlogs.length; i++) {
		const blog = listWithBlogs[i];

		if (blog.likes > blogWithMostLikes.likes ) {
			blogWithMostLikes = blog
		}
	}

	return blogWithMostLikes 
}

module.exports = {
    dummy,
		totalLikes,
		totalLikesAllBlogs,
		mostLikedBlog
}