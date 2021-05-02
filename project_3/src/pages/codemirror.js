import CodeMirror from '@uiw/react-codemirror';
import 'codemirror/keymap/sublime';
import 'codemirror/theme/monokai.css';

function CodeBox() {
  const code = 'winning = Fahad + Utterback;';
  return (
    <>
      <CodeMirror
        value={code}
        options={{
          theme: 'monokai',
          keyMap: 'sublime',
          mode: 'jsx',
        }}
      />
    </>
  );
}
export default CodeBox;
