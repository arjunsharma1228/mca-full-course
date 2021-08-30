const canva = document.querySelector('#canva')
let tl = gsap.timeline({ease:Power2.in});
const c = canva.getContext('2d')
canva.height = window.innerHeight
canva.width = window.innerWidth

const btc = document.querySelector('#btc')

let _particles = []

class Particles {
  constructor(x,y,pSize,color){
    this.x = x
    this.y = y
    this.pSize = pSize
    this.color = color
    this.mass = Math.random() * 5 -2.5
    this.dir = Math.random() * 2
    
  }
  draw(){
    c.beginPath()
    c.arc(this.x,this.y,this.pSize,0,Math.PI *2)
    c.fillStyle = this.color
    c.fill()
    
  }
  update(){
    this.y -= this.mass 
    this.x +=  this.dir
    if(this.pSize > 0.1){
      this.pSize -= 0.2
    }
    
  }
}

let int 
function click(){
  let basic = btc.getBoundingClientRect()
  let colors = ['#ff7070', '#b4ffa5', '#ba90fa', '#6b84e5'];
  let size = Math.random() * 20 + 10
  let x = basic.x + Math.random() * (40 - 40) + 40
  let y = basic.y + 50
  int = setInterval(() => {
        let color = colors[Math.floor(Math.random() * colors.length)];

     _particles.push(new Particles(x,y,size,color))
}, 50);

  tl.to('#btc',{scale:0.8,duration:0.05})
    .to('#btc',{scale:1,duration:0.05,onComplete:()=>{
           clearInterval(int)

    }})

}

function spawn(){
  _particles.forEach((p,index)=>{
   
    p.draw()
    p.update()
  
    if(p.pSize < 1){
      _particles.splice(index,1)
        
   
    }
  })
}


function anima(){
c.clearRect(0,0,canva.width,canva.height)
  
    btc.addEventListener('click',click)


  spawn()
    requestAnimationFrame(anima) 
}
anima()