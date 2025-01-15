import { useState, useEffect, useCallback } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import dynamic from "next/dynamic";
import { Button, Card, Typography, Box, Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";

// Dynamically import JSXParser to prevent SSR issues
const JSXParser = dynamic(() => import("react-jsx-parser"), { ssr: false });

const CodePreviewWithCopy = ({ name, code, externalComponents = [] }) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState("Preview");
  const [components, setComponents] = useState({});
  const [error, setError] = useState(null);

  // Lazy load external components
  const loadExternalComponents = useCallback(async () => {
    const loadedComponents = {};
    for (const { variable, library } of externalComponents) {
      try {
        const importedModule = dynamic(() => import(library), { ssr: false });
        loadedComponents[variable] = importedModule[variable] || importedModule.default;
      } catch (err) {
        setError(`Failed to load component: ${variable} from ${library}`);
        console.error(err);
      }
    }
    setComponents(loadedComponents);
  }, [externalComponents]);

  useEffect(() => {
    loadExternalComponents();
  }, [loadExternalComponents]);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCloseError = () => setError(null);

  const generateCode = (code) => {
    return `
    ${externalComponents.map((lib) => {
      return `import ${lib.variable} from '${lib.library}';`;
    }).join('\n')}
  
    function ${name || 'ComponentName'}() {
      return (
        <>
          ${code}
        </>
      );
    }
  
    export default ${name || 'ComponentName'};
    `;
  };

  return (
    <Card variant="outlined" sx={{ p: 4, maxWidth: "600px", mx: "auto" }}>
      <Typography variant="h6" component="h3" sx={{ mb: 2 }}>
        Code Preview
      </Typography>

      {viewMode === "Code" ? (
        <Box
          sx={{
            p: 2,
            backgroundColor: "#f7f7f7",
            borderRadius: "8px",
            overflowX: "auto",
            fontFamily: "monospace",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
            mb: 2,
          }}
        >
          <code>{generateCode(code)}</code>
        </Box>
      ) : (
        <Box sx={{ p: 2, backgroundColor: "#fff", borderRadius: "8px", boxShadow: 1 }}>
          <JSXParser jsx={code} components={components} />
        </Box>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Button
          variant="contained"
          onClick={() => setViewMode((prev) => (prev === "Preview" ? "Code" : "Preview"))}
          color="primary"
          size="small"
        >
          {viewMode === "Preview" ? "Show Code" : "Show Preview"}
        </Button>

        <CopyToClipboard text={generateCode(code)} onCopy={handleCopy}>
          <Button
            variant="outlined"
            color={copied ? "success" : "primary"}
            size="small"
            sx={{ ml: 2 }}
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
        </CopyToClipboard>
      </Box>

      {/* Snackbar for error handling */}
      {error && (
        <Snackbar open={Boolean(error)} autoHideDuration={3000} onClose={handleCloseError}>
          <MuiAlert elevation={6} variant="filled" severity="error" onClose={handleCloseError}>
            {error}
          </MuiAlert>
        </Snackbar>
      )}
    </Card>
  );
};

export default CodePreviewWithCopy;
