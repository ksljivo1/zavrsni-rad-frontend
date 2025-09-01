import { Box, Button, Divider } from '@mui/material';
import TerminalsSection from './TerminalsSection.jsx';
import NonTerminalsSection from './NonTerminalsSection.jsx';
import StartSymbolSection from './StartSymbolSection.jsx';
import ProductionsSection from './ProductionsSection.jsx';
import React from 'react';

import {
  cardBox,
  columnFlex,
  headerRow,
  loadButton,
} from '../styles/sxStyles.js';

export default function GrammarDefinition(props) {
  const {
    leftSideProductionRule,
    setLeftSideProductionRule,
    rightSideProductionRule,
    setRightSideProductionRule,
    productions,
    setProductions,
    terminals,
    setTerminals,
    nonTerminals,
    setNonTerminals,
    startSymbol,
    setStartSymbol,
    submitSymbol,
    terminalValue,
    setTerminalValue,
    nonTerminalValue,
    setNonTerminalValue,
  } = props;
  return (
    <>
      <Box sx={cardBox}>
        <Box sx={columnFlex}>
          <Box sx={headerRow}>
            <h2 className="title--sm">Grammar Definition</h2>
            <Button
              sx={loadButton}
              onClick={() => {
                setTerminals(['a', 'b']);
                setNonTerminals(['S', 'A', 'B', 'C']);
                setStartSymbol('S');
                setProductions({
                  S: [
                    ['A', 'B'],
                    ['B', 'C'],
                  ],
                  A: [['B', 'A'], ['a']],
                  B: [['C', 'C'], ['b']],
                  C: [['A', 'B'], ['a']],
                });
              }}
            >
              Load Example
            </Button>
          </Box>

          <TerminalsSection
            terminalValue={terminalValue}
            setTerminalValue={setTerminalValue}
            terminals={terminals}
            nonTerminals={nonTerminals}
            setTerminals={setTerminals}
            submitSymbol={submitSymbol}
          />
          <Divider orientation="horizontal" />
          <NonTerminalsSection
            nonTerminalValue={nonTerminalValue}
            setNonTerminalValue={setNonTerminalValue}
            terminals={terminals}
            nonTerminals={nonTerminals}
            setNonTerminals={setNonTerminals}
            submitSymbol={submitSymbol}
          />
          <Divider orientation="horizontal" />
          <StartSymbolSection
            startSymbol={startSymbol}
            setStartSymbol={setStartSymbol}
            nonTerminals={nonTerminals}
          />
          <Divider orientation="horizontal" />
          <ProductionsSection
            leftSideProductionRule={leftSideProductionRule}
            setLeftSideProductionRule={setLeftSideProductionRule}
            rightSideProductionRule={rightSideProductionRule}
            setRightSideProductionRule={setRightSideProductionRule}
            productions={productions}
            setProductions={setProductions}
            terminals={terminals}
            nonTerminals={nonTerminals}
            startSymbol={startSymbol}
          />
        </Box>
      </Box>
    </>
  );
}
