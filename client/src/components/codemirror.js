import CodeMirror from 'codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
// import 'codemirror/mode/jsx/jsx.js'; - mode can be jsx or javascript
import 'codemirror/mode/javascript/javascript';
import React from 'react';
import { useState, useEffect } from 'react';
import chai from 'chai';
import 'chai/register-expect';
import mocha from 'mocha';
import testFuncs from '../assets/js/tests';

function CodeBox({ getTestResult }) {
  const [editor, setCodeEditor] = useState();
  const code = `function tigerBlood() {return 'Will the Conqueror + Fahad the Impressed + Charlie Sheen'}`;

  useEffect(() => {
    const instance = CodeMirror(document.getElementById('codemirror'), {
      value: code,
      tabSize: 2,
      autoCloseBrackets: true,
      matchBrackets: true,
      showCursorWhenSelecting: true,
      lineNumbers: true,
      fullScreen: true,
      mode: 'javascript',
      keyMap: 'sublime',
      theme: 'monokai',
    });
    setCodeEditor(instance);
  }, []);

  function run() {
    const expect = chai.expect;
    let script = document.createElement('script');
    script.textContent = editor.getValue();
    document.getElementById('scripting').appendChild(script);
    mocha.setup({
      cleanReferencesAfterRun: false,
      ui: 'bdd',
    });
    function testCheck() {
      testFuncs.door1();
    }
    testCheck();
    mocha.run();
    let testResult = document.getElementsByClassName('passes');
    setTimeout(() => {
      if (testResult[0].lastChild.textContent === '1') {
        getTestResult(true);
      }
      console.log(testResult[0].lastChild.textContent);
    }, 500);
  }

  return (
    <section>
      <div className='codemirror' id='codemirror'></div>
      <button onClick={run}>Run Me</button>
      <div id='scripting'></div>
      <div style={{ visibility: 'hidden' }} id='mocha'></div>
    </section>
  );
}
export default CodeBox;
