import CodeMirror from 'codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
// import 'codemirror/mode/jsx/jsx.js'; - mode can be jsx or javascript
import 'codemirror/mode/javascript/javascript.js';
import React from 'react';
import { useState, useEffect } from 'react';

function CodeBox() {
  const code = `function tigerBlood() {alert('Fahad + Will + Charlie Sheen')} tigerBlood();`;
  const [editor, setCodeEditor] = useState();

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
    console.log(editor.getValue());
    let script = document.createElement('script');
    script.textContent = editor.getValue();
    console.log(script);
    document.getElementById('scripting').appendChild(script);
  }

  return (
    <>
      <div className='codemirror' id='codemirror'></div>
      <button onClick={run}>Run Me</button>
      <div id='scripting'></div>
    </>
  );
}
export default CodeBox;
