import PageHeader from './components/PageHeader.jsx';
import { Box, Snackbar } from '@mui/material';
import React, { useState } from 'react';
import GrammarDefinition from './components/GrammarDefinition.jsx';
import { cardBox, gridLayout } from './styles/sxStyles.js';

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

  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

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

        <Box sx={cardBox}>
          <h2 className="title--sm">Word Parser</h2>
        </Box>
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
