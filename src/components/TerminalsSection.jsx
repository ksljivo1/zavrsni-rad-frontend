import { Box, Button, OutlinedInput } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import { inputRow, terminalInput, addButton } from '../styles/sxStyles.js';
import SymbolsList from './SymbolsList.jsx';

export default function TerminalsSection(props) {
  const {
    terminalValue,
    setTerminalValue,
    terminals,
    nonTerminals,
    setTerminals,
    submitSymbol,
  } = props;
  return (
    <>
      <h3 className="text">Terminals</h3>
      <Box sx={inputRow}>
        <OutlinedInput
          placeholder="Enter a terminal (e.g., a, +, id)"
          value={terminalValue}
          onChange={(e) => setTerminalValue(e.target.value.trim())}
          sx={terminalInput}
        />
        <Button
          sx={addButton}
          onClick={() =>
            submitSymbol(terminalValue, terminals, setTerminals, nonTerminals)
          }
        >
          <AddIcon sx={{ fontSize: '1.1rem' }} />
        </Button>
      </Box>
      {terminals.length > 0 && (
        <SymbolsList symbols={terminals} setSymbols={setTerminals} />
      )}
    </>
  );
}
