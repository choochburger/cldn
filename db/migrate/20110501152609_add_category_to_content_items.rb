class AddCategoryToContentItems < ActiveRecord::Migration
  def self.up
    add_column :content_items, :category, :string
  end

  def self.down
    remove_column :content_items, :category
  end
end
