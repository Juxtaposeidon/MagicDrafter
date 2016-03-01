var counter = 0
var Draftpool = React.createClass({
  getInitialState: function(){
    return{cards: this.props.cards}
  },

  getCards: function(pick){
    var react = this
    var nospam = 0
    if(nospam==0){
      nospam = 1
      $.ajax({
        url: '/drafts/update',
        method: 'PUT',
        data: {'cardid': pick}
      })
      .done(function(){
        $.ajax({
          url: '/drafts',
          method: "GET"
        })
        .done(function(result){
          nospam = 0
          react.setState({
            cards: result['pack']
          })
          if(counter < 14){
            $("#draftedcards").append('[' + result['cardname'] + ']  ')
          }
          else if(counter < 28){
            $("#draftedcards2").append('[' + result['cardname'] + ']  ')
          }
          else{
            $("#draftedcards3").append('[' + result['cardname'] + ']  ')
          }
          counter++;
          if(counter == 42){
            $('.cardpacksection').html("<H3>The draft is now over</H3>")
          }
        })
      })
    }
  },
  render: function(){
    var cards = this.state.cards.map(function(item){
      return <Card
                onClick={this.getCards.bind(this,item.id)}
                key={item.id}
                id={item.id}
              />
    }, this)
    return(
      <div>{cards}</div>
    )
  }
})