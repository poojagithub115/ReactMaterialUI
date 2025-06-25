import React, { useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

// Material UI
import { Box, Button, MenuItem, Select, Typography, Paper, Container } from '@mui/material';

const Editor = () => {
  const quillRef = useRef(null);
  const [editorContent, setEditorContent] = useState('');
  const [language, setLanguage] = useState('es');
  const [translatedText, setTranslatedText] = useState('');




  const paraphraseText = async (style) => {
    const editor = quillRef.current.getEditor();
    const selection = editor.getSelection();

    if (!selection || selection.length === 0) {
      alert('Please select some text to paraphrase.');
      return;
    }

    const selectedText = editor.getText(selection.index, selection.length);

    try {
      const res = await axios.post('https://your-paraphrasing-api.com/paraphrase', {
        text: selectedText,
        style: style,
      });

      const paraphrased = res.data.paraphrasedText;
      setTranslatedText(paraphrased);

      // Insert back into editor
      editor.deleteText(selection.index, selection.length);
      editor.insertText(selection.index, res.data.paraphrasedText);

    } catch (error) {
      console.error('Paraphrasing failed:', error);
      setTranslatedText('Paraphrasing failed.');
    }
  };


  const checkGrammarAndImprove = async () => {
    const editor = quillRef.current.getEditor();
    const selection = editor.getSelection();

    if (!selection || selection.length === 0) {
      alert('Please select some text to improve.');
      return;
    }

    const selectedText = editor.getText(selection.index, selection.length);

    try {
      const res = await axios.post('https://api.languagetoolplus.com/v2/check', null, {
        params: {
          text: selectedText,
          language: 'en-US',
          enabledOnly: false // Ensures all rules are checked (grammar + spelling)
        }
      });

      let improvedText = selectedText;
      const matches = res.data.matches;

      // Apply corrections from last to first to avoid offset issues
      matches
        .sort((a, b) => b.offset - a.offset)
        .forEach(match => {
          if (match.replacements && match.replacements.length > 0) {
            const replacement = match.replacements[0].value;
            improvedText =
              improvedText.slice(0, match.offset) +
              replacement +
              improvedText.slice(match.offset + match.length);
          }
        });

      // Replace selected text in editor with improved version
      editor.deleteText(selection.index, selection.length);
      editor.insertText(selection.index, improvedText);

      setTranslatedText('Grammar and spelling improved!');
    } catch (error) {
      console.error('Grammar and spelling check failed:', error);
      setTranslatedText('Grammar and spelling check failed.');
    }
  };

  return (
    <Container maxWidth="md">

      <Box sx={{ maxWidth: '800px', height: '100%', margin: 'auto', my: 4, px: 2 }}>
        <Typography variant="h5" gutterBottom>
          AI-Enhanced Editor
        </Typography>

        <ReactQuill
          ref={quillRef}
          value={editorContent}
          onChange={setEditorContent}
          placeholder="Write something..."
          style={{ height: '200px', marginBottom: '16px' }}
        />

        <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', gap: 2 }}>
          <Select value={language} onChange={(e) => setLanguage(e.target.value)} size="small">
            <MenuItem value="es">Spanish</MenuItem>
            <MenuItem value="fr">French</MenuItem>
            <MenuItem value="de">German</MenuItem>
            <MenuItem value="hi">Hindi</MenuItem>
            <MenuItem value="zh">Chinese</MenuItem>
          </Select>
          {/* 
        <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}> */}

          <Button variant="contained" color="primary" onClick={checkGrammarAndImprove}>
            Check Grammar & Improve
          </Button>
          <Button variant="contained" onClick={() => paraphraseText('formal')}>
            Formal
          </Button>
          <Button variant="contained" onClick={() => paraphraseText('standard')}>
            Standard
          </Button>
          <Button variant="contained" onClick={() => paraphraseText('simple')}>
            Simple
          </Button>
          {/* </Box> */}

        </Box>

        {translatedText && (
          <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
            <Typography variant="h6">Improved Text:</Typography>
            <Typography>{translatedText}</Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default Editor;
