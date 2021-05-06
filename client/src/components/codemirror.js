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

function CodeBox() {
  const [editor, setCodeEditor] = useState();

  useEffect(() => {
    const code = `function tigerBlood() {return 'Will the Conqueror + Fahad the Impressed + Charlie Sheen'}`;

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
    console.log(editor.getValue());
    let script = document.createElement('script');
    script.textContent = editor.getValue();
    console.log(script);
    document.getElementById('scripting').appendChild(script);
    mocha.setup('bdd');

    describe('tigerBlood', function () {
      it('should return the string', function () {
        // eslint-disable-next-line no-undef
        let result = tigerBlood();
        expect(result).to.eql(
          'Will the Conqueror + Fahad the Impressed + Charlie Sheen'
        );
      });
    });
    mocha.run();
  }

  return (
    <>
      <div className='codemirror' id='codemirror'></div>
      <button onClick={run}>Run Me</button>
      <div id='scripting'></div>
      <div id='mocha'></div>
    </>
  );
}
export default CodeBox;
