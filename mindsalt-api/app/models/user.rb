class User < ApplicationRecord
    has_many :posts

    validates :username, presence: true
    validates :username, uniqueness: true
    validates :username, length: { in: 3..20 }
end
