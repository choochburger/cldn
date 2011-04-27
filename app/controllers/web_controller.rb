class WebController < ApplicationController
  def show
    @items = ContentItem.all
  end
end
