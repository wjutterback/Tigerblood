import CodeMirror from 'codemirror';
import { Link } from "react-router-dom";
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

function CodeBox({ getTestResult, code }) {
  const [editor, setCodeEditor] = useState();
  const codeValue = code ? code : '';

  useEffect(() => {
    const instance = CodeMirror(document.getElementById('codemirror'), {
      value: codeValue,
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

  if (editor) {
    editor.getDoc().setValue(code);

    // Option 1: Read Only Lines - user can't add lines but works pretty well, line 1 is always capable of being removed
    let readOnlyLines = [1, 2, 3, 4, 5, 6, 7, 8, 10];
    editor.on('beforeChange', function (cm, change) {
      if (~readOnlyLines.indexOf(change.from.line)) {
        change.cancel();
      }
    });
    //Option 2: buggy, but user has more freedom
    // editor.markText(
    //   { line: 1, ch: '/' },
    //   { line: 6, ch: '{' },
    //   { readOnly: true }
    // );
    // editor.markText(
    //   { line: 8, ch: '}' },
    //   { line: 11, ch: ')' },
    //   {
    //     readOnly: true,
    //     css: 'color: #fe2',
    //   }
    // );
  }

  function run() {
    const expect = chai.expect;
    let script = document.createElement('script');
    script.textContent = editor.getValue();
    // script.setAttribute('type', 'module');
    document.getElementById('scripting').appendChild(script);
    mocha.setup({
      cleanReferencesAfterRun: false,
      ui: 'bdd',
    });

    testFuncs.doorTest();

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
    <section style={{ fontSize: "1rem"}}>
      <div className='codemirror' id='codemirror'></div>
      <button onClick={run}>Run Me</button>
      <div id='scripting'></div>
      <div style={{ visibility: 'hidden'}} id='mocha'></div>
    </section>
  );
}
export default CodeBox;
