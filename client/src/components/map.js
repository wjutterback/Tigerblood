import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as ROT from 'rot-js';
import tiles from '../assets/tiles.png';
import tileMap from '../assets/array/array';
import gameFuncs from '../assets/js/flavor';
import API from '../utils/API';
import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/addon/display/autorefresh';
import 'codemirror/addon/comment/comment';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
// import 'codemirror/mode/jsx/jsx.js';
import 'codemirror/mode/javascript/javascript';
import chai from 'chai';
import 'chai/register-expect';
import mocha from 'mocha';
import testFuncs from '../assets/js/tests';
import './map.css';

//enable to allow linter to work in CodeMirror
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/javascript-lint';
import 'codemirror/addon/lint/lint.css';
import { JSHINT } from 'jshint';
window.JSHINT = JSHINT;

var widgets = [];
function updateHints() {
  let editor = document.querySelector('.CodeMirror').CodeMirror;
  editor.operation(function () {
    for (let i = 0; i < widgets.length; ++i)
      editor.removeLineWidget(widgets[i]);
    widgets.length = 0;

    JSHINT(editor.getValue());
    for (let i = 0; i < JSHINT.errors.length; ++i) {
      let err = JSHINT.errors[i];
      if (!err) continue;
      let msg = document.createElement('div');
      let icon = msg.appendChild(document.createElement('span'));
      icon.innerHTML = '>> Linter: ';
      icon.className = 'lint-error-icon';
      msg.appendChild(document.createTextNode(err.reason));
      msg.className = 'lint-error';
      widgets.push(
        editor.addLineWidget(err.line - 1, msg, {
          coverGutter: false,
          noHScroll: true,
        })
      );
    }
  });
}

function Map() {
  const [memory, setMemory] = useState({});
  const [message, setMessage] = useState('');
  const [door, setDoor] = useState({});
  const [visibility, setVisibility] = useState('hidden');
  const [code, setCode] = useState('');
  const [inventory, setInventory] = useState([]);
  const [level, setLevel] = useState('');
  const [clearedRooms, setClearedRooms] = useState(0);
  const [bitcoins, setBitcoins] = useState(0);
  const [stepsTaken, setStepsTaken] = useState(0);
  const [score, setScore] = useState(0);
  const [playerName, setPlayerName] = useState('');
  const [gameOverState, setGameOverState] = useState({});
  const [gameIsOver, setGameIsOver] = useState(0);
  const [lines, setLines] = useState([1, 2, 3, 4]);

  let tileSet = document.createElement('img');
  tileSet.src = tiles;

  let playerLevels = [
    'Coding Commoner',
    'JavaScript Juvenile',
    'Node Novice',
    'Database Dominator',
    'Mern Monster',
  ];
  let lvl = 0;
  let gameOverVar = 0;
  let roomsCleared = 0;
  let bitCoinsFound = 0;

  useEffect(() => {
    setLevel(playerLevels[lvl]);
  }, [lvl]);

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
      J: [832, 384], // & Statue
      E: [864, 384], // @ Statue
      j: [96, 0], // Water Fountain
      O: [1376, 1888], // Side Boss
      // o: [672, 2272], Side top bottom
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
      $: [1504, 1376], // Certificate
      '<': [], // Grass NW
      '>': [], // Grass NE
      '(': [], // Grass SW
      ')': [], // Grass SE
      '?': [800, 224], // see through tile, Looks very similar to real wall
      ',': [32, 1952], // joy
    },
    width: 92,
    height: 33,
  };

  let display = new ROT.Display(options);

  useEffect(() => {
    createMap(display, tileSet);
    let dungeon = document.getElementById('map');
    dungeon.appendChild(display.getContainer());
    let editor = document.querySelector('.CodeMirror').CodeMirror;
    editor.on('change', function () {
      updateHints();
    });
  }, []);

  useEffect(() => {
    let editor = document.querySelector('.CodeMirror').CodeMirror;
    editor.markText(
      { line: 0, ch: 0 },
      { line: 1, ch: 0 },
      {
        readOnly: true,
        inclusiveLeft: false,
        clearWhenEmpty: true,
        css: 'visibility: hidden',
      }
    );
    editor.markText(
      { line: parseInt(lines[0]), ch: 0 },
      { line: parseInt(lines[1]), ch: 0 },
      {
        readOnly: true,
        inclusiveLeft: false,
        clearWhenEmpty: true,
      }
    );
    editor.markText(
      { line: parseInt(lines[2]), ch: 0 },
      { line: parseInt(lines[3]), ch: 0 },
      { readOnly: true, inclusiveLeft: false, clearWhenEmpty: true }
    );
  }, [lines, code]);

  const getTestResult = (pass, test) => {
    let failureMessage = `
    /* Failed! Nuh-uh-uh, these goodies staying in the jar */`;
    if (pass === true) {
      if (test === 'dragon') {
        setMessage(
          `Ahhh, I feel the heat abating. You have lessened my misery, if only for a bit. For this, I'll share my hoard with you. The ring inside should bring you a little more heat and light in this infernal place.`
        );
        tileMap[2][22] = ['.', 'r'];
      } else if (test === 'triplets') {
        setMessage(
          `All three creatures breathe a sigh of relief and contentment as a new creature materializes out of the circle... It is positively glowing with excitement and energy.`
        );
        tileMap[5][42] = ['.', '*', ','];
      } else if (test === 'door') {
        tileMap[door.x][door.y] = ['.', 'U'];
      }
      //display draw doesn't work in here, not quite sure why that is
      //display.draw needed to draw the open door on pass
      roomsCleared++;
      setCode(`
      /*
      .d8888b  888  888 .d8888b .d8888b  .d88b. .d8888b .d8888b
      88K      888  888 d88P"   d88P"   d8P"     888K    88K
      "Y8888b. 888  888 888     888     888888   "Y8888b "Y8888b
          X88Y 88b 888Y 88b.    Y88b.   Y8b.         X88     X88
      888888P' "Y88888  "Y8888P  "Y8888P "Y8888  88888P' 88888P'
      */`);
      setTimeout(() => {
        if (document.getElementById('screenModal').style.display !== 'none') {
          document.getElementById('screenModal').click();
        }
        setCode('');
      }, 2000);
      setClearedRooms(roomsCleared);
    } else if (pass === false) {
      setCode(failureMessage);
      setTimeout(() => {
        setCode(memory.code);
        setLines(memory.lines);
      }, 3000);
    }
  };

  // useEffect(() => {
  //   setInterval(() => {
  //     console.log(
  //       '30 sec check. Could be useful for animations. Otherwise delete.'
  //     );
  //   }, 30000);
  // }, []);

  let navigate = useNavigate();

  let mapContainer = document.getElementById("mapContainer");
  console.log(mapContainer)
  let backdrop = document.createElement("div");
  backdrop.classList.add("modal-backdrop", "fade", "in");

  /* Start of Score Submission to DB (Not Working on first submit)*/
  function handleScoreSave(event) {
    event.preventDefault();
    const pName = event.target.name.value;
    setPlayerName(pName);
    saveScore(pName);
    document.getElementById("gameOverModal").style.display = "none";
    document.getElementById("gameOverModal").classList.remove("show");
    // document.getElementByID("backdrop").classList.add("fade in");
    navigate("/highscores");
  }

  /* Pulls data from State variables except Name */
  function saveScore(pName) {
    API.saveHighScore({
      player: pName,
      steps: stepsTaken,
      bitcoins: bitcoins || 0,
      score: score,
      date: new Date().toLocaleDateString(),
    })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.response));
  }
  /* End of Score Submission to DB */

  function gameOver() {
    gameOverVar = 1;
    console.log("Game over!")
    console.log(mapContainer)
    document.getElementById("gameOverModal").style.display = "block";
    document.getElementById("gameOverModal").classList.add("show");
    // mapContainer.appendChild(backdrop);
  }

  function showTerminal (){

  }

  function hideTerminal (){

  }

  useEffect(() => {
    setGameOverState({
      score: score,
      bitcoin: bitcoins || 0,
      steps: stepsTaken,
    });
    console.log(gameOverState);
  }, [stepsTaken]);

  function run() {
    const expect = chai.expect;
    let editor = document.querySelector('.CodeMirror').CodeMirror;
    let scriptTest = document.createElement('script');
    scriptTest.setAttribute('id', 'codeMirrorScript');
    scriptTest.textContent = editor.getValue();
    document.getElementById('scripting').appendChild(scriptTest);
    let mochaTest = document.createElement('div');
    mochaTest.setAttribute('id', 'mocha');
    mochaTest.setAttribute('style', 'display: none');
    document.getElementById('scripting').appendChild(mochaTest);
    mocha.setup({
      cleanReferencesAfterRun: true,
      ui: 'bdd',
    });

    testFuncs.doorTest();
    testFuncs.thermalDoor();
    testFuncs.dragonBoss();
    testFuncs.happyDoor();
    testFuncs.tripletBoss();
    testFuncs.escapeDoor();

    mocha.run();

    setTimeout(() => {
      document.getElementById('codeMirrorScript').remove();
      mocha.unloadFiles();
      document.getElementById('mocha').remove();
      console.log(mocha);
      console.log(door);
      if (
        mocha.suite.suites[1].tests[0].state === 'passed' &&
        door.y === 22 &&
        door.x === 16
      ) {
        getTestResult(true, 'door');
        mocha.suite.suites = [];
        console.log('door 2 passed');
      } else if (
        mocha.suite.suites[0].tests[0].state === 'passed' &&
        door.y === 7
      ) {
        getTestResult(true, 'door');
        mocha.suite.suites = [];
        console.log('door 1 passed');
      } else if (
        mocha.suite.suites[3].tests[0].state === 'passed' &&
        door.y === 37
      ) {
        getTestResult(true, 'door');
        mocha.suite.suites = [];
        console.log('door 3 passed');
      } else if (
        mocha.suite.suites[2].tests[0].state === 'passed' &&
        door.y > 20 &&
        door.y < 24
      ) {
        console.log('dragon boss passed');
        getTestResult(true, 'dragon');
        mocha.suite.suites = [];
      } else if (
        mocha.suite.suites[4].tests[0].state === 'passed' &&
        door.y > 41 &&
        door.y < 44
      ) {
        getTestResult(true, 'triplets');
        mocha.suite.suites = [];
        console.log('triplets boss passed');
      } else if (
        mocha.suite.suites[5].tests[0].state === 'passed' &&
        door.x === 16 &&
        door.y === 52
      ) {
        getTestResult(true, 'door');
        mocha.suite.suites = [];
        console.log('escape door passed');
      } else {
        getTestResult(false);
        mocha.suite.suites = [];
      }
    }, 500);
  }

  function createMap(display, tileSet) {
    let playerPos = { x: 7, y: 4 };
    let steps = 0;
    let deadBodyVar = 0;
    let bloodMessageVar = 0;
    let helpStone = 0;
    let keyboardVar = 0;
    let andStatueVar = 0; // the '&' Statue
    let atStatueVar = 0; // the '@' Statue
    let golem1Var = 0;
    let golem2Var = 0;
    let golem3Var = 0;
    let golem4Var = 0;
    let portalVar = 0;
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
    let cat1Var = 0; // Needs to be here even though it it's not affecting flavor dialogue
    let cat2Var = 0; // Needs to be here even though it it's not affecting flavor dialogue
    let dogVar = 0; // Needs to be here even though it it's not affecting flavor dialogue
    let keeperVar = 0;
    let closedChestVar = 0;
    let treeVar = 0;
    let fountainVar = 0;
    let certificateVar = 0; // Needs to be here even though it it's not affecting flavor dialogue

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

      function removeGolem(golem) {
        if (golem === 1) {
          tileMap[23][30] = ['.', 'm'];
          display.draw(30, 23, ['.', 'm']);
          setTimeout(() => {
            tileMap[23][30] = '.';
            display.draw(30, 23, '.');
          }, 500);
        } else if (golem === 2) {
          tileMap[23][45] = '.';
        }
      }

      function drawPlayer() {
        console.log('drawPlayer called. Your playerLevel is ' + lvl);
        switch (lvl) {
          case 0:
            display.draw(playerPos.x, playerPos.y, ['.', 1]);
            break;
          case 1:
            display.draw(playerPos.x, playerPos.y, ['.', 2]);
            setLevel(playerLevels[lvl]);
            break;
          case 2:
            display.draw(playerPos.x, playerPos.y, ['.', 3]);
            setLevel(playerLevels[lvl]);
            break;
          case 3:
            display.draw(playerPos.x, playerPos.y, ['.', 4]);
            setLevel(playerLevels[lvl]);
            break;
          case 4:
            display.draw(playerPos.x, playerPos.y, ['.', 5]);
            setLevel(playerLevels[lvl]);
            break;
          default:
        }
      }

      function drawLight() {
        fov.compute(22, 5, 2, function (x, y, r) {
          if (playerPos.x === x && playerPos.y === y) {
            return drawPlayer();
          }
          display.draw(x, y, tileMap[y][x]);
        });
        fov.compute(22, 4, 2, function (x, y, r) {
          if (playerPos.x === x && playerPos.y === y) {
            return drawPlayer();
          }
          display.draw(x, y, tileMap[y][x]);
        });

        fov.compute(playerPos.x, playerPos.y, lightRadius, function (x, y, r) {
          //fov.compute will not calculate starting position
          if (!r) {
            if (Array.isArray(tileMap[y][x]) && tileMap[y][x][1] === 'U') {
              return display.draw(playerPos.x, playerPos.y, ['U', lvl + 1]);
            } else if (tileMap[y][x] === '=') {
              return display.draw(playerPos.x, playerPos.y, ['=', lvl + 1]);
            } else if (tileMap[y][x] === '_') {
              return display.draw(playerPos.x, playerPos.y, ['_', lvl + 1]);
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
        if (gameOverVar === 0) {
          score =
            Math.floor((1 / Math.log(steps)) * 100000) * (bitCoinsFound + 1);
        }
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
                tileMap[2][13][1] = 'K';
                display.draw(13, 2, ['.', 'K']);
              }
              return false;
            case 'r':
              value = gameFuncs.ring();
              setMessage(value);
              lightRadius++;
              ringVar = 1;
              tileMap[2][22].pop();
              let ringItem = {
                name: 'Ring of Sight',
                power: 'Increased field of view',
              };
              lvl = 2;
              levelUp();
              setInventory((inventory) => [...inventory, ringItem]);
              display.draw(22, 2, '.');
              return false;
            case 'H':
              value = gameFuncs.helpMessage(bloodMessageVar);
              bloodMessageVar++;
              setMessage(value);
              return false;
            case 'L':
              value = gameFuncs.door(keyboardVar, { x: x, y: y });
              if (keyboardVar === 1) {
                setLines(value.lines);
                setCode(value.code);
                setMemory({ code: value.code, lines: value.lines });
                setMessage(value.text);
                setDoor({ x: x, y: y });
                break;
              }
              setMessage(value);
              break;
            case 'J':
              value = gameFuncs.andStatue(andStatueVar);
              andStatueVar++;
              setMessage(value);
              gameOver(); // This is temporary to confirm working of the gameOver chain of functions.
              return false;
            case 'E':
              value = gameFuncs.atStatue(atStatueVar);
              atStatueVar++;
              setMessage(value);
              return false;
            case 'K':
              value = gameFuncs.keyboard();
              setMessage(value);
              tileMap[2][13].pop();
              setVisibility('visible');
              keyboardVar = 1;
              let keyboardItem = {
                name: 'Keyboard of Power',
                power: 'Allows manipulating the environment',
              };
              lvl = 1;
              levelUp();
              setInventory((inventory) => [...inventory, keyboardItem]);
              display.draw(13, 2, '.');
              return false;
            case 'A':
              value = gameFuncs.golem1(golem1Var, keyboardVar);
              golem1Var++;
              setMessage(value);
              removeGolem();
              return false;
            case 'a':
              value = gameFuncs.golem2(golem2Var, ringVar);
              golem2Var++;
              setMessage(value);
              if (ringVar === 1) {
                removeGolem(1);
              }
              return false;
            case 'V':
              value = gameFuncs.golem3(golem3Var, ringVar);
              golem3Var++;
              setMessage(value);
              removeGolem();
              return false;
            case 'v':
              value = gameFuncs.golem4(golem4Var, ringVar);
              golem4Var++;
              setMessage(value);
              removeGolem();
              return false;
            case '@':
              value = gameFuncs.portal(portalVar);
              portalVar++;
              setMessage(value);
              return false;
            case 'T':
            case 't': // First Boss
              value = gameFuncs.bossOne(bossOneVar);
              if (bossOneVar === 0 || bossOneVar === 1 || bossOneVar === 2) {
                setMessage(value);
                bossOneVar++;
                return false;
              }
              setDoor({ x: x, y: y });
              setLines(value.lines);
              setCode(value.code);
              setMessage(value.text);
              bossOneVar++;
              return false;
            case 'Y':
            case 'y': // Second Boss
              if (bossTwoVar > 3 && bossThreeVar > 3 && bossFourVar > 3) {
                value = gameFuncs.bossTwo(
                  bossTwoVar,
                  bossThreeVar,
                  bossFourVar
                );
                setDoor({ x: x, y: y });
                setLines(value.lines);
                setCode(value.code);
                setMessage(value.text);
                return false;
              }
              value = gameFuncs.bossTwo(bossTwoVar, bossThreeVar, bossFourVar);
              bossTwoVar++;
              setMessage(value);
              return false;
            case 'P': // Third Boss
            case 'p': // Third Boss
              if (bossTwoVar > 3 && bossThreeVar > 3 && bossFourVar > 3) {
                value = gameFuncs.bossThree(
                  bossThreeVar,
                  bossTwoVar,
                  bossFourVar
                );
                setDoor({ x: x, y: y });
                setLines(value.lines);
                setCode(value.code);
                setMessage(value.text);
                return false;
              }
              value = gameFuncs.bossThree(
                bossThreeVar,
                bossTwoVar,
                bossFourVar
              );
              bossThreeVar++;
              setMessage(value);
              return false;
            case 'S':
            case 's': // Fourth Boss
              if (bossTwoVar > 3 && bossThreeVar > 3 && bossFourVar > 3) {
                value = gameFuncs.bossFour(
                  bossFourVar,
                  bossTwoVar,
                  bossThreeVar
                );
                setDoor({ x: x, y: y });
                setLines(value.lines);
                setCode(value.code);
                setMessage(value.text);
                return false;
              }
              value = gameFuncs.bossFour(bossFourVar, bossTwoVar, bossThreeVar);
              bossFourVar++;
              setMessage(value);
              return false;
            case 'Z':
            case 'z':
              value = gameFuncs.bossFive(bossFiveVar);
              bossFiveVar++;
              setMessage(value);
              return false;
            case 'D':
            case 'd':
              value = gameFuncs.bossSix(bossSixVar);
              bossSixVar++;
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
              value = gameFuncs.bossEight(bossEightVar, bossSevenVar);
              bossEightVar++;
              setMessage(value);
              return false;
            case 'F':
            case 'f': // Final Boss
              value = gameFuncs.bossFinal(bossFinalVar);
              bossFinalVar++;
              setMessage(value);
              return false;
            case 'u':
              value = gameFuncs.tree(treeVar);
              treeVar++;
              setMessage(value);
              return false;
            case 'j':
              value = gameFuncs.fountain(fountainVar);
              fountainVar++;
              setMessage(value);
              return false;
            case 'G':
              value = gameFuncs.cat1();
              cat1Var++;
              setMessage(value);
              return false;
            case 'g':
              value = gameFuncs.cat2();
              cat2Var++;
              setMessage(value);
              return false;
            case 'k':
              value = gameFuncs.dog();
              dogVar++;
              setMessage(value);
              return false;
            case 'O':
              value = gameFuncs.keeper(keeperVar);
              keeperVar++;
              setMessage(value);
              return false;
            case 'B':
              value = gameFuncs.closedChest(closedChestVar);
              closedChestVar++;
              setMessage(value);
              return false;
            case '$':
              value = gameFuncs.certificate();
              setMessage(value);
              certificateVar = 1;
              let certificateItem = {
                name: 'Certificate of Full Stack',
                power: 'Makes dreams come true',
              };
              setInventory((inventory) => [...inventory, certificateItem]);
              display.draw(13, 2, '=');
              gameOver();
              return false;
            default:
          }
          if (tileMap[x][y][2] === ',') {
            setMessage(
              `Hahahahahahaahahahahahahaahahahahahaahahahaahahaha. NICE TO MEET YOU!!!!!!!!! The insane laughter painfully reverberates through the area. It's so strong your digital ears start bleeding. It's all you can do to stand upright. Through the ringing, you hear something collapse in the distance.`
            );
            removeGolem(2);
            return false;
          }
        }
        //movement logic
        const passable = ['.', 'n', 'U', '=', '-'];
        console.log(x, y);
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
      let godmode = true;
      function handleKey(e) {
        var keyCode = [];
        //Arrows keys
        keyCode[38] = 0; // key-up
        keyCode[39] = 2; // key-right
        keyCode[40] = 4; // key-down
        keyCode[37] = 6; // key-left
        var code = e.keyCode;
        if (!(code in keyCode) || gameOverVar === 1) {
          return false;
        }
        let diff = ROT.DIRS[8][keyCode[code]];
        if (
          passableCheck(playerPos.x + diff[0], playerPos.y + diff[1]) ||
          godmode === true
        ) {
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
    <div className='row' id="mapContainer">
      <div className='col-sm-6'>
        <div className='row'>
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
      <div className='col-sm-6'>
        <div
          className='row'
          style={{
            fontFamily: 'Finger Paint',
            backgroundColor: 'Black',
            padding: '30px',
          }}
        >
          <h4 className='mr-auto'>
            <b>Player Level:</b> {level}
          </h4>
          <h4 className='mr-auto'>
            <b>Rooms Cleared:</b> {clearedRooms}/4
          </h4>
          <h4 className='mr-auto'>
            <b>Steps Taken:</b> {stepsTaken}
          </h4>
          <h4 className='mr-auto'>
            {bitcoins ? (
              <b>You Found {bitcoins} BitCoin!</b>
            ) : (
              'No secrets here ...'
            )}
          </h4>
        </div>
        <div className='row'>
          <p id='message'>{message}</p>
        </div>
        <div
          className='row'
          style={{
            fontFamily: 'Finger Paint',
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
          <h4>
            <b>Items Found: {inventory.length}</b>
          </h4>
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
        <div id='scripting'></div>
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-body'>
              <div className='laptop'>
                <div className='content'>
                  <p id='pro'>Door Code Editor</p>
                  <CodeMirror
                    value={code}
                    options={{
                      tabSize: 2,
                      autoCloseBrackets: true,
                      matchBrackets: true,
                      showCursorWhenSelecting: true,
                      lineNumbers: true,
                      fullScreen: true,
                      mode: 'javascript',
                      keyMap: 'sublime',
                      theme: 'monokai',
                      autoRefresh: true,
                      lineWrapping: true,
                      gutters: ['CodeMirror-lint-markers'],
                      lint: true,
                    }}
                  />
                  <button onClick={run}>Run Me</button>
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
        data-keyboard='false'
        data-backdrop='static'
        aria-labelledby='gameOverModalLabel'
        aria-hidden='true'
      >
        <div
          className='modal-dialog modal-lg modal-dialog-centered'
          role='document'
        >
          <div className='modal-content' id='gameOverModalContent'>
            <div className='modal-body' id='gameOverModalBody'>
              <div
                className='row'
                style={{ margin: '50px', fontFamily: 'Finger Paint' }}
              >
                <p
                  className='mx-auto'
                  style={{ fontSize: '3rem', marginBottom: '50px' }}
                >
                  Congratulations!
                </p>
                <p
                  className='mx-auto'
                  style={{ fontSize: '2rem', marginBottom: '50px' }}
                >
                  You managed to escape the dungeon and gained Full Stack Web
                  Development certification on the way!
                </p>
                <p
                  className='mx-auto'
                  style={{ fontSize: '2rem', marginBottom: '50px' }}
                >
                  Your performance has been scored. Submit your name and
                  immortalize your performance in the Hall of Fame.{' '}
                </p>
              </div>
              <div
                className='row'
                style={{
                  margin: '20px 50px 100px 50px',
                  fontFamily: 'Finger Paint',
                }}
              >
                <form className='w-100' onSubmit={handleScoreSave}>
                  <div className='form-group'>
                    <label htmlFor='name'>Player Name</label>
                    <input
                      type='text'
                      className='form-control'
                      id='name'
                      placeholder='...limit 20 characters'
                      maxLength='20'
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='steps'>Steps Taken</label>
                    <input
                      type='text'
                      className='form-control-plaintext'
                      readOnly
                      id='steps'
                      aria-describedby='stepsHelp'
                      value={stepsTaken}
                      style={{ color: 'white' }}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='bitcoin'>BitCoins Collected</label>
                    <input
                      type='text'
                      className='form-control-plaintext'
                      readOnly
                      id='bitcoin'
                      aria-describedby='bitcoinHelp'
                      value={bitcoins}
                      style={{ color: 'white' }}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='score'>Score</label>
                    <input
                      type='text'
                      className='form-control-plaintext'
                      readOnly
                      id='score'
                      aria-describedby='scoreHelp'
                      value={score}
                      style={{ color: 'white' }}
                    />
                  </div>
                  <button type='submit' className='btn btn-danger btn-block'>
                    Save Score
                  </button>
                </form>
              </div>
              <div
                className='row'
                id='gameOverModalFooter'
                style={{ margin: '50px', fontFamily: 'Finger Paint' }}
              >
                <p
                  className='mx-auto'
                  style={{ fontSize: '2rem', marginBottom: '50px' }}
                >
                  Thanks for playing! Best of luck to the Full Stack Cohort of
                  May 2021!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Map;
