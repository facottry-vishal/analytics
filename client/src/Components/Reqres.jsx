'use client'
import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from '@mui/material';

const Reqres = ({ selectedEntry }) => {
  const theme = useTheme();
  const [url, setUrl] = useState('');
  const [bodyKeyValues, setBodyKeyValues] = useState([]);
  const [headerKeyValues, setHeaderKeyValues] = useState([]);
  const [response, setResponse] = useState(null);

  useEffect(() => {
    if (selectedEntry) {
      setUrl(`/api/${selectedEntry.endpoint}`);
      setBodyKeyValues(Object.entries(selectedEntry.body || {}).map(([key, value]) => ({ key, value })));
      setHeaderKeyValues(Object.entries(selectedEntry.headers || {}).map(([key, value]) => ({ key, value })));
      fetchResponse(selectedEntry);
    }
  }, [selectedEntry]);

  const fetchResponse = async (entry) => {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...entry.headers,
        },
        body: JSON.stringify(entry.body),
      });
      const data = await response.json();
      setResponse(data);
    } catch (error) {
      console.error('Error fetching response:', error);
    }
  };

  const renderKeyValueTable = (keyValues) => (
    <TableContainer>
      <Table>
        <TableHead sx={{ backgroundColor: theme.palette.primary.main }}>
          <TableRow>
            <TableCell sx={{ color: theme.palette.common.white }}>Key</TableCell>
            <TableCell sx={{ color: theme.palette.common.white }}>Value</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {keyValues.map(({ key, value }, i) => (
            <TableRow key={i}>
              <TableCell>{key}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  return (
    <Box sx={{ padding: '24px', backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Request/Response Viewer
      </Typography>
      {selectedEntry && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <Card>
            <CardHeader title="URL" />
            <CardContent>
              <Typography variant="body1" sx={{ wordWrap: 'break-word' }}>
                {url}
              </Typography>
            </CardContent>
          </Card>
          <Card>
            <CardHeader title="Headers" />
            <CardContent>{renderKeyValueTable(headerKeyValues)}</CardContent>
          </Card>
          <Card>
            <CardHeader title="Body" />
            <CardContent>{renderKeyValueTable(bodyKeyValues)}</CardContent>
          </Card>
          <Card>
            <CardHeader title="Response" />
            <CardContent>
              {response ? renderKeyValueTable(Object.entries(response).map(([key, value]) => ({ key, value: JSON.stringify(value) }))) : (
                <Typography variant="body1">No response</Typography>
              )}
            </CardContent>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default Reqres;
