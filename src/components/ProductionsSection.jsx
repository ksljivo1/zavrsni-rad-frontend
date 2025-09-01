import { Box, Button, Slide, Zoom } from '@mui/material';
import Select from '@mui/joy/Select';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import Option from '@mui/joy/Option';
import EastIcon from '@mui/icons-material/East';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { List, ListItem } from '@mui/joy';
import React from 'react';
import {
  inputRow,
  nonTerminalInput,
  codeFont,
  addButton,
  productionLayout,
  rightSideProductionLayout,
  nonTerminalSection,
  addDeleteButtonStyles,
  productionsStyles,
} from '../styles/sxStyles.js';

export default function ProductionsSection(props) {
  const {
    leftSideProductionRule,
    setLeftSideProductionRule,
    rightSideProductionRule,
    setRightSideProductionRule,
    productions,
    setProductions,
    terminals,
    nonTerminals,
    startSymbol,
  } = props;

  const EPS = 'ɛ';

  function handleRightSideProductionRuleChange(e, newValue, index) {
    setRightSideProductionRule([
      ...rightSideProductionRule.slice(0, index),
      newValue,
      ...rightSideProductionRule.slice(index + 1),
    ]);
  }

  function handleDeleteRightSideProductionRule() {
    setRightSideProductionRule(
      rightSideProductionRule.slice(0, rightSideProductionRule.length - 1)
    );
  }

  function handleAddRightSideProductionRule() {
    setProductions({
      ...productions,
      [leftSideProductionRule]: [
        ...(productions[[leftSideProductionRule]] ?? []),
        rightSideProductionRule.filter((symbol) => symbol !== EPS).length > 0
          ? rightSideProductionRule.filter((symbol) => symbol !== EPS)
          : [EPS],
      ],
    });
    setLeftSideProductionRule('');
    setRightSideProductionRule([EPS]);
  }

  function addNewProductionRule(nonTerminal) {
    if (productions[nonTerminal].length === 1) {
      const { [nonTerminal]: _, ...rest } = productions;
      setProductions(rest);
    } else {
      setProductions({
        ...productions,
        [nonTerminal]: productions[nonTerminal].slice(
          0,
          productions[nonTerminal].length - 1
        ),
      });
    }
  }

  return (
    <>
      <h3 className="text">Production Rules</h3>
      <Box sx={inputRow}>
        <Box sx={nonTerminalSection}>
          <Select
            placeholder="Select a non-terminal"
            value={leftSideProductionRule}
            onChange={(e, newValue) => {
              setLeftSideProductionRule(newValue);
            }}
            disabled={nonTerminals.length === 0}
            indicator={<KeyboardArrowDown />}
            sx={nonTerminalInput}
          >
            {nonTerminals.length > 0
              ? nonTerminals.map((nonTerminal) => (
                  <Option key={nonTerminal} value={nonTerminal} sx={codeFont}>
                    {nonTerminal}
                  </Option>
                ))
              : null}
          </Select>
          <EastIcon />
          <Box sx={rightSideProductionLayout}>
            {rightSideProductionRule.map((rightSideProductionRule1, index) => (
              <Zoom key={index} timeout={800} in mountOnEnter unmountOnExit>
                <Select
                  value={
                    rightSideProductionRule1 === ''
                      ? EPS
                      : rightSideProductionRule1
                  }
                  onChange={(e, newValue) =>
                    handleRightSideProductionRuleChange(e, newValue, index)
                  }
                  indicator={<KeyboardArrowDown />}
                  sx={nonTerminalInput}
                >
                  {[...terminals, ...nonTerminals, EPS].map((symbol) => (
                    <Option key={symbol} value={symbol} sx={codeFont}>
                      {symbol}
                    </Option>
                  )) ?? null}
                </Select>
              </Zoom>
            )) ?? null}
            <IconButton
              sx={addDeleteButtonStyles}
              onClick={() =>
                setRightSideProductionRule([...rightSideProductionRule, EPS])
              }
            >
              <AddCircleOutlineIcon color="success" />
            </IconButton>
            {rightSideProductionRule.length > 1 && (
              <IconButton
                sx={addDeleteButtonStyles}
                onClick={() => handleDeleteRightSideProductionRule()}
              >
                <DeleteIcon color="error" />
              </IconButton>
            )}
          </Box>
        </Box>
        {leftSideProductionRule && (
          <Button
            sx={addButton}
            onClick={() => handleAddRightSideProductionRule()}
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
                <Box sx={productionsStyles}>
                  <Box sx={productionLayout}>
                    <span
                      style={{
                        color: nonTerminal === startSymbol ? 'green' : 'black',
                      }}
                    >
                      {nonTerminal}
                    </span>
                    <EastIcon sx={{ scale: 0.8 }} />
                    {productions[nonTerminal].map((prod, idx) => (
                      <React.Fragment key={idx}>
                        <span
                          style={{
                            color: 'black',
                          }}
                        >
                          {prod.join('')}
                        </span>
                        {idx < productions[nonTerminal].length - 1 && (
                          <span
                            style={{ marginInline: '0.5rem', color: 'black' }}
                          >
                            |
                          </span>
                        )}
                      </React.Fragment>
                    ))}
                  </Box>
                  {productions[nonTerminal].length > 0 && (
                    <IconButton
                      sx={addDeleteButtonStyles}
                      onClick={() => addNewProductionRule(nonTerminal)}
                    >
                      <DeleteIcon color="error" />
                    </IconButton>
                  )}
                </Box>
              </Slide>
            </ListItem>
          )) ?? null}
        </List>
      )}
    </>
  );
}
