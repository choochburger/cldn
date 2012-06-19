class ContentItem < ActiveRecord::Base

  self.include_root_in_json = false

  def self.by_web_only
    where :category => 'web'
  end

  def self.by_music_only
    where :category => 'music'
  end
end
