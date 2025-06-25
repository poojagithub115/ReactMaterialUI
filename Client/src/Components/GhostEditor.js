import React, { useRef, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

import 'quill/dist/quill.snow.css';
import Quill from 'quill';

// Import language packs
// import 'quill/lang/es'; // Spanish
// import 'quill/lang/fr'; // French
// import 'quill/lang/de'; // German
// import 'quill/lang/hi'; // Hindi
// import 'quill/lang/zh'; // Chinese

// Material UI
import { Box, Button, MenuItem, Select, Typography, Paper } from '@mui/material';


const Editor = () => {
  const quillRef = useRef(null);
  const [editorContent, setEditorContent] = useState('');
  const [language, setLanguage] = useState('en');

  const [translatedText, setTranslatedText] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [currentInput, setCurrentInput] = useState('');
  const debounceTimer = useRef(null);
  useEffect(() => {
    const editor = quillRef.current?.getEditor();
    if (editor) {
      editor.root.lang = language;
    }
  }, [language]);

  useEffect(() => {
   
    const handleKeyDown = (e) => {
      if (e.key === 'Tab' && suggestion) {
        e.preventDefault();
        const editor = quillRef.current.getEditor();
        editor.insertText(editor.getLength() - 1, suggestion + ' ');
        setSuggestion('');
      }
    };



    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [suggestion, language]);



  const fetchSuggestion = async (textFragment) => {
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: `Suggest a likely next phrase after: "${textFragment}"` }],
          max_tokens: 10,
        },
        {
          headers: {
            Authorization: `Bearer YOUR_OPENAI_API_KEY`,
          },
        }
      );
      const suggestionText = response.data.choices[0]?.message?.content?.trim();
      setSuggestion(suggestionText || '');
    } catch (error) {
      console.error('Suggestion fetch failed:', error);
    }
  };


  const paraphraseText = async (style) => {
    const editor = quillRef.current.getEditor();
    const selection = editor.getSelection();

    if (!selection || selection.length === 0) {
      alert('Please select some text to paraphrase.');
      return;
    }

    const selectedText = editor.getText(selection.index, selection.length);

    try {
      // Replace this with your actual paraphrasing API URL
      const res = await axios.post('https://your-paraphrasing-api.com/paraphrase', {
        text: selectedText,
        style: style, // e.g., 'formal', 'standard', 'simple'
      });

      setTranslatedText(res.data.paraphrasedText);

    } catch (error) {
      console.error('Paraphrasing failed:', error);
      setTranslatedText('Paraphrasing failed.');
    }
  };
  const onChange = (content, delta, source, editor) => {
    setEditorContent(content);
    const plainText = editor.getText().trim();
    setCurrentInput(plainText);

    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    if (plainText.length > 3) {
      debounceTimer.current = setTimeout(() => {
        fetchSuggestion(plainText.split(/\s+/).slice(-10).join(' '));
      }, 800);
    } else {
      setSuggestion('');
    }
  }



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
          language: 'en-US'
        }
      });

      let improvedText = selectedText;
      const matches = res.data.matches;

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

      setEditorContent(improvedText);
    } catch (error) {
      console.error('Grammar check failed:', error);
      setTranslatedText('Grammar check failed.');
    }
  };

  return (
    <Box sx={{ maxWidth: '800px', height: '100%', margin: 'auto', my: 4, px: 2 }}>
      <Typography variant="h5" gutterBottom>
        GhostEditor
      </Typography>

      <ReactQuill
        ref={quillRef}
        value={editorContent}
        onChange={setEditorContent}
        placeholder="Write something..."
        style={{ height: '200px', marginBottom: '16px' }}
      />
      {suggestion && (
        <Typography
          sx={{
            position: 'absolute',
            top: '235px',
            left: '16px',
            color: '#ccc',
            pointerEvents: 'none',
            fontSize: '16px',
            zIndex: 1,
          }}
        >
          {currentInput} <span style={{ color: '#bbb' }}>{suggestion}</span>
        </Typography>
      )}

      <Box sx={{ mt: 6, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          size="small"
        >
          <MenuItem value="en">English</MenuItem>
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
  );
};

export default Editor;
