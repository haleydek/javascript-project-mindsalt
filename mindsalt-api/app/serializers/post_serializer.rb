class PostSerializer
  include FastJsonapi::ObjectSerializer
  attributes :content, :uplifts
  belongs_to :category
  has_many :hashtags
end
