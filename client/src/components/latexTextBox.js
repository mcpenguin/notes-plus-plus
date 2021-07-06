import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { useState } from 'react';

const t = "f:\\mathbb{N}^{\\mathbb{N}}\\to \\mathbb{R}"
function LatexTextBox() {
  let [txt, updateTxt] = useState(t);
  return (
    <div>
      <form onSubmit = {(e) => e.preventDefault()}>
        <label>
          Math:
          <input type="text" onChange={({target})=>{
            updateTxt(target.value);
          }}/>
        </label>
      </form>

      <BlockMath>{txt}</BlockMath>
    </div>
  );
}
export default LatexTextBox;