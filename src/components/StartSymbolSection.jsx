import { Box } from '@mui/material';
import Select from '@mui/joy/Select';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Option from '@mui/joy/Option';
import React from 'react';
import { inputRow, startSymbolInput, codeFont } from '../styles/sxStyles.js';

export default function StartSymbolSection(props) {
  const { startSymbol, setStartSymbol, nonTerminals } = props;
  return (
    <>
      <h3 className="text">Start Symbol</h3>
      <Box sx={inputRow}>
        <Select
          placeholder="Select a start symbol"
          value={startSymbol}
          onChange={(e, newValue) => setStartSymbol(newValue)}
          disabled={nonTerminals.length === 0}
          indicator={<KeyboardArrowDown />}
          sx={startSymbolInput}
        >
          {nonTerminals.length > 0
            ? nonTerminals.map((nonTerminal) => (
                <Option key={nonTerminal} value={nonTerminal} sx={codeFont}>
                  {nonTerminal}
                </Option>
              ))
            : null}
        </Select>
      </Box>
    </>
  );
}
