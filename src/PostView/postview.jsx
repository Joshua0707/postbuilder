import React from 'react';
import ReactMarkdown from 'react-markdown';
import hghl from 'highlight.js';
import {  } from 'highlight.js/styles/atom-one-dark.css';
import { fileMap } from "../helper";

export const PostView = ({ post }) => (
  <React.Fragment>
    {
        post.map((item, index ) => <ItemView key={index} item={item} />)
    }
  </React.Fragment>
)

export const componentMappings = {
    img: content => <ImageView content={content} />,
    code: content => <CodeView content={content} />,
    title: content => <h2>{content}</h2>,
}

const ItemView = ({ item }) => {
  const { type, content } = item;
  return (
    <div className="item-vw">
      {
          !type ? (
              <ReactMarkdown source={content} />
          ) : (
              componentMappings[type](content)
          )
      }
    </div>
  )
}

const ImageView = ({ content }) => {
    return (
      <div>
        <img src={content.src} alt={content.alt} />
      </div>
    )
}

const CodeView = (props) => {
  React.useEffect(() => {
    document.querySelectorAll('pre code').forEach(block =>  hghl.highlightBlock(block))
  }, []);

  React.useEffect(() => {
    document.querySelectorAll('pre code').forEach(block =>  hghl.highlightBlock(block));
  }, [fileMap[props.content.file.split(".")[1]], props.content.text]);

  return (
    <pre>
        <code className={`language-${fileMap[props.content.file.split(".")[1]] || 'javascript'}`}>{ props.content.text }</code>
    </pre>
  )
}
