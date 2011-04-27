class CreateWebItems < ActiveRecord::Migration
  def self.up
    create_table :web_items do |t|
      t.string :title
      t.text :description
      t.text :thumbnail_url
      t.text :asset_url

      t.timestamps
    end
  end

  def self.down
    drop_table :web_items
  end
end
