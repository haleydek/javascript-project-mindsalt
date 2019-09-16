class Post < ApplicationRecord
    belongs_to :category
    has_many :post_hashtags
    has_many :hashtags, through: :post_hashtags

    validates :content, presence: true
    validates :uplifts, presence: true

    accepts_nested_attributes_for :hashtags

    # Removed user_id column from ActiveRecord cache before dropping the Users table
    def self.columns
        super.reject { |column| column.name == "user_id" }
    end

    def hashtags_attributes=(tag_attributes_array)
        tag_attributes_array.each do |tag_name_hash|
            tag_name_hash.values.each do |tag|
                hashtag = Hashtag.find_or_create_by(tag_name: tag)
                self.hashtags << hashtag
            end
        end
    end
end
