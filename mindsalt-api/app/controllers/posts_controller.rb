class PostsController < ApplicationController
    def index
        posts = Post.all

        options = {
            include: [:user, :category, :hashtags]
        }

        render json: PostSerializer.new(posts, options)
    end
end
