class AddKindToContentItems < ActiveRecord::Migration
  def self.up
    add_column :content_items, :kind, :string
  end

  def self.down
    remove_column :content_items, :kind
  end
end
