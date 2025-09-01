import { selectClasses } from '@mui/joy/Select';

export const codeFont = {
  fontFamily: '"Fira Code", "Source Code Pro", "JetBrains Mono", monospace',
};

export const inputRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '10px',
};

export const terminalInput = {
  borderRadius: '5px',
  width: '100%',
  backgroundColor: '#f5f5f5',
  fontSize: '0.9rem',
  outline: 'none',
  '& .MuiOutlinedInput-input': { padding: '6px 12px' },
  '&:focus': { border: '2px solid #0153aa', backgroundColor: '#fff' },
  ...codeFont,
};

export const addButton = {
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

export const startSymbolInput = {
  ...terminalInput,
  [`& .${selectClasses.indicator}`]: {
    transition: '0.2s',
    [`&.${selectClasses.expanded}`]: {
      transform: 'rotate(-180deg)',
    },
  },
};

export const nonTerminalInput = {
  ...startSymbolInput,
  width: 'fit-content',
};

export const productionLayout = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
};

export const rightSideProductionLayout = {
  display: 'flex',
  alignItems: 'center',
  gap: '5px',
};

export const nonTerminalSection = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
};

export const addDeleteButtonStyles = {
  padding: 0,
  transition: 'scale 0.3s',
  '&:hover': { scale: 1.2 },
};

export const cardBox = {
  borderRadius: '7px',
  border: '1px solid #DDD',
  padding: '30px 25px',
  background: '#fff',
};

export const columnFlex = {
  display: 'flex',
  flexDirection: 'column',
  gap: '15px',
};

export const headerRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const loadButton = {
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

export const gridLayout = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '30px',
  margin: '30px 120px',
  '@media (max-width: 1000px)': {
    gridTemplateColumns: '1fr',
  },
};

export const productionsStyles = {
  display: 'flex',
  justifyContent: 'space-between',
};
