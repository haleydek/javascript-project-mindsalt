class PostsController < ApplicationController
    def index
        posts = Post.all

        options = { include: [:category, :hashtags] }

        render json: PostSerializer.new(posts, options)
    end

    def create
        newPosts = []
        errors = []

        options = { include: [:category, :hashtags] }

        new_post_params["post"].each do |post_hash|
            category = category.find_by(id: post_hash[:category_id])

            post = Post.new(content: post_hash[:content], uplifts: 0)
            post.category = category
            post.hashtags_attributes=(post_hash[:hashtags_attributes])
        
            if post.save!
                newPosts << post
            else
                errors << post.errors.full_messages
            end
        end

        if errors.length > 0
            render json: { :message => errors.join(". ") }
        else
            render json: PostSerializer.new(newPosts, options)
        end
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

    def new_post_params
        params.permit(post: [:uplifts, :content, :category_id, hashtags_attributes: [:tag_name]])
    end
end
