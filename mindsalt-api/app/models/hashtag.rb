class Hashtag < ApplicationRecord
    has_many :post_hashtags
    has_many :posts, through: :post_hashtags

    validates :tag_name, presence: true
    validates :tag_name, uniqueness: true
    validates :tag_name, length: { maximum: 30 }
    validates :tag_name, format: { without: /[\s\W]+/, message: "only allows letters" }
end
