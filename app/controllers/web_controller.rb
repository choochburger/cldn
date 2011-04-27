class WebController < ApplicationController
  def show
    @items = WebItem.all
  end
end
