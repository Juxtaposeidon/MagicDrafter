class Player
  attr_reader :pool, :currentpack
  def initialize
    @pool = []
    @currentpack = Pack.new
  end

  def addPool(card)
    @pool << card
  end

  def removeCard(card)
    @currentpack.contents.delete_if {|item| item == card}
  end

  def cpuChoose
    removeCard(@currentpack.contents.sort_by{|card| card.rank}.reverse[0])
  end

  def receivePack(newpack)
    p 'inside receivePACK****'
    p newpack
    @currentpack = newpack
  end

end
