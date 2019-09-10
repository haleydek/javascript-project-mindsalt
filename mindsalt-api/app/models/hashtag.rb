class Hashtag < ApplicationRecord
    has_many :post_hashtags
    has_many :posts, through: :post_hashtags
end
