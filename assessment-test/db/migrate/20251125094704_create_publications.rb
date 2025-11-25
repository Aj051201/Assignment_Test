class CreatePublications < ActiveRecord::Migration[8.0]
  def change
    create_table :publications do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title
      t.text :content
      t.integer :status

      t.timestamps
    end
  end
end
