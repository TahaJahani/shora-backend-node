module.exports = {
    make: (req, model) => {
        let is_liked = model.likes.some(like => like.user_id === req.user.id)
        return {
            id: model.id,
            status: model.status,
            body: model.body,
            likes_count: model.likes.length,
            is_liked: is_liked,
            category: model.category ? model.category.name : 'عمومی',
            created_at: model.created_at,
        }
    },

    collection: (req, models) => {
        return models.map(item => this.make(req, item))
    }
}