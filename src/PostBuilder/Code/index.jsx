import React, { useState } from 'react';
import { CodeBracket } from '../../style';
import hghl from 'highlight.js';
import ReactTextArea from 'react-textarea-autosize';
import { fileMap } from "../../helper";

const getInputSelection = (el) => {
    let start = 0, end = 0, normalizedValue, range, textInputRange, len, endRange;

    if (typeof el.selectionStart === "number" && typeof el.selectionEnd === "number") {
      start = el.selectionStart;
      end = el.selectionEnd;
    } else {
      range = document.selection.createRange();

      if (range && range.parentElement() === el) {
        len = el.value.length;
        normalizedValue = el.value.replace(/\r\n/g, "\n");

        // create a working TextRange that lives only in the input
        textInputRange = el.createTextRange();
        textInputRange.moveToBookmark(range.getBookmark());

        // check if the start and end of the selection are at the very end
        // of the input, since moveStart/moveEnd doesn't retuen what we want in those cases
        endRange = el.createTextRange();
        endRange.collapse(false);

        if (textInputRange.compareEndPoints("StartToEnd", endRange) > -1) {
          start = end = len;
        } else {
          start = -textInputRange.moveStart("character", -len);
          start += normalizedValue.slice(0, start).split("\n").length - 1;

          if (textInputRange.compareEndPoints("EndToEnd", endRange) > -1) {
            end = len;
          } else {
            end = -textInputRange.moveEnd("character", -len);
            end += normalizedValue.slice(0, end).split("\n").length - 1;
          }
        }
      }
    }
    return {
      start: start,
      end: end
    }
}

const offsetToRangeCharacterMove = (el, offset) => {
    return offset - (el.value.slice(0, offset).split("\r\n").length - 1);
}

const setInputSelection = (el, startOffset, endOffset) => {
    if (typeof el.selectionStart === "number" && typeof el.selectionEnd === "number") {
      el.selectionStart = startOffset;
      el.selectionEnd = endOffset;
    } else {
      const range = el.createTextRange();
      const startCharMove = offsetToRangeCharacterMove(el, startOffset);
      range.collapse(true);
      if (startOffset === endOffset) {
        range.move("character", startCharMove);
      } else {
        range.moveEnd("character", offsetToRangeCharacterMove(el, endOffset));
        range.moveStart("character", startCharMove);
      }
      range.select();
    }
}

const setInputSelectionDiv = (el, startOffset, endOffset) => {
    let selection,range;
    if (window.getSelection) {
        selection = window.getSelection();
        if (selection.getRangeAt) {
            range = selection.getRangeAt(0);
            console.log(el.childNodes[0])
            range.setStart(el.childNodes[0] || el, startOffset);
            range.collapse(true);
        }
    }
}

const getSelectionPos = () => {
    let selection,range;
    if (window.getSelection()) {
        selection = window.getSelection();
        if (selection.getRangeAt) {
            range = selection.getRangeAt(0);
            return {
                start: range.startOffset,
                end: range.endOffset
            }
        }
    }
}

const Code = ({ content, updateItem, setFocusId, element }) => {

    const [ text, setText ] = useState(content);
    const [ file, setFile ] = useState('index.js');
    const [ sel, setSel ] = useState(undefined);
    const node = React.useRef(null);
    const cbrk = React.useRef(null);

    const handleDownKey = e => {
        let value = e.target.value, selStartPos = e.currentTarget.selectionStart;

        switch(e.key) {
            case "Tab": {
                console.log(cbrk.current.querySelector('textarea'), selStartPos);
                value = value.substring(0, selStartPos) + "   " + value.substring(selStartPos, value.length);
                // e.currentTarget.selectionStart = selStartPos + 3;
                // e.currentTarget.selectionEnd = selSta rtPos + 4;
                setSel({
                    start: selStartPos + 3,
                    end: selStartPos + 3
                })
                e.preventDefault();
                break;
            }
            case "{": {
                value = value.substring(0, selStartPos) + "{}" + value.substring(selStartPos, value.length);
                setSel({
                    start: selStartPos + 1,
                    end: selStartPos + 1
                })
                e.preventDefault();
                break;
            }
            case "(": {
                value = value.substring(0, selStartPos) + "()" + value.substring(selStartPos, value.length);
                setSel({
                    start: selStartPos + 1,
                    end: selStartPos + 1
                })
                e.preventDefault();
                break;
            }
            case "<": {
                value = value.substring(0, selStartPos) + "<>" + value.substring(selStartPos, value.length);
                setSel({
                    start: selStartPos + 1,
                    end: selStartPos + 1
                })
                e.preventDefault();
                break;
            }
            case '"': {
                value = value.substring(0, selStartPos) + '""' + value.substring(selStartPos, value.length);
                setSel({
                    start: selStartPos + 1,
                    end: selStartPos + 1
                })
                e.preventDefault();
                break;
            }
            case "'": {
                value = value.substring(0, selStartPos) + "''" + value.substring(selStartPos, value.length);
                setSel({
                    start: selStartPos + 1,
                    end: selStartPos + 1
                })
                e.preventDefault();
                break;
            }
            default: {

            }

        }

        setText(value);
        updateItem({
            text: text,
            file: file
        })
    }

    const handleChange = (e) => {
        setText(e.target.value);
        updateItem({
            text: text,
            file: file
        })
    }

    const handleDownKeyForDiv = (e) => {
        let value = e.target.textContent;
        const selectionPos = getSelectionPos();

        if (e.key === "Tab") {
            e.preventDefault();
            value = value.substring(0, selectionPos.start) + "   " + value.substring(selectionPos.start, value.length);
            e.target.textContent = value;
            setSel({
                start: selectionPos.start + 3,
                end: selectionPos.start + 3
            })
        } else if (e.key === "(") {
            e.preventDefault();
            value = value.substring(0, selectionPos.start) + "()" + value.substring(selectionPos.start, value.length);
            e.target.textContent = value;
            setSel({
                start: selectionPos.start + 1,
                end: selectionPos.start + 1
            })
        } else {
            e.target.textContent = value;
            setSel({
                start: value.length,
                end: value.length
            })

        }

        handleChangeForDiv(e)
    }

    const handleChangeForDiv = (e) => {
        setText(e.target.textContent);
        updateItem({
            text: text,
            file: file
        })
    }

    React.useEffect(() => {
        node.current.querySelectorAll('pre code').forEach(block =>  hghl.highlightBlock(block));
        cbrk.current.querySelectorAll('pre code').forEach(block =>  hghl.highlightBlock(block));
        const t = cbrk.current.querySelector('textarea');
        // const t = cbrk.current.querySelector('pre code');
        if (sel) {
            setInputSelection(t, sel.start, sel.end);
            // setInputSelectionDiv(t, sel.start, sel.end);
            setSel(null);
        }

    }, []);

    React.useEffect(() => {
        node.current.querySelectorAll('pre code').forEach(block =>  hghl.highlightBlock(block))
        cbrk.current.querySelectorAll('pre code').forEach(block =>  hghl.highlightBlock(block));
        const t = cbrk.current.querySelector('textarea');
        // const t = cbrk.current.querySelector('pre code');
        if (sel) {
            setInputSelection(t, sel.start, sel.end);
            // setInputSelectionDiv(t, sel.start, sel.end);
            setSel(null);
        }

    }, [fileMap[file.split(".")[1]], text]);

    return (
        <>
            <CodeBracket ref={cbrk}>
                <ReactTextArea
                    ref={element}
                    autoFocus = { true }
                    onFocus = { setFocusId }
                    onKeyDown = { handleDownKey }
                    onChange = { handleChange }
                    value={text}
                    className={`language-${fileMap[file.split(".")[1]]}`}
                ></ReactTextArea>
                {
/*                    <pre>
                        <code
                            contentEditable={true}
                            onKeyDown={handleDownKeyForDiv}
                            onInput={handleChangeForDiv}
                            className={`language-${fileMap[file.split(".")[1]]}`}
                        ></code>
                    </pre>*/
                }
                <input type="text" className="file" value={file} onChange={(e) => setFile(e.target.value)} />
            </CodeBracket>
            <div ref={node}>
                <pre>
                    <code className={`language-${fileMap[file.split(".")[1]]}`}>{ text }</code>
                </pre>
            </div>
        </>
    );
}

export default Code;