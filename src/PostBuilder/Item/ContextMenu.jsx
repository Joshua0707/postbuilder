import React from 'react';
import styled from 'styled-components';
import { FaListOl, FaListUl } from 'react-icons/fa';

const ContextWrapper = styled.div`
  background: white;
  z-index: 10;
  min-width: 160px;
  max-width: 200px;
  box-shadow: .5px .5px 3px #ddd, 3px 3px 5px #eee;
  box-sizing: border-box;
  .desc {
    width: 100%;
    text-align: center;
    padding: .5rem;
    color: #676767;
    box-sizing: border-box;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    maxline: 1;
  }

  &:focus, &:hover {
    outline: none;
  }

  .row {
    width: 100%;
    display: flex;
    flex-flow: wrap row;
    justify-content: flex-start;
    &:last-child {
      border-bottom: none;
    }
    .col {
      text-align: center;
      padding: .5rem;
      color: #676767;
      box-sizing: border-box;
      border-bottom: thin solid #eeeeeea0;
      cursor: pointer;
      font-size: .95rem;
      min-width: 40px;
      &:hover {
        background: #eee;
      }
      .u {
        text-decoration: underline;
      }
      .s {
        text-decoration: line-through;
      }
    }
  }
`

const ContextMenu = ({ x, y, hide }) => {

    const cxt = React.useRef();
    const [ text, setText ] = React.useState("");

    React.useEffect(() => {
        cxt.current.offSetX = x;
        cxt.current.offSetY = y;
        setText(window.getSelection().toString());
    });

    const setAction = (action = "") => {
      var selected, range, span;
      if (action === 'bold') {
        span = `** ${text} **`;
      } else if (action === 'italics') {
        span = `_ ${text} _`;
      } else if (action === 'header') {
        span = `# ${text}\n`;
      } else if (action === 'strike') {
        span = `~~${text}~~`;
      } else if (action === 'code') {
        span = `\`${text}\``;
      } else if (action === 'ol') {
        span = `\`${text}\``;
      } else if (action === 'ul') {
        span = `${'\n'}- ${text}${'\n'}`;
      } else {
        span = text;
      }
      if (window.getSelection && window.getSelection().toString().trim().length > 0) {
        selected = window.getSelection();
        if (selected.rangeCount) {
          range = selected.getRangeAt(0);
          range.deleteContents();
          range.insertNode(document.createTextNode(span));
        }
      } else if (document.selection && document.selection.createRange()) {
        range = document.selection.createRange();
        range.text = span;
      }
    }


    return (
        <ContextWrapper
          className="ctxt"
          ref={cxt}
          style={{ 'position': 'fixed', "top": y, "left": x }} >
            <div className="desc">"{ text }"</div>
            <div className="row">
              <div className="col" onMouseOver={() => setAction('bold')} onMouseLeave={() => setAction()} > <strong>b</strong> </div>
              <div className="col" onMouseOver={() => setAction('italics')} onMouseLeave={() => setAction()} > <i>i</i> </div>
              <div className="col" onMouseOver={() => setAction('underline')} onMouseLeave={() => setAction()} > <span className="u">u</span> </div>
              <div className="col" onMouseOver={() => setAction('strike')} onMouseLeave={() => setAction()} > <span className="s">s</span> </div>
              <div className="col" onMouseOver={() => setAction('header')} onMouseLeave={() => setAction()} > h1 </div>
              <div className="col" onMouseOver={() => setAction('sub')} onMouseLeave={() => setAction()} > x<sub>sub</sub> </div>
              <div className="col" onMouseOver={() => setAction('sup')} onMouseLeave={() => setAction()} > x<sup>sup</sup> </div>
              <div className="col" onMouseOver={() => setAction('code')} onMouseLeave={() => setAction()} > {'</>'} </div>
              <div className="col" onMouseOver={() => setAction('ol')} onMouseLeave={() => setAction()} > <FaListOl /> </div>
              <div className="col" onMouseOver={() => setAction('ul')} onMouseLeave={() => setAction()} > <FaListUl /> </div>
            </div>
        </ContextWrapper>
    )
}

export default ContextMenu;
