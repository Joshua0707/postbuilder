import React, { useRef, useEffect } from 'react';
import { ItemWrapper, TitleWrapper } from '../../style';
import Image from '../Image';
import Code from '../Code';
import ContextMenu from './ContextMenu';


export const componentMappings = {
    img: (content, updateItem, setFocusId) => <Image {...content} updateItem={updateItem} setFocusId={setFocusId} />,
    code: (content, updateItem, setFocusId, element) => <Code {...content} updateItem={updateItem} setFocusId={setFocusId} />,
    title: (content, updateItem, setFocusId, element, handleKeyPress) => <TitleItem content={content} updateItem={updateItem} setFocusId={setFocusId} element={element} handleKeyPress={handleKeyPress} />
}

const TitleItem = ({ content, updateItem, handleKeyPress, setFocusId, element }) => {
    return(
        <TitleWrapper>
            <div
                className="header"
                contentEditable={true}
                ref={element}
                onInput = { e => updateItem(e.target.textContent) }
                onKeyPress = {handleKeyPress}
                onFocus = { setFocusId }
            ></div>
            {
                content.trim().length > 0 ? <></> : <Placeholder visible={true} content={content} />
            }
        </TitleWrapper>
    );
}

const Placeholder = () => (
    <div className="placeholder">
        Title here...
    </div>
)

const Item = ({ type, content, updateItem, handleKeyPress, setFocusId, autoFocus }) => {

    const element = useRef(null);
    const [ openCxt, setCxt ] = React.useState({
        x: null,
        y: null,
    });

    useEffect(() => {
        if (!type || type ==='title') {
            autoFocus(element.current)
        }
    });

    const showContextMenu = ({x, y }) => {
        setCxt({
            x: x,
            y: y,
        })
    }

    const hideContextMenu = () => {
      setCxt({
        x: null,
        y: null
      });
      if (window.getSelection && window.getSelection().toString().trim().length > 0) {
        // clear selection
        if (window.getSelection().empty) { // chrome
          window.getSelection().empty();
        } else if (window.getSelection.removeAllRanges()) { // firefox
            window.getSelection().removeAllRanges();
        }
      } else if (document.selection) {
        // clear selection
        document.selection.empty(); // IE
      }
    }

    const selectedText = (e) => {
        /* FOR TEXTAREA
        const start = element.current.selectionStart;
        const end = element.current.selectionEnd;
        console.log(element.current.textContent)
        const content = element.current.target.value;
        const txt = content.substring(start, end);
        console.log(txt, { x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY })
        */
        if (window.getSelection().toString().trim().length > 0) {
          showContextMenu({
              x: e.nativeEvent.offsetX + element.current.getBoundingClientRect().left - 18,
              y: e.nativeEvent.offsetY + element.current.getBoundingClientRect().top + 18
          });
        } else {
          hideContextMenu();
        }

        //update data
        updateItem(e.target.textContent);
    }

    return (
        <ItemWrapper>
            {
                !type ? (
                    <>
                        <div
                            contentEditable={true}
                            ref={element}
                            value={content}
                            onInput = { e => updateItem(e.target.textContent) }
                            onKeyPress = {handleKeyPress}
                            onFocus = { setFocusId }
                            onMouseUp={ selectedText }
                            onBlur = { () => hideContextMenu() }
                        ></div>
                        {
                            openCxt.x || openCxt.y ? <ContextMenu x={openCxt.x} y={openCxt.y} ></ContextMenu> : <></>
                        }
                    </>
                ) : (
                    componentMappings[type](content, updateItem, setFocusId, element, handleKeyPress)
                )
            }
        </ItemWrapper>
    );
}

export default Item;
