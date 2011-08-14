class MusicController < ApplicationController
  def show
    @items = ContentItem.by_music_only

    # expose data to view via json. really don't need the width/height except
    # for flash content. any way to only show for those?

    @items_json = @items.map {|item| {
                                :url   => item.asset_url,
                                :title => item.title,
                                :type  => item.kind
                              }
                            }.to_json
  end
end
