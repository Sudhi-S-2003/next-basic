"use client";

import CodePreviewWithCopy from "../../components/CodeSpace/CodePreviewWithCopy";
import { Container, Typography, Box } from "@mui/material";

const CodePreviewPage = () => {
  const sampleCode = `
  <>
    <div style={{ padding: "10px", backgroundColor: "#f0f0f0", borderRadius: "5px" }} className="text-purple-500" >
      <h1>Hello, World!</h1>
      <p>This is a JSX preview without Framer Motion!</p>
    </div>
  </>
  `;

  return (
    <Container sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", py: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: "bold" }}>
          Code Preview with Copy Button
        </Typography>
      </Box>

      <CodePreviewWithCopy
        name="HelloWorld"
        code={sampleCode}
        externalComponents={[
          { variable: "motion", library: "framer-motion" },
          { variable: "React", library: "react" },
        ]}
      />
    </Container>
  );
};

export default CodePreviewPage;
