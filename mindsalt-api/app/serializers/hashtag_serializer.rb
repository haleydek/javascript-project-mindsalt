class HashtagSerializer
  include FastJsonapi::ObjectSerializer
  attributes :tag_name
end
