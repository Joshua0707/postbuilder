import React, { useState } from 'react';
import uuid from 'uuid/index';
import Item from './Item/index';
import Toolbar from './Toolbar';
import { ToolbarWrapper, TopBarWrapper } from '../style';
import { FaArrowLeft, FaCheck } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const PostBuilder = ({ makePost }) => {
    const [items, setItems] = useState([
        {
            type: 'title',
            content: '',
            id: uuid()
        },
        {
            type: null,
            content: '',
            id: uuid()
        }
    ]);

    const [focusId, setFocusId] = useState(items[0].id);
    const [created, setCreated] = useState(null);

    const addItem = (type, content) => {
        const id = uuid();
        setItems(state => [ ...state, { type, content, id: id }]);
        setFocusId(id);
    }

    const updateItem = (id, newContent) => {
        setItems(state => {
            const itemIndex = state.findIndex(item => item.id === id);
            const newState = [...state];
            newState[itemIndex].content = newContent;
            return newState;
        })
    }

    const deleteItem = (id) => {
        if (items.length > 0) {
            setItems(state => {
                const newState = state.filter(item => item.id !== id);
                return newState;
            });
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const itemIndex = items.findIndex(item => item.id === focusId);
            if (items[itemIndex + 1]) {
                setFocusId(items[itemIndex + 1].id)
            } else if (e.target.textContent.trim() !== "") { // e.target.value for textarea
                addItem(null, '');
            }
        }
    }

    const handleMakePost = () => {
        const data = makePost(items);

        if (data.error) {
            console.log("error");
        } else {
            setCreated(data);
        }
    }

    return (
        <div className="bd_posts">
            <TopBarWrapper>
              <React.Fragment>
                <Link to="/home"><button><FaArrowLeft /> Go Back</button></Link>
              </React.Fragment>
              <React.Fragment>
                <button onClick={handleMakePost}><FaCheck /></button>
              </React.Fragment>
            </TopBarWrapper>
            <h1>Create a new Post</h1>
             {
                 created ? (
                    created
                 ) : (
                 items.map(item => (
                    <Item
                        key = {item.id}
                        editable = {true}
                        type = {item.type}
                        content = {item.content}
                        updateItem = {newContent => updateItem(item.id, newContent)}
                        handleKeyPress = {handleKeyPress}
                        setFocusId = {() => setFocusId(item.id)}
                        autoFocus = {(e) => {
                            if (item.id === focusId) {
                                e.focus();
                            }
                        }}
                    />
                 ))
                 )
             }
             <ToolbarWrapper>
                 <Toolbar addItem={addItem} deleteItem={deleteItem} focusId={focusId} />
             </ToolbarWrapper>
        </div>
    )
}

export default PostBuilder;