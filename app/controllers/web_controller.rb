class WebController < ApplicationController
  def show
    @items = ContentItem.by_web_only 

    # expose data to view via json. really don't need the width/height except
    # for flash content. any way to only show for those?

    @items_json = @items.map {|item| { 
                                :url => item.asset_url,
                                :type => item.kind,
                                :width => item.width,
                                :height => item.height
                              }
                            }.to_json
  end
end
