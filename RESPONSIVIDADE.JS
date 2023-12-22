//Principal content
const TextElement = document.getElementById('text');
const OptionButtonsElement = document.getElementById('opt-btns');
const ImageElement = document.getElementById('img-cnt');
const PageElement = document.getElementById('page-nm');

let state = {}
function StartGame() {
  state = {}
  ShowTextNode(1)
}

function ShowTextNode(TextNodeIndex) {
//Texts
const TextNode = TextNodes.find(TextNodes => TextNodes.id === TextNodeIndex)
TextElement.innerText = TextNode.Text

//Images
ImageElement.innerHTML = TextNode.Image

// Pages
PageElement.innerText = `${TextNode.id}`

//Buttons & Options
while (OptionButtonsElement.firstChild) {
  OptionButtonsElement.removeChild(OptionButtonsElement.firstChild)
}
TextNode.Options.forEach(Options => {
  if (ShowOption(Options)) {
const button = document.createElement('button')
button.innerText = Options.Text
button.classList.add('btn')
button.addEventListener('click', () => SelectOption(Options))
OptionButtonsElement.appendChild(button)
  }
})

}

//State checker (hide/show some options)
function ShowOption(Options) {
  return Options.requiredState == null || Options.requiredState(state)
}

//Game over 
function SelectOption(Options) {
const NextTextNodeId = Options.NextText
if (NextTextNodeId <= 0) {
  localStorage.setItem('progress','1')
  return StartGame()
}

//State set
state = Object.assign(state, Options.setState)
ShowTextNode(NextTextNodeId)
}

//--------------------------------------------------------------------------------------------------------
//Text,Images,Page counter and options/state
const TextNodes = [
  {
    id : 1,
    Text: 'No mundo existem dois tipos de reis, os tiranos e os que servem de exemplo pro povo, você está preparado pra ser qual deles?',
    Image: '<img src="IMG/img-1.png" alt="" style ="width: 30%;" />',
    Options: [
      {
        Text: 'Exemplo pro povo',
        //setState: { Exemplo: true},
        NextText: 2 
      }, 

      {
        Text: 'Tirano',
        NextText: 3
      },

      {
        Text:'...',
        NextText: 4
      },
    ],
  },

  {
    id: 2, 
    Text: '"Ótimo, então sucumba agora, o povo não necessita de um rei fraco..." \n Uma escuridão profunda te envolve por todos os cantos e agora cinzas tomam o seu lugar.',
    Image:'' ,
    Options: [
      {
        Text: 'Reiniciar',
        //requiredState: (currentState) => currentState.Exemplo,
        //setState: { Exemplo:false, Morto:true},
        NextText: -1
      }, 

    ]
  },

  {
    id: 3, 
    Text: '"Alguem que cultiva o respeito através do medo, pode ate durar um pouco mais, porem jamais tera o respeito genuino de seu povo, você não serve para ser rei." \n Você apenas cai no chão, porem está sem forças, suas vistas estão pesadas, talvez esse seja seu fim...',
    Image:'' ,
    Options: [
      {
        Text: 'Reiniciar',
        //requiredState: (currentState) => currentState.Exemplo,
        //setState: { Exemplo:false, Morto:true},
        NextText: -1
      }, 

    ]
  },

  {
    id: 4, 
    Text: '"O povo não precisa de um rei indeciso, então escolha de uma vez por todas"',
    Image:'' ,
    Options: [
      {
        Text: 'Exemplo pro povo',
        //setState: { Exemplo: true},
        NextText: 2 
      }, 

      {
        Text: 'Tirano',
        NextText: 3
      },

    ]
  },

]
//--------------------------------------------------------------------------------------------------------

//Side menu

//Reset (New game / ng)
function ng(){
  if (confirm('Todo seu progresso sera perdido e o jogo irá reiniciar, tem certeza?')){
  localStorage.setItem('progress','1')
  return StartGame()
}
}

//Save progress
function save() {
  const progress = PageElement.innerHTML ;
  localStorage.setItem('progress',progress)
  alert('Proresso salvo!')
}

//Load progress
function load(){
  if (confirm('Isso ira sobrescrever seu progresso não salvo, tem certeza?')) {
    return ShowTextNode(Number(localStorage.getItem('progress')))
  }
}
//--------------------------------------------------------------------------------------------------------

StartGame()