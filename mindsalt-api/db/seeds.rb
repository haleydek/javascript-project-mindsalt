# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

let_go = Category.create(type: 'Let Go' )
gratitude = Category.create(type: 'Gratitude')
goal = Category.create(type: 'Goal')

robin = User.create(username: "Robin Myers")
greg = User.create(username: "Greg Doyle")

robin_post1 = Post.create(user_id: robin.id, category_id: let_go.id, content: "I am letting go of feeling guilty about forgetting my sister's birthday.", uplifts: 0)
Post.create(user_id: robin.id, category_id: gratitude.id, content: "I am grateful for having two healthy children.", uplifts: 0)
Post.create(user_id: robin.id, category_id: goal.id, content: "My goal for the day is to focus on the present when my busy schedule starts stressing me out.", uplifts: 0)

Post.create(user_id: greg.id, category_id: let_go.id, content: "I am letting go of believing I am not good enough.", uplifts: 0)
Post.create(user_id: greg.id, category_id: gratitude.id, content: "I am grateful for my partner who has provided constant support throughout my time in grad school.", uplifts: 0)
Post.create(user_id: greg.id, category_id: goal.id, content: "My goal for the day is to practice positive self talk.", uplifts: 0)

relationships = Hashtag.create(tag_name: "relationships")
grad_school = Hashtag.create(tag_name: "gradschool")
self_talk = Hashtag.create(tag_name: "selftalk")
present = Hashtag.create(tag_name: "bepresent")
guilty = Hashtag.create(tag_name: "guilty")
forget = Hashtag.create(tag_name: "forgetful")

