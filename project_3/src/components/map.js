import React from 'react';
import { useState, useEffect } from 'react';
import * as ROT from 'rot-js';
import tiles from '../assets/tiles.png';

function Map() {
  useEffect(() => {
    createMap();
  }, []);

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
        '+': [864, 224],
        '@': [1696, 32],
        '.': [1696, 256],
      },
      width: 252,
      height: 29,
    };
    let display = new ROT.Display(options);

    tileSet.onload = function () {
      let map = [];
      for (let i = 0; i < options.width; i++) {
        map[i] = '+';
        // for (let j = 0; j < options.height; j++) {
        //   map[i][j] = '+'; // create the walls around the map
        // }
      }
      this.map = map;
      this.map.forEach((tile, x) => {
        display.draw(x, 0, tile);
        display.draw(x, 1, tile);
        if (x === 7 || x % 7 === 0) {
          //last room has 2 too many doors
          display.draw(x, 14, '@');
        } else {
          display.draw(x, 14, tile);
        }
        display.draw(x, 27, tile);
        display.draw(x, 28, tile);
      });

      for (let i = 0; i < 29; i++) {
        if (i === 20) {
          display.draw(1, i, '.');
          display.draw(14, i, '.');
          display.draw(15, i, '.');
          display.draw(28, i, '.');
          display.draw(29, i, '.');
          display.draw(42, i, '.');
          display.draw(43, i, '.');
          display.draw(56, i, '.');
          display.draw(57, i, '.');
          display.draw(70, i, '.');
          display.draw(71, i, '.');
          display.draw(84, i, '.');
          display.draw(85, i, '.');
          display.draw(98, i, '.');
          display.draw(99, i, '.');
          display.draw(112, i, '.');
          display.draw(113, i, '.');
          display.draw(126, i, '.');
          display.draw(127, i, '.');
          display.draw(140, i, '.');
          display.draw(141, i, '.');
          display.draw(154, i, '.');
          display.draw(155, i, '.');
          display.draw(168, i, '.');
          display.draw(169, i, '.');
          display.draw(182, i, '.');
          display.draw(183, i, '.');
          display.draw(196, i, '.');
          display.draw(197, i, '.');
          display.draw(210, i, '.');
          display.draw(211, i, '.');
          display.draw(224, i, '.');
          display.draw(225, i, '.');
          display.draw(250, i, '.');
          display.draw(251, i, '.');
        } else {
          display.draw();
          display.draw(0, i, '+');
          display.draw(0, 20, '+');
          display.draw(1, 20, '+');
          display.draw(1, i, '+');
          display.draw(14, i, '+');
          display.draw(15, i, '+');
          display.draw(28, i, '+');
          display.draw(29, i, '+');
          display.draw(42, i, '+');
          display.draw(43, i, '+');
          display.draw(56, i, '+');
          display.draw(57, i, '+');
          display.draw(70, i, '+');
          display.draw(71, i, '+');
          display.draw(84, i, '+');
          display.draw(85, i, '+');
          display.draw(98, i, '+');
          display.draw(99, i, '+');
          display.draw(112, i, '+');
          display.draw(113, i, '+');
          display.draw(126, i, '+');
          display.draw(127, i, '+');
          display.draw(140, i, '+');
          display.draw(141, i, '+');
          display.draw(154, i, '+');
          display.draw(155, i, '+');
          display.draw(168, i, '+');
          display.draw(169, i, '+');
          display.draw(182, i, '+');
          display.draw(183, i, '+');
          display.draw(196, i, '+');
          display.draw(197, i, '+');
          display.draw(210, i, '+');
          display.draw(211, i, '+');
          display.draw(224, i, '+');
          display.draw(225, i, '+');
          display.draw(250, i, '+');
          display.draw(251, i, '+');
          display.draw(250, 20, '+');
          display.draw(251, 20, '+');
        }
      }
      //works for one room (lots of rooms, need a better loop, or some other way)
      let room = [];
      for (let i = 2; i < 14; i++) {
        room[i] = [];
        for (let j = 2; j < 14; j++) {
          room[i][j] = '.';
        }
      }
      makeRoom(room);

      for (let i = 2; i < 14; i++) {
        room[i] = [];
        for (let j = 15; j < 27; j++) {
          room[i][j] = '.';
        }
      }
      makeRoom(room);
    };

    function makeRoom(room) {
      return room.forEach((element, x) => {
        console.log(element);
        element.forEach((element, y) => {
          display.draw(x, y, element);
        });
      });
    }
    let canvas = document.getElementById('map');
    canvas.appendChild(display.getContainer());
  }
  return <></>;
}
export default Map;

//Work in Progress (trying to build rooms better)
// if (
//   x === 2 ||
//   x === 16 ||
//   x === 30 ||
//   x === 44 ||
//   x === 58 ||
//   x === 72 ||
//   x === 96 ||
//   x === 110 ||
//   x === 124 ||
//   x === 138 ||
//   x === 152 ||
//   x === 166 ||
//   x === 180 ||
//   x === 194 ||
//   x === 208 ||
//   x === 222
// ) {
//   let room = [];
//   console.log('making room');
//   for (let i = x; i < x + 13; i++) {
//     room[i] = [];
//     for (let j = x; j < x + 13; j++) {
//       room[i][j] = '.';
//     }
//   }
//   makeRoom(room);

//   // for (let i = x; i < x + 13; i++) {
//   //   room[i] = [];
//   //   for (let j = x + 13; j < x + 26; j++) {
//   //     room[i][j] = '.';
//   //   }
//   // }
//   // makeRoom(room);
// }
