import PageHeader from './components/PageHeader.jsx';
import {
  Box,
  Button,
  Chip,
  Divider,
  OutlinedInput,
  Slide,
  Fade,
  Snackbar,
  Zoom,
} from '@mui/material';
import Option from '@mui/joy/Option';
import Select, { selectClasses } from '@mui/joy/Select';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import AddIcon from '@mui/icons-material/Add';
import { List, ListItem } from '@mui/joy';
import { useEffect, useState } from 'react';
import EastIcon from '@mui/icons-material/East';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import React from 'react';

const EPS = 'ɛ';

const gridLayout = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '30px',
  margin: '30px 120px',
  '@media (max-width: 1000px)': {
    gridTemplateColumns: '1fr',
  },
};

const cardBox = {
  borderRadius: '7px',
  border: '1px solid #DDD',
  padding: '30px 25px',
  background: '#fff',
};

const columnFlex = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

const headerRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

const loadButton = {
  padding: '5px 15px',
  color: '#0153aa',
  textTransform: 'none',
  fontWeight: '550',
  fontSize: '0.7625rem',
  borderRadius: '7px',
  border: '2px solid #DDD',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    background: '#0153aa',
    color: 'white',
    borderColor: '#0153aa',
  },
};

const inputRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '10px',
};

const terminalInput = {
  borderRadius: '5px',
  width: '100%',
  backgroundColor: '#f5f5f5',
  fontSize: '0.9rem',
  outline: 'none',
  '& .MuiOutlinedInput-input': { padding: '6px 12px' },
  '&:focus': { border: '2px solid #0153aa', backgroundColor: '#fff' },
  fontFamily: '"Fira Code", "Source Code Pro", "JetBrains Mono", monospace',
};

const addButton = {
  color: 'white',
  background: 'radial-gradient(circle at right bottom, #3580dc, #0153aa)',
  textTransform: 'none',
  fontWeight: '550',
  borderRadius: '7px',
  height: '33px',
  width: '38px',
  minWidth: 'unset',
  transition: 'transform 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
};

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

  useEffect(() => {
    console.log('productions:', productions);
  }, [productions]);

  function handleClose() {
    setOpen(false);
  }

  return (
    <>
      <PageHeader />
      <Box sx={gridLayout}>
        <Box sx={cardBox}>
          <Box sx={columnFlex}>
            <Box sx={headerRow}>
              <h2 className="title--sm">Grammar Definition</h2>
              <Button sx={loadButton}>Load Example</Button>
            </Box>

            <h3 className="text">Terminals</h3>
            <Box sx={inputRow}>
              <OutlinedInput
                placeholder="Enter terminal (e.g., a, +, id)"
                value={terminalValue}
                onChange={(e) => setTerminalValue(e.target.value.trim())}
                sx={terminalInput}
              />
              <Button
                sx={addButton}
                onClick={() =>
                  submitSymbol(
                    terminalValue,
                    terminals,
                    setTerminals,
                    nonTerminals
                  )
                }
              >
                <AddIcon sx={{ fontSize: '1.1rem' }} />
              </Button>
            </Box>
            {terminals.length > 0 && (
              <List orientation="horizontal">
                {terminals.map((terminal) => (
                  <ListItem key={terminal}>
                    <Slide
                      timeout={500}
                      direction="left"
                      in
                      mountOnEnter
                      unmountOnExit
                    >
                      <Chip
                        key={terminal}
                        label={terminal}
                        color="success"
                        variant="outlined"
                        onDelete={() =>
                          setTerminals(
                            terminals.filter((symbol) => symbol !== terminal)
                          )
                        }
                      />
                    </Slide>
                  </ListItem>
                )) ?? null}
              </List>
            )}
            <Divider orientation="horizontal" />
            <h3 className="text">Non-terminals</h3>
            <Box sx={inputRow}>
              <OutlinedInput
                placeholder="Enter non-terminal (e.g., S, A, B)"
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
              <List orientation="horizontal">
                {nonTerminals.map((nonTerminal) => (
                  <ListItem key={nonTerminal}>
                    <Slide
                      timeout={500}
                      direction="left"
                      in
                      mountOnEnter
                      unmountOnExit
                    >
                      <Chip
                        key={nonTerminal}
                        label={nonTerminal}
                        color="success"
                        variant="outlined"
                        onDelete={() =>
                          setNonTerminals(
                            nonTerminals.filter(
                              (symbol) => symbol !== nonTerminal
                            )
                          )
                        }
                      />
                    </Slide>
                  </ListItem>
                )) ?? null}
              </List>
            )}
            <Divider orientation="horizontal" />
            <h3 className="text">Start Symbol</h3>
            <Box sx={inputRow}>
              <Select
                placeholder="Select start symbol"
                value={startSymbol}
                onChange={(e, newValue) => setStartSymbol(newValue)}
                disabled={nonTerminals.length === 0}
                indicator={<KeyboardArrowDown />}
                sx={{
                  ...terminalInput,
                  [`& .${selectClasses.indicator}`]: {
                    transition: '0.2s',
                    [`&.${selectClasses.expanded}`]: {
                      transform: 'rotate(-180deg)',
                    },
                  },
                }}
              >
                {nonTerminals.length > 0
                  ? nonTerminals.map((nonTerminal) => (
                      <Option
                        key={nonTerminal}
                        value={nonTerminal}
                        sx={{
                          fontFamily:
                            '"Fira Code", "Source Code Pro", "JetBrains Mono", monospace',
                        }}
                      >
                        {nonTerminal}
                      </Option>
                    ))
                  : null}
              </Select>
            </Box>
            <Divider orientation="horizontal" />
            <h3 className="text">Production Rules</h3>
            <Box sx={inputRow}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Select
                  placeholder="Select a non-terminal"
                  value={leftSideProductionRule}
                  onChange={(e, newValue) => {
                    setLeftSideProductionRule(newValue);
                  }}
                  disabled={nonTerminals.length === 0}
                  indicator={<KeyboardArrowDown />}
                  sx={{
                    ...terminalInput,
                    width: 'fit-content',
                    [`& .${selectClasses.indicator}`]: {
                      transition: '0.2s',
                      [`&.${selectClasses.expanded}`]: {
                        transform: 'rotate(-180deg)',
                      },
                    },
                  }}
                >
                  {nonTerminals.length > 0
                    ? nonTerminals.map((nonTerminal) => (
                        <Option
                          key={nonTerminal}
                          value={nonTerminal}
                          sx={{
                            fontFamily:
                              '"Fira Code", "Source Code Pro", "JetBrains Mono", monospace',
                          }}
                        >
                          {nonTerminal}
                        </Option>
                      ))
                    : null}
                </Select>
                <EastIcon />
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  {rightSideProductionRule.map(
                    (rightSideProductionRule1, index) => (
                      <Zoom
                        key={index}
                        timeout={800}
                        in
                        mountOnEnter
                        unmountOnExit
                      >
                        <Select
                          placeholder="Select start symbol"
                          value={
                            rightSideProductionRule1 === ''
                              ? EPS
                              : rightSideProductionRule1
                          }
                          onChange={(e, newValue) =>
                            setRightSideProductionRule([
                              ...rightSideProductionRule.slice(0, index),
                              newValue,
                              ...rightSideProductionRule.slice(index + 1),
                            ])
                          }
                          indicator={<KeyboardArrowDown />}
                          sx={{
                            ...terminalInput,
                            width: 'fit-content',
                            [`& .${selectClasses.indicator}`]: {
                              transition: '0.2s',
                              [`&.${selectClasses.expanded}`]: {
                                transform: 'rotate(-180deg)',
                              },
                            },
                          }}
                        >
                          {[...terminals, ...nonTerminals, EPS].map(
                            (symbol) => (
                              <Option
                                key={symbol}
                                value={symbol}
                                sx={{
                                  fontFamily:
                                    '"Fira Code", "Source Code Pro", "JetBrains Mono", monospace',
                                }}
                              >
                                {symbol}
                              </Option>
                            )
                          ) ?? null}
                        </Select>
                      </Zoom>
                    )
                  ) ?? null}
                  <IconButton
                    sx={{ padding: 0 }}
                    onClick={() =>
                      setRightSideProductionRule([
                        ...rightSideProductionRule,
                        EPS,
                      ])
                    }
                  >
                    <AddCircleOutlineIcon color="success" />
                  </IconButton>
                  {rightSideProductionRule.length > 1 && (
                    <IconButton
                      sx={{ padding: 0 }}
                      onClick={() =>
                        setRightSideProductionRule(
                          rightSideProductionRule.slice(
                            0,
                            rightSideProductionRule.length - 1
                          )
                        )
                      }
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  )}
                </Box>
              </Box>
              {leftSideProductionRule !== null &&
                leftSideProductionRule !== '' && (
                  <Button
                    sx={addButton}
                    onClick={() => {
                      setProductions({
                        ...productions,
                        [leftSideProductionRule]: [
                          ...(productions[[leftSideProductionRule]] ?? []),
                          rightSideProductionRule,
                        ],
                      });
                      setLeftSideProductionRule('');
                      setRightSideProductionRule([EPS]);
                    }}
                  >
                    <AddIcon sx={{ fontSize: '1.1rem' }} />
                  </Button>
                )}
            </Box>
            {Object.keys(productions).length > 0 && (
              <List marker="disc">
                {Object.keys(productions).map((nonTerminal) => (
                  <ListItem key={nonTerminal}>
                    <Slide
                      timeout={500}
                      direction="left"
                      in
                      mountOnEnter
                      unmountOnExit
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        <span
                          style={{
                            color:
                              nonTerminal === startSymbol ? 'green' : 'black',
                          }}
                        >
                          {nonTerminal}
                        </span>
                        <EastIcon sx={{ scale: 0.8 }} />
                        {productions[nonTerminal].map((prod, idx) => (
                          <React.Fragment key={idx}>
                            <span>{prod.join('')}</span>
                            {idx < productions[nonTerminal].length - 1 && (
                              <span style={{ marginInline: '0.5rem' }}>|</span>
                            )}
                          </React.Fragment>
                        ))}
                      </Box>
                    </Slide>
                  </ListItem>
                )) ?? null}
              </List>
            )}
          </Box>
        </Box>

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
      />
    </>
  );
}
