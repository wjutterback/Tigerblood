import CodeMirror from 'codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';
// import 'codemirror/mode/jsx/jsx.js'; - mode can be jsx or javascript
import 'codemirror/mode/javascript/javascript.js';
import React from 'react';
import { useState, useEffect } from 'react';

function CodeBox() {
  const code = 'const winning = Fahad + Will;';
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
  }

  return (
    <>
      <div className='codemirror' id='codemirror'></div>
      <button onClick={run}>Run Me</button>
      <div>Compile here</div>
    </>
  );
}
export default CodeBox;
