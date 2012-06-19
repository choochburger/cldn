class ApplicationController < ActionController::Base
  protect_from_forgery

  def index
    @music = ContentItem.by_music_only
    @web   = ContentItem.by_web_only

    # bootstrap data (no need to make API calls since this is all static)
    @music_json = @music.map {|item| {
      :url   => item.asset_url,
      :title => item.title,
      :type  => item.kind }
    }.to_json.html_safe

    @web_json = @web.map {|item| {
      :url => item.asset_url,
      :type => item.kind,
      :width => item.width,
      :height => item.height}
    }.to_json.html_safe
  end

end
