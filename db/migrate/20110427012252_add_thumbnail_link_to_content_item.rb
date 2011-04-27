class AddThumbnailLinkToContentItem < ActiveRecord::Migration
  def self.up
    add_column :content_items, :thumbnail_link, :string
  end

  def self.down
    remove_column :content_items, :thumbnail_link
  end
end
