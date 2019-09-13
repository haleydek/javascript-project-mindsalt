class PostsController < ApplicationController
    def index
        posts = Post.all

        options = {
            include: [:user, :category, :hashtags]
        }

        render json: PostSerializer.new(posts, options)
    end

    def update
        post = Post.find_by(id: params[:id])

        if post
            post.uplifts = post_params[:uplifts]
            if post.update!
                render json: post.to_json(:only => [:uplifts])
            else
                render json: { :message => "Post did not update" }
            end
        else
            render json: { :message => "Post was not found"}
        end
    end

    private

    def post_params
        params.permit(:uplifts, :content, :user_id, :category_id)
    end
end
