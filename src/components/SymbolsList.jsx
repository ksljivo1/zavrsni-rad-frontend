import React from 'react';
import { List, ListItem } from '@mui/joy';
import { Chip, Slide } from '@mui/material';

export default function SymbolsList({ symbols, setSymbols }) {
  if (!symbols || symbols.length === 0) return null;

  function handleDelete(terminal) {
    setSymbols(symbols.filter((symbol) => symbol !== terminal));
  }

  return (
    <List orientation="horizontal">
      {symbols.map((symbol) => (
        <ListItem key={symbol}>
          <Slide timeout={500} direction="left" in mountOnEnter unmountOnExit>
            <Chip
              label={symbol}
              color="success"
              variant="outlined"
              onDelete={() => handleDelete(symbol)}
            />
          </Slide>
        </ListItem>
      ))}
    </List>
  );
}
