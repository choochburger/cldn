class AddWidthAndHeightToWebItems < ActiveRecord::Migration
  def self.up
    add_column :content_items, :width, :integer
    add_column :content_items, :height, :integer
  end

  def self.down
    remove_column :content_items, :height
    remove_column :content_items, :width
  end
end
