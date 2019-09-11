class Category < ApplicationRecord
    has_many :posts

    validates :type, presence: true
    validates :type, uniqueness: true
end
