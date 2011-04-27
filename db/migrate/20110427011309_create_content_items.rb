class CreateContentItems < ActiveRecord::Migration
  def self.up
    create_table :content_items do |t|
      t.string :title
      t.text :description
      t.string :asset_link

      t.timestamps
    end
  end

  def self.down
    drop_table :content_items
  end
end
