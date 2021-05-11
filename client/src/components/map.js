import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as ROT from 'rot-js';
import tiles from '../assets/tiles.png';
import tileMap from '../assets/array/array';
import gameFuncs from '../assets/js/flavor';
import CodeBox from './codemirror';
import { use } from 'chai';
import './map.css';

function Map() {
  const [message, setMessage] = useState(
    "You wake up with a jolt, breathing heavily. What is this place? Why is it so dark? What's going on? Your eyes start to adjust to the dark. You look around confused, as unfamiliar shapes start to appear. You muster up the courage to start moving around. The stone up front might have some clues..."
  );
  const [test, setTest] = useState(false);
  const [door, setDoor] = useState({});
  const [animate, setAnimate] = useState('');
  const [visibility, setVisibility] = useState('hidden');
  const [code, setCode] = useState('');
  const [inventory, setInventory] = useState([]);
  const [level, setLevel] = useState(1);
  const [clearedRooms, setClearedRooms] = useState(0);
  const [bitcoins, setBitcoins] = useState(0);

  let tileSet = document.createElement('img');
  tileSet.src = tiles;
  // document.body.appendChild(tileSet);

  let options = {
    layout: 'tile',
    tileWidth: 32,
    tileHeight: 32,
    tileSet: tileSet,
    tileMap: {
      1: [800, 1920], // Player - Level 1 (noob)
      2: [672, 1920], // Player - Level 2 (rookie)
      3: [1216, 1920], // Player - Level 3 (knight)
      4: [960, 832], // Player - Level 4 (mage)
      5: [96, 2112], // Player - Level 5 (elemental)
      0: [320, 1088], // Level Up Animation
      r: [128, 1376], // Ring
      R: [992, 32], // README Stone
      '#': [864, 224], // Wall tile
      '[': [256, 544], // Shadow_west
      ']': [1984, 512], // Shadow_east
      '~': [32, 544], // Shadow_north
      q: [160, 544], // Shadow_northwest
      e: [96, 544], // Shadow_northeast
      L: [1696, 32], // Door Locked
      U: [1632, 32], // Door Unlocked
      '&': [992, 864], // Keypad
      I: [480, 672], // Torch 1
      i: [544, 672], // Torch 2
      J: [1568, 0], // Flame 1
      j: [1600, 0], // Flame 2
      O: [512, 2272], // Eye Obelisk 1
      o: [672, 2272], // Eye Obelisk 2
      M: [64, 32], // Golem Statue 1
      m: [160, 32], // Golem Statue 2
      N: [0, 192], // Lava
      n: [0, 224], // Cooled Lava
      t: [768, 2464], // Boss 1 Upper
      T: [736, 2464], // Boss 1 Lower
      Y: [640, 2432], // Boss 2 Upper
      y: [608, 2432], // Boss 2 Lower
      P: [384, 2432], // Boss 3 Upper
      p: [320, 2432], // Boss 3 Lower
      S: [2016, 832], // Boss 4 Upper
      s: [1984, 832], // Boss 4 Lower
      D: [1952, 832], // Boss 5 Upper
      d: [1920, 832], // Boss 5 Lower
      z: [128, 864], // Boss 6 Upper
      Z: [160, 864], // Boss 6 Lower
      X: [64, 864], // Boss 7 Upper
      x: [96, 864], // Boss 7 Lower
      c: [0, 864], // Boss 8 Upper
      C: [32, 864], // Boss 8 Lower
      F: [1888, 832], // Final Boss Upper
      f: [1856, 832], // Final Boss Lower
      '.': [1984, 128], // Floor (Passable) 94x63
      K: [992, 864], // Keyboard
      H: [1824, 1664], // Bloody Help
      h: [32, 992], // shackled body
      W: [576, 0], // darkness
      k: [640, 928], // Dog
      G: [1280, 2688], // Cat 1
      g: [1344, 2688], // Cat 2
      B: [224, 0], // Closed Treasure Chest
      b: [256, 0], // Open Treasure Chest
    },
    width: 151,
    height: 33,
  };

  let display = new ROT.Display(options);

  useEffect(() => {
    createMap(display, tileSet);
    let dungeon = document.getElementById('map');
    dungeon.appendChild(display.getContainer());
  }, []);

  let lavaCounter = 0;
  let playerLevel = 1;
  let roomsCleared = 0;
  let bitCoinsFound = 0;

  function coolLava() {
    if (lavaCounter === 1) {
      tileMap[23][15][1] = 'n';
      tileMap[24][15][1] = 'n';
    }
  }

  const getTestResult = (pass) => {
    console.log(pass);
    if (pass === true) {
      lavaCounter++;
      tileMap[door.x][door.y] = ['.', 'U'];
      //display draw doesn't work in here, not quite sure why that is
      setCode('Success!');
      setTimeout(() => {
        setCode('');
      }, 2000);
      //display.draw needed to draw the open door on pass
      setTest(pass);
      roomsCleared = 1;
      setClearedRooms(roomsCleared);
      coolLava();
    }
  };

  useEffect(() => {
    setInterval(() => {
      console.log('30 sec check');
    }, 30000);
  }, []);

  const animateable = ['I', 'i', 'J', 'j', 'M', 'm', 'O', 'o'];

  function createMap(display, tileSet) {
    let playerPos = { x: 7, y: 4 };
    let deadBodyVar = 0;
    let bloodMessageVar = 0;
    let helpStone = 0;
    let fireVar = 0;
    let hotLavaVar = 0;
    let keypadVar = 0;
    let golemVar = 0;
    let ringVar = 0;
    let bossOneVar = 0;
    let bossTwoVar = 0;
    let bossThreeVar = 0;
    let bossFourVar = 0;
    let bossFinalVar = 0;

    tileSet.onload = function () {
      let lightRadius = 1;
      //returns true or false on whether light should pass an object
      function lightPasses(y, x) {
        const blockLight = ['#', 'L', '&', 'M', 'm', 'K'];
        if (Array.isArray(tileMap[x][y]) === true) {
          if (blockLight.some((tile) => tileMap[x][y].includes(tile))) {
            return false;
          }
        } else if (tileMap[x][y] === '#') {
          return false;
        }
        return true;
      }

      let fov = new ROT.FOV.PreciseShadowcasting(lightPasses, { topology: 8 });

      //Commented out code successfully adds background color information into tileMap through the lightingCallback, does not draw properly though
      // function reflectivity(x, y) {
      //   return 0.3;
      // }
      // var lighting = new ROT.Lighting(reflectivity, { range: 12, passes: 1 });
      // lighting.setFOV(fov);
      // lighting.setLight(5, 3, [240, 240, 240]);
      // console.log(lighting);

      // function lightingCallback(y, x, color) {
      //   if (Array.isArray(tileMap[x][y][0]) === true) {
      //     tileMap[x][y] = [[tileMap[x][y][0], [tileMap[x][y][1]], color];
      //   }
      //   // tileMap[x][y] = [tileMap[x][y], color];
      //   console.log(tileMap[x][y]);
      // }
      // lighting.compute(lightingCallback);

      //draw map
      function drawMap() {
        tileMap.forEach((element, y) => {
          if (playerPos.y - 8 <= y && y <= playerPos.y + 8) {
            element.forEach((element, x) => {
              if (playerPos.x - 7 <= x && x <= playerPos.x + 8) {
                display.draw(x, y, element);
              }
            });
          }
        });
      }
      function levelUp() {
        display.draw(playerPos.x, playerPos.y, ['.', '0']);
        setTimeout(() => {
          drawPlayer();
        }, 300);
      }

      function drawPlayer() {
        console.log(playerLevel);
        console.log('drawPlayer called. Your playerLevel is ' + playerLevel);
        switch (playerLevel) {
          case 1:
            display.draw(playerPos.x, playerPos.y, ['.', '1']);
            break;
          case 2:
            display.draw(playerPos.x, playerPos.y, ['.', '2']);
            setLevel(playerLevel);
            break;
          case 3:
            display.draw(playerPos.x, playerPos.y, ['.', '3']);
            setLevel(playerLevel);
            break;
          case 4:
            display.draw(playerPos.x, playerPos.y, ['.', '4']);
            setLevel(playerLevel);
            break;
          case 5:
            display.draw(playerPos.x, playerPos.y, ['.', '5']);
            setLevel(playerLevel);
            break;
          default:
        }
      }

      function drawLight() {
        fov.compute(playerPos.x, playerPos.y, lightRadius, function (x, y, r) {
          if (!r) {
            if (Array.isArray(tileMap[y][x]) && tileMap[y][x][1] === 'U') {
              return display.draw(playerPos.x, playerPos.y, ['U', playerLevel]);
            } else if (
              Array.isArray(tileMap[y][x]) &&
              tileMap[y][x][1] === 'n'
            ) {
              return display.draw(playerPos.x, playerPos.y, ['n', playerLevel]);
            }
            return drawPlayer();
          }
          display.draw(x, y, tileMap[y][x]);
        });
      }
      drawLight();

      async function mapEngine() {
        // this is responsible of watching the player move and updating the display accordingly.
        while (true) {
          await movement();
          display.clear();
          drawLight();
        }
      }
      mapEngine();

      async function movement() {
        let action = false;
        while (!action) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          let e = await new Promise((resolve) => {
            window.addEventListener('keydown', resolve, { once: true });
          });
          if (
            e.keyCode === 38 ||
            e.keyCode === 39 ||
            e.keyCode === 40 ||
            e.keyCode === 37
          ) {
            e.preventDefault();
          }
          action = handleKey(e);
        }
      }

      function passableCheck(y, x) {
        //events in game
        if (Array.isArray(tileMap[x][y])) {
          let value;
          switch (tileMap[x][y][1]) {
            case 'R':
              value = gameFuncs.helpStone(deadBodyVar);
              helpStone = 1;
              setMessage(value);
              return false;
            case 'h':
              value = gameFuncs.deadBody(deadBodyVar, bloodMessageVar);
              deadBodyVar = 1;
              setMessage(value);
              if (deadBodyVar > 0 && bloodMessageVar > 0) {
                deadBodyVar = 1;
                tileMap[2][13][1] = 'r';
                display.draw(13, 2, ['.', 'r']);
              }
              return false;
            case 'r':
              value = gameFuncs.ring();
              setMessage(value);
              tileMap[2][13].pop();
              setVisibility('visible');
              lightRadius++;
              ringVar = 1;
              let ringItem = {
                name: 'Ring of Sight',
                power: 'Increased field of view',
              };
              playerLevel = 2;
              levelUp();
              setInventory((inventory) => [...inventory, ringItem]);
              display.draw(13, 2, '.');
              return false;
            case 'H':
              value = gameFuncs.helpMessage(bloodMessageVar);
              bloodMessageVar++;
              setMessage(value);
              return false;
            case 'L':
              value = gameFuncs.door(ringVar, { x: x, y: y });
              if (ringVar === 1) {
                setCode(value.code);
                setMessage(value.text);
                setDoor({ x: x, y: y });
                break;
              }
              setMessage(value);
              break;
            case 'J':
            case 'j':
              value = gameFuncs.fire(fireVar);
              fireVar++;
              setMessage(value);
              return false;
            case 'N':
              value = gameFuncs.hotLava(hotLavaVar);
              hotLavaVar++;
              setMessage(value);
              return false;
            case 'K':
              value = gameFuncs.keypad(keypadVar);
              keypadVar++;
              setMessage(value);
              return false;
            case 'M':
            case 'm':
              value = gameFuncs.golem(golemVar);
              golemVar++;
              setMessage(value);
              return false;
            case 'T':
            case 't': // First Boss
              value = gameFuncs.bossOne(bossOneVar);
              bossOneVar++;
              setMessage(value);
              return false;
            case 'Y':
            case 'y': // Second Boss
              value = gameFuncs.bossTwo(bossTwoVar);
              bossTwoVar++;
              setMessage(value);
              return false;
            case 'P': // Third Boss
            case 'p': // Third Boss
              value = gameFuncs.bossThree(bossThreeVar);
              bossThreeVar++;
              setMessage(value);
              return false;
            case 'S':
            case 's': // Fourth Boss
              value = gameFuncs.bossFour(bossFourVar);
              bossFourVar++;
              setMessage(value);
              return false;
            case 'F':
            case 'f': // Final Boss
              value = gameFuncs.bossFinal(bossFinalVar);
              bossFinalVar++;
              setMessage(value);
              return false;
            default:
          }
        }
        //movement logic
        const passable = ['.', 'n', 'U'];
        console.log(x, y);
        console.log(tileMap[x][y].length);
        console.log(tileMap[x][y]);
        if (passable.some((tile) => tileMap[x][y].includes(tile))) {
          return true;
        } else {
          return false;
        }
      }

      function cryptoCheck() {
        let number = Math.floor(Math.random() * 100);
        console.log(number);
        if (number === 77) {
          bitCoinsFound++;
          setBitcoins(bitCoinsFound);
          setMessage(
            `You found a bitcoin! Your excitement immediately turns to rage as you imagine Tish celebrating. Did she program a positive feedback loop for finding bitcoin? You are desperate for another jolt.`
          );
        }
      }

      function transitionCheck() {
        if (playerPos.y === 16 && playerPos.x === 7) {
          document.getElementById('map').setAttribute('class', 'down1');
        } else if (playerPos.y === 17 && playerPos.x === 22) {
          document.getElementById('map').setAttribute('class', 'down2');
        } else if (playerPos.y === 15 && playerPos.x === 7) {
          document.getElementById('map').setAttribute('class', 'up1');
        } else if (playerPos.y === 15 && playerPos.x === 22) {
          document.getElementById('map').setAttribute('class', 'up2');
        } else if (playerPos.y === 23 && playerPos.x === 15) {
          document.getElementById('map').setAttribute('class', 'east1');
        } else if (playerPos.y === 24 && playerPos.x === 15) {
          document.getElementById('map').setAttribute('class', 'east1');
        } else if (playerPos.y === 23 && playerPos.x === 14) {
          document.getElementById('map').setAttribute('class', 'west1');
        } else if (playerPos.y === 24 && playerPos.x === 14) {
          document.getElementById('map').setAttribute('class', 'west1');
        }
      }

      function handleKey(e) {
        var keyCode = [];
        //Arrows keys
        keyCode[38] = 0; // key-up
        keyCode[39] = 2; // key-right
        keyCode[40] = 4; // key-down
        keyCode[37] = 6; // key-left
        var code = e.keyCode;
        if (!(code in keyCode)) {
          return false;
        }
        let diff = ROT.DIRS[8][keyCode[code]];
        if (passableCheck(playerPos.x + diff[0], playerPos.y + diff[1])) {
          // setMessage('... time to explore ...'); this set message overwrites any message created if the checkPassable returns true (meaning you can walk/move onto tile to access image in it)
          if (helpStone === 1 && deadBodyVar === 1) {
            cryptoCheck();
          }
          playerPos.x += diff[0];
          playerPos.y += diff[1];
          transitionCheck();
          return true;
        } else {
          return false;
        }
      }
    };
  }
  return (
    <>
      <div className='row'>
        <Link to='/' style={{ margin: '25px auto 100px auto' }}>
          <img src='/preview/tigerbloodlogo.png' alt='logo' id='logo' />
        </Link>
      </div>
      <div className='row'>
        <div className='col'>
          <div
            className='col-sm-12'
            style={{
              fontSize: '2rem',
              fontFamily: 'fantasy',
              color: 'orange',
              border: '2px dashed crimson',
              background: 'black',
              padding: '50px',
            }}
          >
            {message}
          </div>
        </div>
        <div className='col'>
          <div className='row'>
            <div
              className='col'
              style={{
                fontFamily: 'fantasy',
                marginBottom: '50px',
                backgroundColor: 'Black',
                border: '2px dashed crimson',
                padding: '50px',
              }}
            >
              <h2 className='mr-auto'>
                <b>Player Level:</b> {level}
              </h2>
              <h2 className='mr-auto'>
                <b>Rooms Cleared:</b> {clearedRooms}
              </h2>
              <h2 className='mr-auto'>
                {bitcoins ? (
                  <b>You Found {bitcoins} BitCoin!</b>
                ) : (
                  'No secrets here ...'
                )}
              </h2>
            </div>
            <div
              className='col'
              style={{
                fontFamily: 'fantasy',
                marginBottom: '50px',
                backgroundColor: 'Black',
                border: '2px dashed crimson',
                padding: '50px',
              }}
            >
              <h2>
                <b>Items Unlocked: {inventory.length}</b>
              </h2>
              <ol>
                {inventory.map((item, i) => (
                  <li key={i} style={{ fontSize: '1.5rem' }}>
                    <b>{item.name}</b>: {item.power}
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col'>
          <div
            className=''
            id='drawingBoard'
            style={{
              position: 'relative',
              height: '544px',
              width: '512px',
              overflow: 'hidden',
              border: '1px solid orange',
              // margin: 'auto',
              transform: 'scale(2) translate(25%, 25%)',
            }}
          >
            <div
              id='map'
              style={{
                background: 'transparent',
                position: 'absolute',
                left: '0px',
                top: '0px',
                height: '1070px', // This matches container height to map height
                textAlign: 'center',
                overflow: 'auto',
                backgroundColor: 'black',
                border: '2px solid grey',
              }}
            ></div>
            <div
              style={{
                background: 'transparent',
                position: 'absolute',
                left: '0px',
                top: '0px',
              }}
              id='character'
            ></div>
            {/* MAP goes here */}
            {/* </div> */}
          </div>
        </div>
        <div className='col' style={{ visibility: visibility }}>
          <div className='laptop'>
            <div className='content'>
              <p id='webcam'>o</p>
              <p id='buttons'>&#10006;</p>
              <CodeBox code={code} getTestResult={getTestResult} />
              <p id='brand'>&#127820;</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Map;
