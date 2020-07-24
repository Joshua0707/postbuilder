import React, { useState } from 'react';
import { CodeWrapper, CodeBracket } from '../style';

const Code = ({ content, updateItem, setFocusId, element }) => {

    const [ text, setText ] = useState('');
    const [ file, setFile ] = useState('index.txt');

    const updateCode = (e) => {
        updateItem({
            text: e.target.value,
            file: file
        })
    }

    return (
    <CodeBracket>
        <CodeWrapper
            contentEditable={true}
            ref={element}
            onInput = {updateCode}
            autoFocus = { true }
            onFocus = { setFocusId }
        ></CodeWrapper>
        <label className="file">index.txt</label>
    </CodeBracket>
    );
}

export default Code;
