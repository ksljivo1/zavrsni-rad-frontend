import {
  addDeleteButtonStyles,
  cardBox,
  codeFont,
  columnFlex,
  headerRow,
  loadButton,
  nonTerminalInput,
  rightSideProductionLayout,
} from '../styles/sxStyles.js';
import { Box, Button, Tab, Tabs, Zoom } from '@mui/material';
import Select from '@mui/joy/Select';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Option from '@mui/joy/Option';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import DerivationTable from './DerivationTable.jsx';
import React from 'react';

export default function WordParser({
  word,
  setWord,
  terminals,
  nonTerminals,
  productions,
  parseTreesLoading,
  setParseTreesLoading,
  wordNotGeneratedMessage,
  setWordNotGeneratedMessage,
  startSymbol,
  parseTrees,
  setParseTrees,
  tabIndex,
  setTabIndex,
}) {
  const EPS = 'ɛ';

  function deriveWithRules(tree) {
    const derivations = [];

    const sym = (s) => (typeof s === 'string' ? s : Object.keys(s)[0]);

    const normalizeRhs = (rhs) => {
      if (rhs == null) return [];
      return Array.isArray(rhs) ? rhs : [rhs];
    };

    function expand(symbols) {
      const idx = symbols.findIndex((s) => typeof s !== 'string');
      if (idx === -1) return;

      const nt = symbols[idx];
      const lhs = Object.keys(nt)[0];
      const rhs = normalizeRhs(nt[lhs]);
      const rhsStr = rhs.map(sym).join('') || EPS;

      const newSymbols = [
        ...symbols.slice(0, idx),
        ...rhs,
        ...symbols.slice(idx + 1),
      ];

      const before = symbols.map(sym).join('');
      const after = newSymbols.map(sym).join('');

      derivations.push({
        leftRule: lhs,
        rightRule: rhsStr,
        leftDerivation: before,
        rightDerivation: after,
      });

      expand(newSymbols);
    }

    expand([tree]);
    return derivations;
  }

  return (
    <Box sx={cardBox}>
      <Box sx={columnFlex}>
        <h2 className="title--sm">Word Parser</h2>
        <h3 className="text">Enter a word</h3>
        <Box sx={headerRow}>
          <Box sx={rightSideProductionLayout}>
            {word.map((symbol, index) => (
              <Zoom key={index} timeout={800} in mountOnEnter unmountOnExit>
                <Select
                  value={symbol === '' ? EPS : symbol}
                  onChange={(e, newValue) =>
                    setWord([
                      ...word.slice(0, index),
                      newValue,
                      ...word.slice(index + 1),
                    ])
                  }
                  indicator={<KeyboardArrowDown />}
                  sx={nonTerminalInput}
                >
                  {[...terminals, EPS].map((symbol1) => (
                    <Option key={symbol1} value={symbol1} sx={codeFont}>
                      {symbol1}
                    </Option>
                  )) ?? null}
                </Select>
              </Zoom>
            )) ?? null}
            <IconButton
              sx={addDeleteButtonStyles}
              onClick={() => setWord([...word, EPS])}
            >
              <AddCircleOutlineIcon color="success" />
            </IconButton>
            {word.length > 1 && (
              <IconButton
                sx={addDeleteButtonStyles}
                onClick={() => setWord(word.slice(0, word.length - 1))}
              >
                <DeleteIcon color="error" />
              </IconButton>
            )}
          </Box>
          <Button
            disabled={parseTreesLoading}
            sx={loadButton}
            onClick={() => {
              setParseTreesLoading(true);
              const wordToParse =
                word.filter((symbol) => symbol !== EPS && symbol !== '')
                  .length > 0
                  ? word
                      .filter((symbol) => symbol !== EPS && symbol !== '')
                      .join('')
                  : EPS;
              const grammarRequest = fetch('http://localhost:3000/grammar', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  nonTerminals,
                  alphabet: terminals,
                  productions,
                  startSymbol,
                }),
              }).then((response) => response.json());

              grammarRequest
                .then((grammarResponse) => {
                  console.log('Grammar response:', grammarResponse);

                  return fetch('http://localhost:3000/parseTree', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      word: wordToParse,
                    }),
                  });
                })
                .then((response) => {
                  if (response.status === 422) {
                    setWordNotGeneratedMessage(
                      'Word is not generated by the grammar.'
                    );
                  }
                  return response.json();
                })
                .then((parseTreeResponse) => {
                  console.log('ParseTree response:', parseTreeResponse);
                  setParseTreesLoading(false);
                  const derivations = parseTreeResponse.map((pt) =>
                    deriveWithRules(pt.parseTree)
                  );
                  setParseTrees(derivations);
                  setWordNotGeneratedMessage(null);
                  setTabIndex(0);
                })
                .catch((error) => console.error('Error:', error));
            }}
          >
            {parseTreesLoading ? <CircularProgress size="1rem" /> : 'Parse'}
          </Button>
        </Box>

        {wordNotGeneratedMessage ? (
          <p style={{ color: '#ed1d1d' }}>{wordNotGeneratedMessage}</p>
        ) : parseTrees.length === 1 ? (
          <DerivationTable parseTree={parseTrees[0]} />
        ) : parseTrees.length > 1 ? (
          <>
            <p>Word is generated ambiguously by the following derivations:</p>
            <Tabs
              value={tabIndex}
              onChange={(e, newValue) => setTabIndex(newValue)}
            >
              {parseTrees.map((_, idx) => (
                <Tab
                  key={idx}
                  label={`Derivation #${idx + 1}`}
                  sx={{ textTransform: 'none', fontWeight: 'bold' }}
                />
              )) ?? null}
            </Tabs>
            <DerivationTable parseTree={parseTrees[tabIndex]} />
          </>
        ) : null}
      </Box>
    </Box>
  );
}
