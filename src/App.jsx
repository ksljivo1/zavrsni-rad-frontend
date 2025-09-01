import PageHeader from './components/PageHeader.jsx';
import { Box, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import GrammarDefinition from './components/GrammarDefinition.jsx';
import { cardBox, gridLayout } from './styles/sxStyles.js';
import WordParser from './components/WordParser.jsx';

const EPS = 'ɛ';

export default function App() {
  const [terminalValue, setTerminalValue] = useState('');
  const [nonTerminalValue, setNonTerminalValue] = useState('');
  const [terminals, setTerminals] = useState([]);
  const [nonTerminals, setNonTerminals] = useState([]);
  const [startSymbol, setStartSymbol] = useState('');
  const [leftSideProductionRule, setLeftSideProductionRule] = useState('');
  const [rightSideProductionRule, setRightSideProductionRule] = useState([EPS]);
  const [productions, setProductions] = useState({});
  const [word, setWord] = useState(['']);
  const [parseTrees, setParseTrees] = useState([]); // store multiple derivations
  const [wordNotGeneratedMessage, setWordNotGeneratedMessage] = useState(null);
  const [parseTreesLoading, setParseTreesLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [tabIndex, setTabIndex] = useState(0); // active tab index

  function submitSymbol(newSymbol, symbols, setSymbols, otherSymbols) {
    const symbolIncluded = symbols.includes(newSymbol);
    const emptySymbol = newSymbol.length === 0;
    const commonSymbols = otherSymbols.includes(newSymbol);
    if (commonSymbols)
      setSnackbarMessage('Symbol cannot be both terminal and non-terminal');
    else {
      symbolIncluded || emptySymbol
        ? setSnackbarMessage('Symbol already included')
        : setSymbols([...symbols, newSymbol]);
      if (emptySymbol)
        setSnackbarMessage('Whitespaces and empty symbols are not allowed');
    }
    setTerminalValue('');
    setNonTerminalValue('');
    setOpen(symbolIncluded || emptySymbol || commonSymbols);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <PageHeader />
      <Box sx={gridLayout}>
        <GrammarDefinition
          leftSideProductionRule={leftSideProductionRule}
          setLeftSideProductionRule={setLeftSideProductionRule}
          rightSideProductionRule={rightSideProductionRule}
          setRightSideProductionRule={setRightSideProductionRule}
          productions={productions}
          setProductions={setProductions}
          terminals={terminals}
          setTerminals={setTerminals}
          nonTerminals={nonTerminals}
          setNonTerminals={setNonTerminals}
          startSymbol={startSymbol}
          setStartSymbol={setStartSymbol}
          submitSymbol={submitSymbol}
          terminalValue={terminalValue}
          setTerminalValue={setTerminalValue}
          nonTerminalValue={nonTerminalValue}
          setNonTerminalValue={setNonTerminalValue}
        />

        <Box sx={cardBox}>
          <h2 className="title--sm">Parse Tree Visualizer</h2>
        </Box>

        <WordParser
          word={word}
          setWord={setWord}
          nonTerminals={nonTerminals}
          parseTrees={parseTrees}
          parseTreesLoading={parseTreesLoading}
          setParseTrees={setParseTrees}
          setParseTreesLoading={setParseTreesLoading}
          terminals={terminals}
          productions={productions}
          setWordNotGeneratedMessage={setWordNotGeneratedMessage}
          wordNotGeneratedMessage={wordNotGeneratedMessage}
          setTabIndex={setTabIndex}
          tabIndex={tabIndex}
          startSymbol={startSymbol}
        />
      </Box>

      <footer>
        Context-Free Grammar Simulator • Built with React • © 2025 Kerim Šljivo
      </footer>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        onClose={handleClose}
        autoHideDuration={4000}
        message={snackbarMessage}
        ContentProps={{
          sx: {
            justifyContent: 'center',
            textAlign: 'center',
          },
        }}
      />
    </>
  );
}
