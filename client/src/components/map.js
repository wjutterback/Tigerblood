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

let widgets = [];
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

  useEffect(() => {
    let tileSet = document.createElement('img');
    tileSet.src = tiles;
    let options = {
      layout: 'tile',
      tileWidth: 32,
      tileHeight: 32,
      tileSet: tileSet,
      tileMap: {
        1: [800, 1920], // Player - Level 1 (noob)
        2: [672, 1920], // Player - Level 2 (rookie)
        3: [1216, 1920], // Player - Level 3 (knight)
        4: [416, 1920], // Player - Level 4 (mage)
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
        A: [32, 32], // Golem Level 1 Statue Solid
        a: [64, 32], // Golem Level 2 Statue Solid
        V: [96, 32], // Golem Level 3 Statue Solid
        v: [128, 32], // Golem Level 4 Statue Solid
        m: [288, 32], // Golem Statue Destroyed
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
        u: [480, 416], // Tree (light permeable)
        o: [416, 416], // Tree (light impermeable)
        '@': [1984, 0], // Escape Portal
        $: [1504, 1376], // Certificate
        '<': [], // Grass NW
        '>': [], // Grass NE
        '(': [], // Grass SW
        ')': [], // Grass SE
        '?': [800, 224], // see through tile, Looks very similar to real wall
        ',': [32, 1952], // joy,
        6: [0, 1120], // necklace
      },
      width: 92,
      height: 33,
    };

    let display = new ROT.Display(options);

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
    /*
    .d8888b 888d888 888d888 .d88b.  888d888
    d8P  *8 b88P"   888P"  d88""88b 888P"
    8888888 888     888    888  888 888
    Y8b.    888     888    Y88..88P 888
    '"Y8888 888     888     "Y88P"  888
    */`;
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
      } else if (test === 'wizard') {
        setMessage(
          `The wizard beams with pride as the warrior sighs in frustration. "I finally beat him! I'm gold now, buddy. I've unlocked the chest over there, take what's inside - I don't need it anymore.`
        );
        tileMap[11][55] = ['.', 6];
        //TODO: Wizard gives you item that increases light and breaks golem
      } else if (test === 'antiVirus') {
        setMessage(
          `The antivirus creature had become a virus itself. Tish's antivirus program gravely wounded it... As the light slowly goes out of the creatures eyes, you see a faint smile pass across its face. With the last of its strength, it feebly waves its hand through the air - a terminal appears and the creature executes some code. "Go, a portal awaits." The antivirus creature dies! The worm within you wriggles with joy.`
        );
        tileMap[23][75] = ['.', '@'];
      } else if (test === 'door') {
        tileMap[door.x][door.y] = ['.', 'U'];
      }
      roomsCleared++;
      setCode(`
      /*
      888         888 888888 888   88 888   88 888888 888   88 .d8888b
      '8P       '88P    88   888'  88 888'  88   88   888'  88 d.
       '88  88  d88'    88   88 88 88 88 88 88   88   88 88 88 880888,
        '88 88b 88      88   88  '888 88  '888   88   88  '888 88   88
         88Y "88Y     888888 88   888 88   888 888888 88   888 '88888'
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
      }, 2500);
    }
  };

  let navigate = useNavigate();

  function toggleInventory() {
    console.log("toggleInventory detected")
    let inventory = document.querySelector('#inventoryDiv');
    if (inventory.style.display === 'block') {
      inventory.style.display = 'none';

    } else {
      inventory.style.display = 'block';
    }
  }


  function showInventory() {
    let content = document.querySelector('.inventoryDiv');
    if (content.style.display === 'block') {
      content.style.display = 'none';
    } else {
      content.style.display = 'block';
    }
  }

  function launchScreenModal() {
    document.getElementById('screenModal').style.display = 'block';
    document.getElementById('screenModal').classList.add('show');
    let mapContainer = document.getElementById('mapContainer');
    console.log(mapContainer);
    let screenBackdrop = document.createElement('div');
    screenBackdrop.classList.add('screenModalBackdrop');
    mapContainer.appendChild(screenBackdrop);
    let editor = document.querySelector('.CodeMirror').CodeMirror;
    editor.refresh();
  }

  function closeScreenModal() {
    let mapContainer = document.getElementById('mapContainer');
    console.log(mapContainer);
    let screenBackdrop = document.querySelector('.screenModalBackdrop');
    mapContainer.removeChild(screenBackdrop);
    document.getElementById('screenModal').style.display = 'none';
    document.getElementById('screenModal').classList.remove('show');
  }

  /* Start of Score Submission to DB (Not Working on first submit)*/
  function handleScoreSave(event) {
    event.preventDefault();
    const pName = event.target.name.value;
    setPlayerName(pName);
    saveScore(pName);
    document.getElementById('gameOverModal').style.display = 'none';
    document.getElementById('gameOverModal').classList.remove('show');
    // document.getElementByID("backdrop").classList.add("fade in");
    navigate('/highscores');
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
    console.log('Game over!');

    document.getElementById('gameOverModal').style.display = 'block';
    document.getElementById('gameOverModal').classList.add('show');
    let mapContainer = document.getElementById('mapContainer');
    console.log(mapContainer);
    let backdrop = document.createElement('div');
    backdrop.classList.add('gameOverBackdrop');
    mapContainer.appendChild(backdrop);
  }

  useEffect(() => {
    setGameOverState({
      score: score,
      bitcoin: bitcoins || 0,
      steps: stepsTaken,
    });
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
    testFuncs.wizardBoss();
    testFuncs.spreadDoor();
    testFuncs.antivirusBoss();

    mocha.run();

    setTimeout(() => {
      document.getElementById('codeMirrorScript').remove();
      mocha.unloadFiles();
      // document.getElementById('mocha').remove();
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
      } else if (
        mocha.suite.suites[6].tests[0].state === 'passed' &&
        door.y > 50 &&
        door.y < 55
      ) {
        getTestResult(true, 'wizard');
        mocha.suite.suites = [];
        console.log('wizard passed');
      } else if (
        mocha.suite.suites[7].tests[0].state === 'passed' &&
        door.x === 16 &&
        door.y === 67
      ) {
        getTestResult(true, 'door');
        mocha.suite.suites = [];
        console.log('spread door passed');
      } else if (
        mocha.suite.suites[8].tests[0].state === 'passed' &&
        door.y > 58
      ) {
        getTestResult(true, 'antiVirus');
        mocha.suite.suites = [];
        console.log('antivirus boss beaten');
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
    let ringVar = 0;
    let necklaceVar = 0;
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
    let certificateVar = 0; // It will trigger gameOver()

    tileSet.onload = function () {
      let lightRadius = 2;
      //returns true or false on whether light should pass an object
      function lightPasses(y, x) {
        try {
          if (tileMap[x][y] === undefined || tileMap[x][y] === null) {
          }
          const blockLight = ['#', 'L', '&', 'M', 'm', 'o', '@'];
          if (Array.isArray(tileMap[x][y]) === true) {
            if (blockLight.some((tile) => tileMap[x][y].includes(tile))) {
              return false;
            }
          } else if (tileMap[x][y] === '#') {
            return false;
          }
          return true;
        } catch (err) {}
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

      function removeGolem({ x, y }, golem) {
        if (golem === 1) {
          tileMap[23][45] = ['.', 'm'];
          display.draw(45, 23, ['.', 'm']);
          setTimeout(() => {
            tileMap[23][45] = '.';
            display.draw(45, 23, '.');
          }, 500);
        } else {
          tileMap[x][y] = ['.', 'm'];
          display.draw(y, x, ['.', 'm']);
          setTimeout(() => {
            tileMap[x][y] = '.';
            display.draw(y, x, '.');
          }, 500);
        }
      }

      function drawPlayer() {
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
        fov.compute(42, 5, 2, function (x, y, r) {
          if (playerPos.x === x && playerPos.y === y) {
            return drawPlayer();
          }
          display.draw(x, y, tileMap[y][x]);
        });
        fov.compute(42, 6, 2, function (x, y, r) {
          if (playerPos.x === x && playerPos.y === y) {
            return drawPlayer();
          }
          display.draw(x, y, tileMap[y][x]);
        });
        fov.compute(53, 8, 2, function (x, y, r) {
          if (playerPos.x === x && playerPos.y === y) {
            return drawPlayer();
          }
          display.draw(x, y, tileMap[y][x]);
        });
        fov.compute(73, 3, 2, function (x, y, r) {
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
            } else if (tileMap[y][x] === ['=', '$']) {
              return display.draw(playerPos.x, playerPos.y, ['=', lvl + 1]);
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
          //artifically limits player movement by waiting for timeout to be resolved before allowing for new keydown event to be registered
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
                setVisibility('visible');
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
              // setVisibility('visible');
              keyboardVar = 1;
              let keyboardItem = {
                name: 'Keyboard of Power',
                power: 'Lets you see and solve obstacles in code',
              };
              lvl = 1;
              levelUp();
              setInventory((inventory) => [...inventory, keyboardItem]);
              display.draw(13, 2, '.');
              return false;
            case 'A':
              value = gameFuncs.golem1(golem1Var, keyboardVar);
              setMessage(value);
              removeGolem({ x: x, y: y });
              return false;
            case 'a':
              value = gameFuncs.golem2(golem2Var, ringVar);
              golem2Var++;
              setMessage(value);
              if (ringVar === 1) {
                removeGolem({ x: x, y: y });
              }
              return false;
            case 'V':
              value = gameFuncs.golem3(golem3Var);
              golem3Var++;
              setMessage(value);
              return false;
            case 'v':
              //TODO: Wizard Item Implementaion to destroy golem
              value = gameFuncs.golem4(golem4Var, necklaceVar);
              golem4Var++;
              setMessage(value);
              if (necklaceVar === 1) {
                removeGolem({ x: x, y: y });
              }
              return false;
            case '@':
              value = gameFuncs.portal();
              setMessage(value);
              return true;
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
              setMemory({ code: value.code, lines: value.lines });
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
                setMemory({ code: value.code, lines: value.lines });
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
                setMemory({ code: value.code, lines: value.lines });
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
                setMemory({ code: value.code, lines: value.lines });
                return false;
              }
              value = gameFuncs.bossFour(bossFourVar, bossTwoVar, bossThreeVar);
              bossFourVar++;
              setMessage(value);
              return false;
            case 'Z':
            case 'z':
              if (bossFiveVar > 3 && bossSixVar > 3) {
                value = gameFuncs.bossFive(bossFiveVar, bossSixVar);
                setDoor({ x: x, y: y });
                setLines(value.lines);
                setCode(value.code);
                setMessage(value.text);
                setMemory({ code: value.code, lines: value.lines });
                return false;
              }
              value = gameFuncs.bossFive(bossFiveVar);
              bossFiveVar++;
              setMessage(value);
              return false;
            case 'D':
            case 'd':
              if (bossFiveVar > 3 && bossSixVar > 3) {
                value = gameFuncs.bossSix(bossFiveVar, bossSixVar);
                setDoor({ x: x, y: y });
                setLines(value.lines);
                setCode(value.code);
                setMessage(value.text);
                setMemory({ code: value.code, lines: value.lines });
                return false;
              }
              value = gameFuncs.bossSix(bossSixVar, bossFiveVar);
              bossSixVar++;
              setMessage(value);
              return false;
            case 'X':
            case 'x':
              value = gameFuncs.bossSeven(bossSevenVar);
              if (bossSevenVar === 3) {
                lvl++;
              }
              bossSevenVar++;
              setMessage(value);
              return false;
            case 'C':
            case 'c':
              if (bossEightVar > 2 && bossSevenVar > 2) {
                value = gameFuncs.bossEight(bossEightVar, bossSevenVar);
                setDoor({ x: x, y: y });
                setLines(value.lines);
                setCode(value.code);
                setMessage(value.text);
                setMemory({ code: value.code, lines: value.lines });
                return false;
              }
              value = gameFuncs.bossEight(bossEightVar, bossSevenVar);
              bossEightVar++;
              setMessage(value);
              return false;
            case 'F':
            case 'f': // Final Boss
              value = gameFuncs.bossFinal(
                bossFinalVar,
                cat1Var,
                cat2Var,
                dogVar
              );
              if (
                bossFinalVar > 0 &&
                cat1Var > 0 &&
                cat2Var > 0 &&
                dogVar > 0
              ) {
                setMessage(value);
                setTimeout(() => {
                  tileMap[22][84] = '=';
                  tileMap[23][84] = '=';
                  display.draw(84, 22, '=');
                  display.draw(84, 23, '=');
                }, 1000);
                setTimeout(() => {
                  tileMap[22][87] = ['=', 'b'];
                  display.draw(87, 22, ['=', 'b']);
                }, 2000);
                setTimeout(() => {
                  tileMap[22][87] = ['=', '$'];
                  display.draw(87, 22, ['=', '$']);
                }, 3000);
                return true;
              } else {
                bossFinalVar++;
                console.log(bossFinalVar, cat1Var, cat2Var, dogVar);
                setMessage(value);
                return false;
              }
            case 'u':
            case 'o':
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
              tileMap[14][87].pop();
              let cat1Item = {
                name: 'Freya the Cat',
                power: 'Makes humans pamper her with a simple look.',
              };
              setInventory((inventory) => [...inventory, cat1Item]);
              display.draw(86, 14, '=');
              return true;
            case 'g':
              value = gameFuncs.cat2();
              cat2Var++;
              setMessage(value);
              tileMap[5][78].pop();
              let cat2Item = {
                name: 'Ptahmose the Cat',
                power: 'Schemes in private about how to harass dogs.',
              };
              setInventory((inventory) => [...inventory, cat2Item]);
              display.draw(78, 5, '=');
              return true;
            case 'k':
              value = gameFuncs.dog();
              dogVar++;
              setMessage(value);
              tileMap[10][79].pop();
              let dogItem = {
                name: 'Lexie the Dog',
                power: 'Rings bells and squeaks "WATER" in a funny voice.',
              };
              setInventory((inventory) => [...inventory, dogItem]);
              display.draw(79, 10, '=');
              return true;
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
              tileMap[22][87].pop();
              display.draw(87, 22, '=');
              setTimeout(() => {
                gameOver();
              }, 1000);
              return false;
            case 6:
              setMessage(
                'You pick up the necklace and immediately your vision expands.'
              );
              let necklaceItem = {
                name: 'Necklace of Legends',
                power: 'Grants sight beyond sight',
              };
              setInventory((inventory) => [...inventory, necklaceItem]);
              necklaceVar++;
              lightRadius++;
              lvl++;
              tileMap[11][55] = '.';
              display.draw(55, 11, '.');
              return false;
            default:
          }
          if (tileMap[x][y][2] === ',') {
            setMessage(
              `Hahahahahahaahahahahahahaahahahahahaahahahaahahaha. NICE TO MEET YOU!!!!!!!!! The insane laughter painfully reverberates through the area. It's so strong your digital ears start bleeding. It's all you can do to stand upright. Through the ringing, you hear something collapse in the distance.`
            );
            removeGolem({ x: x, y: y }, 1);
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
        if (number === 77) {
          bitCoinsFound++;
          setBitcoins(bitCoinsFound);
          setMessage(
            `You found a bitcoin! Your excitement immediately turns to rage as you imagine Tish celebrating. Did she program a positive feedback loop for finding bitcoin? You are desperate for another jolt.`
          );
        }
      }
      let godmode = false;
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
          steps++;
          setStepsTaken(steps);
          updateScore();
          setScore(score);
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
    <div className='row' id='mapContainer'>
      <div className='col-sm-12 col-md-6'>
        <div
          className='row'
          id='statsRow'
        >
          <p className='mr-auto'>
            <b>Level:</b> {level}
          </p>
          <p className='mr-auto'>
            <b>Rooms Cleared:</b> {clearedRooms}/4
          </p>
          <p className='mr-auto'>
            <b>Steps:</b> {stepsTaken}
          </p>
          <p 
            className='mr-auto btn btn-lg'
            id="inventoryBtn"
            onClick={toggleInventory}
          >
            <b>Check Inventory</b>
          </p>
        </div>
        <div className='row' id="mapRow">
          <div
            className=''
            id='drawingBoard'
          >
            <div
              id='map'
              className='start'
            >
              {/* MAP goes here */}
            </div>
          </div>
        </div>
      </div>
      <div className='col-sm-12 col-md-6'>
        <div className='row' id="inventoryRow">
          <div id="inventoryDiv">
            <div className="row" id="inventoryTitle">
              <p 
                className="mx-auto"
              ><u>Inventory</u></p>
              <button
                className="close" 
                type="btn" 
                style={{float: "right", color: "red"}}
                onClick={toggleInventory}
              >X</button>
            </div>
            <div className="row" id="inventoryBitcoin">
              {bitcoins ? (
                <p className='mr-auto'><b>BitCoins:</b> The Gods of Crypton have granted you {bitcoins} BitCoin!</p>
              ) : (
                <p className='mr-auto'><b>BitCoins:</b> The Gods of Crypton have not deemed you worthy... yet.</p>
              )}
            </div>
            <div className="row" id="inventoryItems">
              {!inventory.length
                ? <p style={{margin: "1rem 1rem 1rem 0"}}><b>Items</b>: You haven't found any items yet. Keep exploring!</p>
                : <div className="col-sm-12">
                    <div className="row">
                      <p
                        style={{margin: "1rem 1rem 1rem 0"}}
                      ><b>Items</b>: </p>
                    </div>
                    <div className="row">
                      <ol>
                        {inventory.map((item, i) => (
                          <div className="row">
                            <li key={i} style={{marginLeft: "1rem"}}>
                              <p>
                                <b>{item.name}</b>: {item.power}
                              </p>
                            </li>
                          </div>
                        ))}
                      </ol>
                    </div>
                  </div>
              }
            </div>
          </div>
        </div>
        <div className='row'>
          <p id='message'>{message}</p>
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
              onClick={launchScreenModal}
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
        data-keyboard='true'
        data-backdrop='true'
        aria-labelledby='screenModalLabel'
        aria-hidden='true'
      >
        <div id='scripting'></div>
        <div className='modal-dialog modal-dialog-centered' role='document'>
          <div className='modal-content'>
            <div className='modal-body'>
              <div className='laptop'>
                <div className='content'>
                  <p id='pro'>
                    VSX Code
                    <span
                      style={{
                        float: 'right',
                        color: 'white',
                        padding: '0',
                        fontWeight: 'bolder',
                        marginRight: '10px',
                      }}
                      className='btn'
                      onClick={closeScreenModal}
                    >
                      X
                    </span>
                  </p>
                  <CodeMirror
                    value={code}
                    id="codeMirror"
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
