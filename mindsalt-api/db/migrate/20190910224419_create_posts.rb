class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.integer :user_id
      t.integer :category_id
      t.string :content
      t.integer :uplifts

      t.timestamps
    end
  end
end
