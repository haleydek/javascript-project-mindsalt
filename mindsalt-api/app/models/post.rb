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

    def hashtags_attributes=(tag_attributes)
        tag_attributes.values.each do |tag_attribute|
            hashtag = Hashtag.find_or_create_by(tag_attribute)
            self.hashtags << hashtag
        end
    end
end
