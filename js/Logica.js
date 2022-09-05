//Global variables
let sound = new Audio('./assets/music/Jungle.mp3');
let winSound = new Audio('./assets/music/win.mp3');
let winSound2 = new Audio('./assets/music/win2.mp3');

//targeting the DOM to get some elements
const musicoff=document.getElementById('music-off');
const musicon=document.getElementById('music-on');
const closeBtn=document.querySelector('.close');
const starBtn=document.querySelector('.start');
const backgroundDiv=document.getElementById('container');


//events
document.body.addEventListener('click',()=>{
    document.body.style.cursor=`url(./assets/images/pistola2.png), auto`;
    setTimeout(release, 50);
});


musicoff.addEventListener('click', ()=>{
  
    sound.play();
    sound.loop=true;
    sound.volume=0.15;
    musicoff.style.display='none';
    musicon.style.display='block';
});  

musicon.addEventListener('click', ()=>{
   
    sound.pause();
    musicoff.style.display='block';
    musicon.style.display='none';
}); 



starBtn.addEventListener('click', ()=>{
    let sound = new Audio('./assets/music/selectSound.mp3');
    sound.play();
    playGame();
});


closeBtn.addEventListener('click', ()=>{
    let sound = new Audio('./assets/music/selectSound.mp3');
    sound.play();
    setTimeout(closeWindow, 1500);
    
});




//Function to get a random position for the target element
const getPositon=()=>{
    return Math.floor(Math.random() * 50);
}


const playGame=()=>{
    const position=getPositon();
    starBtn.style.display='none';
    closeBtn.style.display='none';
    musicoff.style.display='none';
    musicon.style.display='none';

    let target=document.createElement('button');
    target.id='shoot';
    target.style.background=`url(./assets/images/target.png)`;
    target.style.width=`15rem`;
    target.style.height=`15rem`;
    target.style.backgroundRepeat=`no-repeat`;
    target.style.backgroundSize=`contain`;
    target.style.border=`none`;
    target.style.cursor=`url(./assets/images/pistola1.png), auto`;


    target.classList.add('btn');
    target.style.top=`${position}rem`;
    if(position%2==0){
        target.style.right=`${position}rem`;
    }else{
        target.style.left=`${position}rem`;
    }


    backgroundDiv.appendChild(target);
    target.addEventListener('click', getTheNumbers);

}

// function to get the random numbers 

function getTheNumbers(){
    winSound.play();
    winSound2.play();

    let loteria=[];
    for(let i=0; i<6; i++){
        
        let value=Math.floor((Math.random() * 6)+1);
        if(loteria.includes(value)){
               i--; 
        }else{
            loteria.push(value);
        }
    }
    
     let target=document.getElementById('shoot');
     target.style.display='none';
     let resultado=document.createElement('h1');
     let ganadores=document.createElement('h2');
     ganadores.style.color=`white`;
     resultado.style.color=`white`;
     ganadores.innerHTML='Numeros Ganadores: ';
     backgroundDiv.appendChild(ganadores);
     backgroundDiv.appendChild(resultado);

     printWithDelay(loteria.length -1,loteria,resultado);
     
     resultado.innerHTML=resultado.innerHTML + `<span style="color:red;">Winners</span>`;
     resultado.style.textAlign=`center`;
     ganadores.style.textAlign=`center`;
     ganadores.style.paddingTop=`10rem`;
      
     setTimeout(gameOver,13000);
     
     return loteria;
     
}


// Function  to print the randomized numbers with delay
function printWithDelay(count,numeros,resultado) {
    
    setTimeout(function() {
      resultado.innerHTML=  numeros[count] + '→' + resultado.innerHTML;
  
      count--;
  
      if (0 <= count) {
        printWithDelay(count,numeros,resultado);
      };
    }, 2000);

    
  };


// this function allows to repeat the game
  function gameOver(){
    const gameCompleted=document.getElementById('game');
    gameCompleted.style.display=`block`;
    gameCompleted.addEventListener('click',()=>{
        window.location.reload();
    });
  }

// with this fuction we change the cursor image on the screen
  const release=()=>{
    document.body.style.cursor=`url(./assets/images/pistola1.png), auto`;
   
}

// call to close the current window
const closeWindow=()=>{
    window.close();
}
