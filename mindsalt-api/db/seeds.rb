# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Category seeds - These are the only three categories that should be in the db.
let_go = Category.create(name: "Let Go")
gratitude = Category.create(name: "Gratitude")
goal = Category.create(name: "Goal")

# User seeds
robin = User.create(username: "Robin Myers")
greg = User.create(username: "Greg Doyle")

# Post seeds
robin_post1 = Post.create(user_id: robin.id, category_id: let_go.id, content: "I am letting go of feeling guilty about forgetting my sister's birthday.", uplifts: 0)
robin_post2 = Post.create(user_id: robin.id, category_id: gratitude.id, content: "I am grateful for having two healthy children.", uplifts: 0)
robin_post3 = Post.create(user_id: robin.id, category_id: goal.id, content: "My goal for the day is to focus on the present when my busy schedule starts stressing me out.", uplifts: 0)

greg_post1 = Post.create(user_id: greg.id, category_id: let_go.id, content: "I am letting go of believing I am not good enough.", uplifts: 0)
greg_post2 = Post.create(user_id: greg.id, category_id: gratitude.id, content: "I am grateful for my partner who has provided constant support throughout my time in grad school.", uplifts: 0)
greg_post3 = Post.create(user_id: greg.id, category_id: goal.id, content: "My goal for the day is to practice positive self talk.", uplifts: 0)

# Hashtag seeds
busy_tag = Hashtag.create(tag_name: "busy")

robin_post1.hashtags.create(tag_name: "guilty")
robin_post1.hashtags.create(tag_name: "forgetful")

robin_post3.hashtags.create(tag_name: "bepresent")
robin_post3.hashtags << busy_tag

greg_post1.hashtags.create(tag_name: "selfconfidence")

greg_post2.hashtags.create(tag_name: "gradschool")
greg_post2.hashtags.create(tag_name: "healthyrelationships")
greg_post2.hashtags << busy_tag

greg_post3.hashtags.create(tag_name: "selftalk")