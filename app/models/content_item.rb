class ContentItem < ActiveRecord::Base
  def self.by_web_only
    #where('category = "web"')
    where :category => 'web'
  end

  def self.by_music_only
    where('category = "music"')
  end

  # could pass in a param for the data we want... not sure if this even makes sense

end
