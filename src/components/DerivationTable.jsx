import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from '@mui/material';
import { codeFont } from '../styles/sxStyles.js';

const rightArrow = '\u21D2';

export default function DerivationTable({ parseTree }) {
  return (
    parseTree?.length > 0 && (
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          overflow: 'hidden',
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>
                <Typography fontWeight="bold">Step</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Derivation</Typography>
              </TableCell>
              <TableCell>
                <Typography fontWeight="bold">Applied Rule</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {parseTree.map((step, i) => (
              <TableRow
                key={i}
                sx={{
                  '&:nth-of-type(odd)': { backgroundColor: '#ededed' },
                }}
              >
                <TableCell sx={{ ...codeFont, fontSize: '1rem' }}>
                  {i + 1}
                </TableCell>
                <TableCell sx={{ ...codeFont, fontSize: '1rem' }}>
                  {step.leftDerivation}{' '}
                  <span style={{ fontSize: '1rem' }}>{rightArrow}</span>{' '}
                  {step.rightDerivation}
                </TableCell>
                <TableCell sx={{ ...codeFont, fontSize: '1rem' }}>
                  {step.leftRule} <span style={{ fontSize: '1rem' }}>→</span>{' '}
                  {step.rightRule}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  );
}
