import { marked } from "marked";

import { useEffect, useState } from "react";
import text from "../helpers/edit.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCode, faArrowsAlt } from '@fortawesome/free-solid-svg-icons'

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code, lang) {
    const hljs = require('highlight.js');
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: true,
  sanitize: false,
  smartypants: false,
  xhtml: false
});

//console.log(text)
const Markdown = () => {
  const [html, setHtml] = useState(text);
  const [isFull, setIsFull] = useState(false)
  const renderer = new marked.Renderer();

  //console.log(preview)

  const handleChange = (e) => {
    const preview = document.getElementById("preview");
    setHtml(e.target.value);
    preview.innerHTML = marked(e.target.value);
  };

  const handleClick = (id, e) => {
    const containers = document.getElementsByClassName(`container`)
    const preview = document.getElementById("preview");
    const editor = document.getElementById("editor");
    if (isFull){
      for (let element of containers){
        element.classList.remove('disabled')
        
      }
      editor.classList.remove('maximazed')
      preview.classList.remove('maximazed')
      setIsFull(false)
    } else {
      //console.log(id)
      setIsFull(true)
      preview.classList.add('maximazed')
      editor.classList.add('maximazed')
      containers[id].classList.toggle('disabled')

    }

  }

  useEffect( () => {
    const preview = document.getElementById("preview");
    
    preview.innerHTML = marked(text);
  }, [])

  return (
    <>
    <div className="container">
      <div className="container-editor">
        <div className="topbar">
        <FontAwesomeIcon icon={faCode} />
          <p>Editor</p>
          <FontAwesomeIcon className="icon" icon={faArrowsAlt} onClick={(e) =>handleClick(1)}/>
        </div>
        <textarea id="editor" type="text" value={html} onChange={e => handleChange(e)}>
          {marked.parseInline(html)}
        </textarea>
      </div>
    </div>
    <div className="container">
      <div className="container-preview">
        <div className="topbar">
        <FontAwesomeIcon icon={faCode} />
          <p>Previewer</p>
          <FontAwesomeIcon className="icon" icon={faArrowsAlt} onClick={(e) => handleClick(0)}/>
        </div>
        <div
          id="preview"
          dangerouslySetInnerHTML={{
            __html: marked(html, { renderer: renderer })
          }}
        ></div>
      </div>
    </div>
    </>
  );
};

export default Markdown;
