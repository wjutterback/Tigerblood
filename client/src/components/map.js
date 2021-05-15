import React from 'react';
import { useState, useEffect } from 'react';
import * as ROT from 'rot-js';
import tiles from '../assets/tiles.png';
import tileMap from '../assets/array/array';
import gameFuncs from '../assets/js/flavor';
import CodeBox from './codemirror';
import API from "../utils/API";
import { use } from 'chai';
import './map.css';

function Map() {
  const [message, setMessage] = useState(
    ""
  );
  const [test, setTest] = useState(false);
  const [door, setDoor] = useState({});
  const [animate, setAnimate] = useState('');
  const [visibility, setVisibility] = useState('hidden');
  const [code, setCode] = useState('');
  const [lines, setLines] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [level, setLevel] = useState(1);
  const [clearedRooms, setClearedRooms] = useState(0);
  const [bitcoins, setBitcoins] = useState(0);
  const [stepsTaken, setStepsTaken] = useState(0);
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState('');
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
      A: [32, 32], // Golem Level 1 Statue Solid
      a: [64, 32], // Golem Level 2 Statue Solid
      V: [96, 32], // Golem Level 3 Statue Solid
      v: [128, 32], // Golem Level 4 Statue Solid
      m: [256, 32], // Golem Statue Destroyed
      N: [0, 192], // Lava
      n: [1088, 704], // Water
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
      '.': [1856, 192], // Floor (Passable)
      K: [992, 864], // Keyboard
      H: [1824, 1664], // Bloody Help
      h: [32, 992], // shackled body
      W: [576, 0], // darkness
      w: [672, 672], // Acid
      Q: [2016, 160], // Fire
      k: [640, 928], // Dog
      G: [1280, 2688], // Cat 1
      g: [1344, 2688], // Cat 2
      B: [224, 0], // Closed Treasure Chest
      b: [256, 0], // Open Treasure Chest
      '*': [96, 416], // Pentagram
      '=': [1184, 288], // Grass
      '^': [1696, 288], // Grass North
      _: [1504, 288], // Grass South
      '+': [1760, 288], // Grass East
      '-': [672, 288], // Grass West
      '%': [1312, 288], // Sand
      u: [480, 416], // Tree
      '@': [1984, 0], // Escape Portal
      $: [1504, 1376], // Diploma
      '<': [], // Grass NW
      '>': [], // Grass NE
      '(': [], // Grass SW
      ')': [], // Grass SE
      '?': [288, 64], // see through tile
    },
    width: 92,
    height: 33,
  };

  let display = new ROT.Display(options);

  useEffect(() => {
    createMap(display, tileSet);
    let dungeon = document.getElementById('map');
    dungeon.appendChild(display.getContainer());
  }, []);

  useEffect(() => {
    console.log('useEffect lines', lines);
  }, [lines]);

  let lavaCounter = 0;
  let playerLevel = 1;
  let roomsCleared = 0;
  let bitCoinsFound = 0;

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
      // coolLava(); - cool lava after beating second boss
    }
  };

  useEffect(() => {
    setInterval(() => {
      console.log('30 sec check');
    }, 30000);
  }, []);

  /* Start of Score Submission to DB (Not Working on first submit)*/
  function handleScoreSave(event){
    event.preventDefault();
    const pName = event.target.name.value;
    setPlayerName(pName);
    console.log(pName)
    saveScore();
  }

  /* Pulls data from State variables */
  async function saveScore(){
    await API.saveHighScore({
      player: playerName,
      steps: stepsTaken,
      bitcoins: bitcoins || 0,
      score: score,
    })
    .then(res => console.log(res.data))
    .catch(err => console.log(err.response));
  }
  /* End of Score Submission to DB */

  const animateable = ['I', 'i', 'J', 'j', 'M', 'm', 'O', 'o'];

  function createMap(display, tileSet) {
    let playerPos = { x: 7, y: 4 };
    let steps = 0;
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
    let bossFiveVar = 0;
    let bossSixVar = 0;
    let bossSevenVar = 0;
    let bossEightVar = 0;
    let bossFinalVar = 0;
    let score = 0;
    let catsVar = 0;
    let dogsVar = 0;
    let diplomaVar = 0;

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

      function revealWholeMap() {
        tileMap.forEach((element, y) => {
          element.forEach((element, x) => {
            display.draw(x, y, element);
          });
        });
      }

      function levelUp() {
        display.draw(playerPos.x, playerPos.y, ['.', '0']);
        setTimeout(() => {
          drawPlayer();
        }, 300);
      }

      function removeGolem() {
        display.draw(playerPos.x + 32, playerPos.y, ['.', 'm']);
        setTimeout(() => {
          display.draw(playerPos.x + 32, playerPos.y, '.');
        }, 500);
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
            } else if (tileMap[y][x] === '=') {
              return display.draw(playerPos.x, playerPos.y, ['=', playerLevel]);
            } else if (tileMap[y][x] === '_') {
              return display.draw(playerPos.x, playerPos.y, ['_', playerLevel]);
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
          revealWholeMap();
          if (playerPos.y === 23 && playerPos.x === 75) {
            playerPos = {
              y: 30,
              x: 84,
            };
          }
          drawLight();
        }
      }
      mapEngine();

      function updateScore() {
        score = Math.floor((1 / Math.log(steps)) * 100000) * (bitCoinsFound + 1);
      }

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
            steps++;
            setStepsTaken(steps);
            updateScore();
            setScore(score);
          }
          action = handleKey(e);
        }
      }

      function transitionCheck() {
        if (playerPos.y === 16 && playerPos.x === 7) {
          document.getElementById('map').setAttribute('class', 'down1');
        } else if (playerPos.y === 17 && playerPos.x === 22) {
          document.getElementById('map').setAttribute('class', 'down2');
        } else if (playerPos.y === 17 && playerPos.x === 37) {
          document.getElementById('map').setAttribute('class', 'down3');
        } else if (playerPos.y === 17 && playerPos.x === 52) {
          document.getElementById('map').setAttribute('class', 'down4');
        } else if (playerPos.y === 17 && playerPos.x === 67) {
          document.getElementById('map').setAttribute('class', 'down5');
        } else if (playerPos.y === 15 && playerPos.x === 7) {
          document.getElementById('map').setAttribute('class', 'up1');
        } else if (playerPos.y === 15 && playerPos.x === 22) {
          document.getElementById('map').setAttribute('class', 'up2');
        } else if (playerPos.y === 15 && playerPos.x === 37) {
          document.getElementById('map').setAttribute('class', 'up3');
        } else if (playerPos.y === 15 && playerPos.x === 52) {
          document.getElementById('map').setAttribute('class', 'up4');
        } else if (playerPos.y === 15 && playerPos.x === 67) {
          document.getElementById('map').setAttribute('class', 'up5');
        } else if (playerPos.y === 23 && playerPos.x === 15) {
          document.getElementById('map').setAttribute('class', 'east1');
        } else if (playerPos.y === 23 && playerPos.x === 30) {
          document.getElementById('map').setAttribute('class', 'east2');
        } else if (playerPos.y === 23 && playerPos.x === 45) {
          document.getElementById('map').setAttribute('class', 'east3');
        } else if (playerPos.y === 23 && playerPos.x === 60) {
          document.getElementById('map').setAttribute('class', 'east4');
        } else if (playerPos.y === 23 && playerPos.x === 75) {
          document.getElementById('map').setAttribute('class', 'east5');
        } else if (playerPos.y === 23 && playerPos.x === 14) {
          document.getElementById('map').setAttribute('class', 'west1');
        } else if (playerPos.y === 23 && playerPos.x === 14) {
          document.getElementById('map').setAttribute('class', 'west1');
        } else if (playerPos.y === 23 && playerPos.x === 29) {
          document.getElementById('map').setAttribute('class', 'west2');
        } else if (playerPos.y === 23 && playerPos.x === 44) {
          document.getElementById('map').setAttribute('class', 'west3');
        } else if (playerPos.y === 23 && playerPos.x === 59) {
          document.getElementById('map').setAttribute('class', 'west4');
        } else if (playerPos.y === 23 && playerPos.x === 74) {
          document.getElementById('map').setAttribute('class', 'west5');
        } else if (playerPos.y === 16 && playerPos.x > 75) {
          document.getElementById('map').setAttribute('class', 'east5');
        } else if (playerPos.y === 15 && playerPos.x > 75) {
          document.getElementById('map').setAttribute('class', 'bossUpper');
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
                setLines(value.lines);
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
              value = gameFuncs.golem(golemVar, ringVar);
              golemVar++;
              setMessage(value);
              removeGolem();
              return false;
            case 'T':
            case 't': // First Boss
              value = gameFuncs.bossOne(bossOneVar);
              if (
                bossOneVar === 0 ||
                bossOneVar === 1 ||
                bossOneVar === 2 ||
                bossOneVar > 3
              ) {
                setMessage(value);
                bossOneVar++;
                return false;
              }
              setCode(value.code);
              setLines(value.lines);
              setMessage(value.text);
              bossOneVar++;
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
              bossFinalVar = 1;
              setMessage(value);
              return false;
            case 'D':
            case 'd':
              value = gameFuncs.bossSix(bossSixVar);
              bossSixVar++;
              setMessage(value);
              return false;
            case 'Z':
            case 'z':
              value = gameFuncs.bossFive(bossFiveVar);
              bossFiveVar++;
              setMessage(value);
              return false;
            case 'X':
            case 'x':
              value = gameFuncs.bossSeven(bossSevenVar);
              bossSevenVar++;
              setMessage(value);
              return false;
            case 'C':
            case 'c':
              value = gameFuncs.bossEight(bossEightVar);
              bossEightVar++;
              setMessage(value);
              return false;
            case 'u':
              return false;
            case 'G':
              return false;
            case 'g':
              return false;
            case 'k':
              return false;
            default:
          }
        }
        //movement logic
        const passable = ['.', 'n', 'U', '=', '-'];
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
  window.onload = function () {
    let matrixCanvasContainer = document.getElementById(
      'matrixCanvasContainer'
    );
    let matrixCanvas = document.getElementById('matrixCanvas'), // this needs to be a comma and not a semicolon in order for 'ctx' to work
      ctx = matrixCanvas.getContext('2d');

    let letters = 'TIGERBLOD';
    letters = letters.split('');
    let fontSize = 15,
      columns = matrixCanvas.width / fontSize;

    let drops = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    function drawMatrix() {
      ctx.fillStyle = 'rgba(0, 0, 0, .1)';
      ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
      for (let i = 0; i < drops.length; i++) {
        let text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillStyle = '#ff0000';
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        drops[i]++;
        if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.95) {
          drops[i] = 0;
        }
      }
    }

    setInterval(drawMatrix, 50);
  };
  // End of Matrix Letters code
  return (
    <div className="row">
      <div className="col-sm-6">
        <div className="row">
          <div
            className=''
            id='drawingBoard'
            style={{
              position: 'relative',
              height: '544px',
              width: '512px',
              overflow: 'hidden',
              margin: 'auto',
              transform: 'scale(2) translate(0%, 25%)',
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
              }}
              className='start'
            >
              {/* MAP goes here */}
            </div>
          </div>
        </div>
      </div>
      <div className="col-sm-6">
        <div
            className='row'
            style={{
              fontFamily: 'fantasy',
              backgroundColor: 'Black',
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
              <b>Steps Taken:</b> {stepsTaken}
            </h2>
            <h2 className='mr-auto'>
              {bitcoins ? (
                <b>You Found {bitcoins} BitCoin!</b>
              ) : (
                'No secrets here ...'
              )}
            </h2>
        </div>
        <div className='row'>
          <p id="message">{message}</p>
        </div>
        <div
          className='row'
          style={{
            fontFamily: 'fantasy',
            backgroundColor: 'Black',
            padding: '3rem',
          }}
        >
          <button
            type='button'
            className='btn btn-success'
            id='gameOverModalLauncher'
            data-toggle='modal'
            data-target='#gameOverModal'
          >
            Game Over!
          </button>
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
        <div className='row' style={{ visibility: visibility }}>
          <div className='laptop2'>
            <section id='matrixCanvasContainer'>
              <canvas id='matrixCanvas'></canvas>
            </section>
            <button
              type='button'
              className='btn btn-danger btn-block'
              id='screenModalLauncher'
              data-toggle='modal'
              data-target='#screenModal'
            >
              Open Terminal
            </button>
          </div>
        </div>
      </div>
      <div
        className='modal fade'
        id='screenModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='screenModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-body'>
              <div className='laptop'>
                <div className='content'>
                  <p id='webcam'>o</p>
                  <p id='buttons'>&#10006;</p>
                  <CodeBox
                    lines={lines}
                    code={code}
                    getTestResult={getTestResult}
                  />
                </div>
              </div>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-secondary'
                data-dismiss='modal'
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className='modal fade'
        id='gameOverModal'
        tabIndex='-1'
        role='dialog'
        aria-labelledby='gameOverModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content' id="gameOverModalContent">
            <div className='modal-body' id="gameOverModalBody">
              <h1>Congratulations!</h1>
              <h2>You managed to escape the dungeon and gained a diploma on the way!</h2>
              <h3>Your performance has been scored. Submit your name and immortalize your performance in the hall of sh.., i mean fame. </h3>
              <form className="w-100"  onSubmit={handleScoreSave}>
                <div className="form-group">
                  <label htmlFor="name">Player Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Name"/>
                </div>
                <div className="form-group">
                  <label htmlFor="steps">Steps Taken</label>
                  <input type="text" className="form-control-plaintext" readOnly id="steps" aria-describedby="stepsHelp" value={stepsTaken} style={{color: "white"}}/>
                </div>
                <div className="form-group">
                  <label htmlFor="bitcoin">BitCoins Collected</label>
                  <input type="text" className="form-control-plaintext" readOnly id="bitcoin" aria-describedby="bitcoinHelp" value={bitcoins} style={{color: "white"}}/>
                </div>
                <div className="form-group">
                  <label htmlFor="score">Score</label>
                  <input type="text" className="form-control-plaintext"  readOnly id="score" aria-describedby="scoreHelp" value={score} style={{color: "white"}}/>
                </div>
                <button type="submit" className="btn btn-danger">Save Score</button>
              </form>
            </div>
            <div className='modal-footer' id="gameOverModalFooter">
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Map;
