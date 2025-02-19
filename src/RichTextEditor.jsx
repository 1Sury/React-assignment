import React, { useState, useEffect, useRef } from "react";

const RichTextEditor = ({ userData, onSave }) => {
  const [content, setContent] = useState("");
  const [editHistory, setEditHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const editorRef = useRef(null);
  const [selection, setSelection] = useState(null);

  useEffect(() => {
    const savedContent = localStorage.getItem("richTextContent");
    if (savedContent) {
      setContent(savedContent);
      setEditHistory([savedContent]);
      setHistoryIndex(0);
    }

    if (editorRef.current) {
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(editorRef.current);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
  }, []);

  useEffect(() => {
    if (userData) {
      const formattedData = `
        <div style="margin-bottom: 16px;">
          <strong>User Details:</strong>
          <div style="margin-left: 16px;">
            ${Object.entries(userData)
              .map(([key, value]) => `<div><em>${key}:</em> ${value}</div>`)
              .join("")}
          </div>
        </div>
      `;
      setContent((prev) => prev + formattedData);
      addToHistory(formattedData);

      setTimeout(() => {
        if (editorRef.current) {
          const range = document.createRange();
          const sel = window.getSelection();
          range.selectNodeContents(editorRef.current);
          range.collapse(false);
          sel.removeAllRanges();
          sel.addRange(range);
        }
      }, 0);
    }
  }, [userData]);

  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel.getRangeAt && sel.rangeCount) {
      const range = sel.getRangeAt(0);
      setSelection(range.cloneRange());
    }
  };

  const restoreSelection = () => {
    if (selection) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(selection.cloneRange());
    }
  };

  const handleCommand = (command, value = null) => {
    saveSelection();
    editorRef.current.focus();
    restoreSelection();
    document.execCommand(command, false, value);

    const updatedContent = editorRef.current.innerHTML;
    setContent(updatedContent);
    addToHistory(updatedContent);

    editorRef.current.focus();
  };

  const addToHistory = (newContent) => {
    const newHistory = editHistory.slice(0, historyIndex + 1);
    newHistory.push(newContent);
    setEditHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setContent(editHistory[historyIndex - 1]);

      setTimeout(() => {
        if (editorRef.current) {
          const range = document.createRange();
          const sel = window.getSelection();
          range.selectNodeContents(editorRef.current);
          range.collapse(false);
          sel.removeAllRanges();
          sel.addRange(range);
          editorRef.current.focus();
        }
      }, 0);
    }
  };

  const handleRedo = () => {
    if (historyIndex < editHistory.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setContent(editHistory[historyIndex + 1]);

      setTimeout(() => {
        if (editorRef.current) {
          const range = document.createRange();
          const sel = window.getSelection();
          range.selectNodeContents(editorRef.current);
          range.collapse(false);
          sel.removeAllRanges();
          sel.addRange(range);
          editorRef.current.focus();
        }
      }, 0);
    }
  };

  const handleSave = () => {
    localStorage.setItem("richTextContent", content);
    if (onSave) {
      onSave(content);
    }
  };

  const handleClear = () => {
    setContent("");
    addToHistory("");
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
      }
    }, 0);
  };

  const handleInput = (e) => {
    const newContent = e.currentTarget.innerHTML;
    setContent(newContent);
    addToHistory(newContent);

    setTimeout(() => {
      if (editorRef.current) {
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(editorRef.current);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }, 0);
  };

  const buttonStyle = {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid #4a4a4a",
    borderRadius: "4px",
    background: "#2a2a2a",
    color: "#fff",
    cursor: "pointer",
    padding: "0",
    margin: "0 2px",
    fontSize: "14px",
    fontWeight: "bold",
  };

  const containerStyle = {
    backgroundColor: "#1a1a1a",
    padding: "16px",
    borderRadius: "8px",
    width: "100%",
  };

  const toolbarStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    marginBottom: "16px",
  };

  const groupStyle = {
    display: "flex",
    gap: "4px",
  };

  const editorStyle = {
    minHeight: "200px",
    width: "100%",
    padding: "16px",
    backgroundColor: "#2a2a2a",
    border: "1px solid #4a4a4a",
    borderRadius: "4px",
    color: "white",
    cursor: "text",
    outline: "none",
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  };

  return (
    <div style={containerStyle}>
      <div style={toolbarStyle}>
        <div style={groupStyle}>
          <button
            style={buttonStyle}
            onClick={() => handleCommand("bold")}
            title="Bold"
          >
            B
          </button>
          <button
            style={{ ...buttonStyle, fontStyle: "italic" }}
            onClick={() => handleCommand("italic")}
            title="Italic"
          >
            I
          </button>
          <button
            style={{ ...buttonStyle, textDecoration: "underline" }}
            onClick={() => handleCommand("underline")}
            title="Underline"
          >
            U
          </button>
          <button
            style={buttonStyle}
            onClick={() => handleCommand("insertUnorderedList")}
            title="Bullet List"
          >
            •
          </button>
        </div>

        <div style={groupStyle}>
          <button
            style={buttonStyle}
            onClick={() => handleCommand("justifyLeft")}
            title="Align Left"
          >
            ←
          </button>
          <button
            style={buttonStyle}
            onClick={() => handleCommand("justifyCenter")}
            title="Align Center"
          >
            ↔
          </button>
          <button
            style={buttonStyle}
            onClick={() => handleCommand("justifyRight")}
            title="Align Right"
          >
            →
          </button>
        </div>

        <div style={groupStyle}>
          <button
            style={buttonStyle}
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            title="Undo"
          >
            ↩
          </button>
          <button
            style={buttonStyle}
            onClick={handleRedo}
            disabled={historyIndex >= editHistory.length - 1}
            title="Redo"
          >
            ↪
          </button>
          <button style={buttonStyle} onClick={handleSave} title="Save">
            💾
          </button>
          <button style={buttonStyle} onClick={handleClear} title="Clear">
            ❌
          </button>
        </div>
      </div>

      <div
        ref={editorRef}
        contentEditable
        style={editorStyle}
        onInput={handleInput}
        onSelect={saveSelection}
        dangerouslySetInnerHTML={{ __html: content }}
        onFocus={() => {
          if (!selection && editorRef.current) {
            const range = document.createRange();
            const sel = window.getSelection();
            range.selectNodeContents(editorRef.current);
            range.collapse(false);
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }}
      />
    </div>
  );
};

export default RichTextEditor;
