import { Box, Button, Chip, OutlinedInput, Slide } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { List, ListItem } from '@mui/joy';
import React from 'react';
import { inputRow, terminalInput, addButton } from '../styles/sxStyles.js';
import SymbolsList from './SymbolsList.jsx';

export default function NonTerminalsSection(props) {
  const {
    terminals,
    nonTerminals,
    setNonTerminals,
    nonTerminalValue,
    setNonTerminalValue,
    submitSymbol,
  } = props;
  return (
    <>
      <h3 className="text">Non-terminals</h3>
      <Box sx={inputRow}>
        <OutlinedInput
          placeholder="Enter a non-terminal (e.g., S, A, B)"
          value={nonTerminalValue}
          onChange={(e) => setNonTerminalValue(e.target.value.trim())}
          sx={terminalInput}
        />
        <Button
          onClick={() =>
            submitSymbol(
              nonTerminalValue,
              nonTerminals,
              setNonTerminals,
              terminals
            )
          }
          sx={addButton}
        >
          <AddIcon sx={{ fontSize: '1.1rem' }} />
        </Button>
      </Box>
      {nonTerminals.length > 0 && (
        <SymbolsList symbols={nonTerminals} setSymbols={setNonTerminals} />
      )}
    </>
  );
}
