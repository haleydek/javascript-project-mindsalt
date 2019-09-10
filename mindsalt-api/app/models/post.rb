class Post < ApplicationRecord
    belongs_to :category
    belongs_to :user
    has_many :post_hashtags
    has_many :hashtags, through: :post_hashtags
end
