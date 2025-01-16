import React, { useState } from "react";
import MonacoEditor from "@monaco-editor/react";

const CodeEditor = () => {
  const [code, setCode] = useState({
    html: "<!-- Start typing HTML here -->",
    css: "/* Add your CSS here */",
    js: "// Add your JavaScript here",
  });

  const handleEditorChange = (language, value) => {
    setCode((prev) => ({
      ...prev,
      [language]: value,
    }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <header style={{ padding: "10px", backgroundColor: "#333", color: "#fff", textAlign: "center" }}>
        <h1>VS Code-like Editor</h1>
      </header>
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* HTML Editor */}
        <div style={{ flex: 1, padding: "10px" }}>
          <h3>HTML</h3>
          <MonacoEditor
            height="calc(100% - 30px)"
            language="html"
            value={code.html}
            onChange={(value) => handleEditorChange("html", value)}
            options={{
              minimap: { enabled: false },
              automaticLayout: true,
            }}
          />
        </div>

        {/* CSS Editor */}
        <div style={{ flex: 1, padding: "10px" }}>
          <h3>CSS</h3>
          <MonacoEditor
            height="calc(100% - 30px)"
            language="css"
            value={code.css}
            onChange={(value) => handleEditorChange("css", value)}
            options={{
              minimap: { enabled: false },
              automaticLayout: true,
            }}
          />
        </div>

        {/* JavaScript Editor */}
        <div style={{ flex: 1, padding: "10px" }}>
          <h3>JavaScript</h3>
          <MonacoEditor
            height="calc(100% - 30px)"
            language="javascript"
            value={code.js}
            onChange={(value) => handleEditorChange("js", value)}
            options={{
              minimap: { enabled: false },
              automaticLayout: true,
            }}
          />
        </div>
      </div>

      <div style={{ padding: "10px", backgroundColor: "#f4f4f4", textAlign: "center" }}>
        <h3>Live Output</h3>
        <iframe
          title="Live Output"
          style={{
            width: "100%",
            height: "40vh",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
          srcDoc={`
            <!DOCTYPE html>
            <html lang="en">
            <head>
              <style>${code.css}</style>
            </head>
            <body>
              ${code.html}
              <script>${code.js}</script>
            </body>
            </html>
          `}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
