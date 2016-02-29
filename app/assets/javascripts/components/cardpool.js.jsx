var counter = 0
var Cardpool = React.createClass({
  getInitialProps: function(){
    return{
      cards: []
    }
  },

  getInitialState: function(){
    return{
      cards: this.props.cards
    }
  },
  getCards: function(pick){
    console.log(pick)
    var nospam = 0
    if(nospam==0){
      nospam = 1
      $.ajax({
        url: '/drafts/update',
        method: "PUT",
        data: {'cardid': pick}
      })
      .done(function(){
        $.ajax({
          url: '/drafts',
          method: "GET"
        }).done(function(result){
          console.log(result)
          nospam = 0
          $('.cardpacksection').html(result['partial'])
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
    var react = this
    var cardpack = this.state.cards.map(function(item){
      return (
        <img src={'/assets/' + item.id} className="cardimage" key={item.id} onClick={react.getCards.bind(react, item.id)}></img>
      )
    })
    return(
      <div>
        {cardpack}
      </div>
    )
  }
})
// var counter = 0
// var Card = React.createClass({
//   getInitialProps: function(){
//       return{
//         id: undefined,
//         image: undefined
//       }
//     },

//   getInitialState: function(){
//     return{
//       id: this.props.id,
//       image: "/assets/" + this.props.id
//     }
//   },

//   getCards: function(pick){
//     var nospam = 0
//     if(nospam==0){
//       nospam = 1
//       $.ajax({
//         url: '/drafts/update',
//         method: "PUT",
//         data: {'cardid': pick}
//       })
//       .done(function(){
//         $.ajax({
//           url: '/drafts',
//           method: "GET"
//         })
//       })
//     }
//   },
//   render: function(){
//     return(
//         <img src={this.state.image} className="cardimage" onClick={this.getCards.bind(this, this.state.id)}></img>
//     )
//   }
// })