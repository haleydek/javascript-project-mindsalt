class PostsController < ApplicationController
    def index
        posts = Post.all

        options = {
            include: [:category, :hashtags]
        }

        render json: PostSerializer.new(posts, options)
    end

    def create

    end

    def update
        post = Post.find_by(id: params[:id])

        if post
            if post.update!(uplifts: post_params[:uplifts])
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
        params.permit(:uplifts, :content, :category_id, hashtags_attributes: [:tag_name])
    end
end
