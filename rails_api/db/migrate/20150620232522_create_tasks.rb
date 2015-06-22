class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
      t.string :title
      t.text :description
      t.date :deadline
      t.string :urgency
      t.string :status
      t.integer :point

      t.timestamps
    end
  end
end
