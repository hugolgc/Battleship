$(() => {

  
  const socket = io()
  const target = $('#target')
  const board = $('#board')
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j']
  const limite = 31
  let pseudo = adversaire = ''
  var ships = []
  var box = 0


  $('#form').submit(e => {
    e.preventDefault()
    pseudo = $('#pseudo').val()
    adversaire = $('#adversaire').val()
    $('#form').attr('class', 'hidden')
    $('header').attr('class', 'fixed left-0 top-0 right-0 flex justify-center items-center pt-8')
    $('main').attr('class', 'flex')
  })


  letters.map(first => {
    letters.map(second => {
      target.append(`<div class="h-12 w-12 p-2"><div id="${ first + second }0" class="target h-8 w-8 bg-blue-900 cursor-pointer rounded-full"></div></div>`)
      board.append(`<div class="h-12 w-12 p-2"><div id="${ first + second }" class="board h-8 w-8 bg-blue-900 cursor-pointer rounded-full"></div></div>`)
    })
  })


  $('.board').click((event) => {
    if (box < limite) {
      box++
      $(`#${ event.target.id }`).attr('class', 'h-8 w-8 bg-green-600 rounded-full')
      ships.push(event.target.id)
    }
  })


  $('.target').click(e => {
    if (box !== limite) alert('Placez tout vos bateaux !')
    else {
      socket.emit('question', {
        envoyeur: pseudo,
        receveur: adversaire,
        position: e.target.id.substring(0, 2)
      })
    }
  })


  socket.on('question', data => {
    if (data.receveur === pseudo) {
      socket.emit('reponse', {
        receveur: data.envoyeur,
        position: data.position,
        state: ships.includes(data.position)
      })
      let className = ships.includes(data.position) ? 'h-8 w-8 bg-red-600 rounded-full' : 'h-8 w-8 bg-gray-900 rounded-full'
      $(`#${ data.position }`).attr('class', className)
    }
  })


  socket.on('reponse', data => {
    if (data.receveur === pseudo) {
      let className = data.state ? 'h-8 w-8 bg-red-600 rounded-full' : 'h-8 w-8 bg-white rounded-full'
      $(`#${ data.position }0`).attr('class', className)
    }
  })

})