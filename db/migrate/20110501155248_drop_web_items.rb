class DropWebItems < ActiveRecord::Migration
  def self.up
  end

  def self.down
    drop_table :web_items
  end
end
