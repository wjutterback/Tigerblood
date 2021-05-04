import React from 'react';
import { useState, useEffect } from 'react';
import * as ROT from 'rot-js';
import tiles from '../assets/tiles.png';
import tileArray from '../assets/array/array';

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
        O: [576, 2240], // Eye Obelisk 1 2,240
        o: [736, 2240], // Eye Obelisk 2
        M: [64, 32], // Golem Statue 1
        m: [160, 32], // Golem Statue 2
        N: [0, 192], // Lava
        n: [0, 224], // Cooled Lava
        T: [768, 2464], // Boss 1 Upper
        t: [736, 2464], // Boss 1 Lower
        Y: [640, 2432], // Boss 2 Upper
        y: [608, 2432], // Boss 2 Lower
        P: [384, 2432], // Boss 3 Upper
        p: [320, 2432], // Boss 3 Lower
        S: [2016, 832], // Boss 4 Upper
        s: [1984, 832], // Boss 4 Lower
        D: [1952, 832], // Boss 5 Upper
        d: [1920, 832], // Boss 5 Lower
        Z: [128, 864], // Boss 6 Upper
        z: [160, 864], // Boss 6 Lower
        X: [64, 864], // Boss 7 Upper
        x: [96, 864], // Boss 7 Lower
        C: [0, 864], // Boss 8 Upper
        c: [32, 864], // Boss 8 Lower
        F: [1888, 832], // Final Boss Upper
        f: [1856, 832], // Final Boss Lower
        '.': [1984, 128], // Floor (Passable) 94x63
        K: [992, 864],
      },
      width: 151,
      height: 31,
    };
    let display = new ROT.Display(options);

    let tileArrayPosition = 0;

    tileSet.onload = function () {
      let map = [];

      for (let i = 0; i < options.height; i++) {
        map[i] = [];
        for (let j = 0; j < options.width; j++) {
          map[i][j] = getTileValue();
          tileArrayPosition += 1;
        }
      }
      function getTileValue() {
        return tileArray[tileArrayPosition];
      }

      map.forEach((element, y) => {
        element.forEach((element, x) => {
          display.draw(x, y, element);
        });
      });
      let canvas = document.getElementById('map');
      canvas.appendChild(display.getContainer());
    };
  }
  return <></>;
}
export default Map;
