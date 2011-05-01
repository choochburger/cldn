class Reset < ActiveRecord::Migration
  def self.up
    create_table "content_items", :force => true do |t|
      t.string "title"
      t.text   "description"
      t.string "asset_url"
      t.string "thumbnail_url"
      t.string "kind"
      t.string "category"
      t.datetime "update_at"
      t.datetime "create_at"
    end
  end

  def self.down
    drop_table "content_items"
  end

end
