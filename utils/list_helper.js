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

module.exports = {
    dummy,
		totalLikes,
		totalLikesAllBlogs
}