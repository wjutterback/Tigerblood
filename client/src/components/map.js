import React from 'react';
import { useState, useEffect } from 'react';
import * as ROT from 'rot-js';
import tiles from '../assets/tiles.png';
import tileMap from '../assets/array/array';
import gameFuncs from '../assets/js/flavor';
import CodeBox from './codemirror';

function Map() {
  const [message, setMessage] = useState(
    "You wake up with a jolt, breathing heavily. What is this place? Why is it so dark? What's going on? Your eyes start to adjust to the dark. You look around confused, as unfamiliar shapes start to appear. You muster up the courage to start moving around. The stone up front might have some clues..."
  );
  const [test, setTest] = useState(false);
  const [door, setDoor] = useState({});

  useEffect(() => {
    createMap();
  }, []);

  let lavaCounter = 0;

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
      tileMap[door.x][door.y][0] = '.';
      tileMap[door.x][door.y][1] = 'U';
      setTest(pass);
      coolLava();
    }
  };

  function createMap() {
    let tileSet = document.createElement('img');
    tileSet.src = tiles;
    document.body.appendChild(tileSet);

    let options = {
      layout: 'tile',
      bg: 'transparent',
      tileWidth: 32,
      tileHeight: 32,
      tileSet: tileSet,
      tileMap: {
        '@': [96, 2112], // Main Character - Mage
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
      },
      width: 151,
      height: 31,
    };
    let display = new ROT.Display(options);

    let playerPos = { x: 7, y: 4 };
    let deadBodyVar = 0;
    let bloodMessageVar = 0;
    let helpStone = 0;
    let fireVar = 0;
    let hotLavaVar = 0;
    let keypadVar = 0;
    let golemVar = 0;

    tileSet.onload = function () {
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

      //draw map
      function drawMap() {
        tileMap.forEach((element, y) => {
          element.forEach((element, x) => {
            display.draw(x, y, element);
          });
        });
      }

      function drawPlayer() {
        display.draw(playerPos.x, playerPos.y, ['.', '@']);
      }

      function drawLight() {
        fov.compute(
          playerPos.x,
          playerPos.y,
          1,
          function (x, y, r, visibility) {
            if (!r) {
              if (Array.isArray(tileMap[y][x]) && tileMap[y][x][1] === 'U') {
                return display.draw(playerPos.x, playerPos.y, ['U', '@']);
              } else if (
                Array.isArray(tileMap[y][x]) &&
                tileMap[y][x][1] === 'n'
              ) {
                return display.draw(playerPos.x, playerPos.y, ['n', '@']);
              }
              return drawPlayer();
            }
            display.draw(x, y, tileMap[y][x]);
          }
        );
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
              value = gameFuncs.deadBody(deadBodyVar);
              deadBodyVar = 1;
              setMessage(value);
              return false;
            case 'H':
              value = gameFuncs.helpMessage(bloodMessageVar);
              bloodMessageVar++;
              setMessage(value);
              return false;
            case 'L':
              value = gameFuncs.door(deadBodyVar);
              setMessage(value);
              setDoor({ x: x, y: y });
              break;
            case 'J':
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
            case 'M' || 'm':
              value = gameFuncs.golem(golemVar);
              golemVar++;
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
          setMessage(
            `You found a bitcoin! Your excitement immediately turns to rage as you imagine Tish celebrating. Did she program a positive feedback loop for finding bitcoin? You are desperate for another jolt.`
          );
        }
      }

      function handleKey(e) {
        console.log('triggered HandleKey');
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
          setMessage('... time to explore ...');
          if (helpStone === 1 && deadBodyVar === 1) {
            cryptoCheck();
          }
          playerPos.x += diff[0];
          playerPos.y += diff[1];
          if (tileMap[4][7][1] === '@') {
            tileMap[4][7].pop();
          }
          return true;
        } else {
          return false;
        }
      }

      let canvas = document.getElementById('map');
      canvas.appendChild(display.getContainer());
    };
  }
  return (
    <>
      <div className='row'>
        <div className='col'>
          <div
            id='map'
            style={{ height: '1070px', width: '1060px', overflow: 'auto' }}
          >
            {/* MAP goes here */}
          </div>
        </div>
        <div className='col'>
          <div className='row' style={{ height: '600px', padding: '15px' }}>
            <div
              className='col-sm-12'
              style={{
                fontSize: '30px',
                fontFamily: 'cursive',
                color: 'orange',
                border: '2px dashed brown',
                background: 'black',
                padding: '50px',
              }}
            >
              {message}
            </div>
          </div>
          <div className='row' style={{ height: '500px', paddingTop: '30px' }}>
            <div className='col-sm-12'>
              <CodeBox getTestResult={getTestResult} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default Map;
