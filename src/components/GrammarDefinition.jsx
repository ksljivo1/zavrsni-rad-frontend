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
                setTerminals(['1', '2', '3', '4', '+']);
                setNonTerminals(['S', 'T']);
                setStartSymbol('S');
                setProductions({
                  S: [['T', '+', 'T']],
                  T: [['1'], ['2'], ['3'], ['4']],
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
