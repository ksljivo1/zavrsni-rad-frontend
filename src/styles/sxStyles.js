const codeFont = {
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
