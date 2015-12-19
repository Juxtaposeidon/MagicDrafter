class DraftController < ApplicationController
  def new
    @@newdraft = Draft.new
    @startingpack = @@newdraft.player1.currentpack.contents
  end

  def addcard
    @@newdraft.player1.addPool(Card.find(params['id']))
    @@newdraft.player1.removeCard(Card.find(params['id']))
    # p @@newdraft.player2.pack1.contents
    @@newdraft.cpuplayers.each {|player| player.cpuChoose}
    @@newdraft.rotatePacks
    @pack = @@newdraft.player1.currentpack.contents
    p @pack
    respond_to do |format|
      format.js #Because there is an AJAX call, Rails pings map.js.erb. Go to map.js.erb
    end
  end

end
