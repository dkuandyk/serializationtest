//import Phaser from 'phaser';

import Boot from './assets/classes/Boot.js'
import Preloader from './assets/classes/Preloader.js'
import CloudBack from './assets/classes/CloudBack.js'
import Menu from './assets/classes/Menu.js'
import Level from './assets/classes/Level.js'
import CloudFront from './assets/classes/CloudFront.js'

var isIOS = /iP[ao]d|iPhone/i.test(navigator.userAgent);

//type : Phaser.AUTO,
//renderer : isIOS ? Phaser.CANVAS : Phaser.AUTO,

let config = {
    type : Phaser.WEBGL,
    renderer : Phaser.WEBGL,
    antialias: true,
    mipmapFilter: "LINEAR_MIPMAP_LINEAR",
    //pixelArt:true,
    //roundPixels: true,
    width : 1920*3,
    height : 1080,
    scale : {
        mode : Phaser.Scale.HEIGHT_CONTROLS_WIDTH,
        //mode : Phaser.Scale.FIT,
        autoCenter : Phaser.Scale.CENTER_BOTH,
    },
    /*
    physics: {
        default: 'matter',
        matter: {
            //debug: true,
            gravity: {
                y: 3,
            },
        }
    },
    */
    //backgroundColor: 0x385BFF,//ffffff,
    backgroundColor:0x092db0,
    //backgroundColor:0xf0af7a,
    //backgroundColor:0x617ec2,
    scene : [
        Boot,
        Preloader,
        CloudBack,
        Menu,
        Level,
        CloudFront,
        ],
}

let storageData = localStorage.getItem('balance');
    
if(storageData) storageData = JSON.parse(storageData);
else storageData = {};

const Game = new Phaser.Game(config);
Game.data = storageData;

Game.saveUserData = function(){
    localStorage.setItem(
        'balance',
        JSON.stringify(Game.data),
        );
    };
    
Game.currentWidth=-1;
Game.currentHeight=-1;

//Game.data={};
//Game.saveUserData();

if(!('isAudioOn' in Game.data))
{
    Game.data.isAudioOn=true;
}

if(!('isMusicOn' in Game.data))
{
    Game.data.isMusicOn=true;
}

if(!('openedFlowers' in Game.data))
{
    Game.data.openedFlowers=0;
}

/*
if(!('isFullscreen' in Game.data))
{
    Game.data.isFullscreen=false;
}
*/

Game.saveUserData();

Game.GAMEWIDTH=-1;
Game.GAMEHEIGHT=-1;

Game.windowResizeCalculate=()=>{
  let gw = 1920*3;
  let gh = 1080;
  let ww = window.innerWidth;
  let wh = window.innerHeight;
  let scale = wh / gh; // scale by height
  Game.GAMEWIDTH = gw/((ww/wh)/(1920/1080));
  Game.GAMEHEIGHT = gh/((ww/wh)/(1920/1080));
}

Game.setProperCameraZoom=(scene)=>{
  scene.game.currentWidth=window.innerWidth;
  scene.game.currentHeight=window.innerHeight;

  if(scene.scale.parentSize._width/scene.scale.parentSize._height>1920/1080)
  {
    scene.cameras.main.zoom=1;
  }
  else
  {
    scene.cameras.main.zoom=(scene.scale.parentSize._width/scene.scale.parentSize._height)/(1920/1080);
  }
}


Game.removeItemOnce=(arr, value)=>{
    var index = arr.indexOf(value);
    if (index > -1) {
      arr.splice(index, 1);
    }
    return arr;
  }
  
Game.shuffle=(array)=>
{
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
}

Game.getDistance=(x1,y1,x2,y2)=>
{
  return Math.sqrt((x2-x1)**2 + (y2-y1)**2);
}

window.addEventListener('contextmenu', function (e) { 
  // do something here... 
  //e.preventDefault(); 
}, false);

Game.MUSIC=null;

Game.transitionColor=0x092db0;
Game.transitionColor=0x000000;
Game.transitionTime=800;