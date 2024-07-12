"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/navigation';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Grid,
} from "@mui/material";
import Reqres from "../../../components/Reqres";

const LogManager = () => {
  const router = useRouter();

  const [options, setOptions] = useState({
    countries: [],
    subscriptions: [],
    os: [],
    osVersions: [],
    modelNames: [],
    plans: [],
    states: [],
  });
  const [entries, setEntries] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    countries: [],
    subscriptions: [],
    os: [],
    osVersions: [],
    modelNames: [],
    plans: [],
    states: [],
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedEntry, setSelectedEntry] = useState(null);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5173/api/data-options"
        );
        setOptions(response.data);
      } catch (error) {
        console.error("Error fetching data options:", error);
      }
    };

    const fetchEntries = async () => {
      try {
        const response = await axios.get("http://localhost:5173/api/entries");
        setEntries(response.data);
      } catch (error) {
        console.error("Error fetching log entries:", error);
      }
    };

    fetchOptions();
    fetchEntries();
  }, []);

  const handleFilterChange = (event, filterType) => {
    setSelectedFilters({
      ...selectedFilters,
      [filterType]: event.target.value,
    });
  };

  const handleCheckLogs = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/entries", {
        params: {
          countries: selectedFilters.countries.join(","),
          subscriptions: selectedFilters.subscriptions.join(","),
          os: selectedFilters.os.join(","),
          osVersions: selectedFilters.osVersions.join(","),
          modelNames: selectedFilters.modelNames.join(","),
          plans: selectedFilters.plans.join(","),
          states: selectedFilters.states.join(","),
        },
      });
      setEntries(response.data);
      setPage(0);
    } catch (error) {
      console.error("Error fetching log entries:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEntryClick = (entry) => {
    setSelectedEntry(entry);
  };

  return (
    <Box
      sx={{ padding: "70px", backgroundColor: "#f4f6f8", minHeight: "100vh" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Log Manager
        </Typography>
        <Button
          variant="contained"
          onClick={handleCheckLogs}
          sx={{ margin: "8px", height: "56px" }}
        >
          Check Logs
        </Button>
      </Box>

      <Grid container spacing={2} sx={{ marginBottom: "24px" }}>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Countries</InputLabel>
            <Select
              multiple
              value={selectedFilters.countries}
              onChange={(event) => handleFilterChange(event, "countries")}
              renderValue={(selected) => selected.join(", ")}
              label="Countries"
            >
              {options.countries.map((option, idx) => (
                <MenuItem key={idx} value={option}>
                  <Checkbox
                    checked={selectedFilters.countries.indexOf(option) > -1}
                  />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Subscriptions</InputLabel>
            <Select
              multiple
              value={selectedFilters.subscriptions}
              onChange={(event) => handleFilterChange(event, "subscriptions")}
              renderValue={(selected) => selected.join(", ")}
              label="Subscriptions"
            >
              {options.subscriptions.map((option, idx) => (
                <MenuItem key={idx} value={option}>
                  <Checkbox
                    checked={selectedFilters.subscriptions.indexOf(option) > -1}
                  />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>OS</InputLabel>
            <Select
              multiple
              value={selectedFilters.os}
              onChange={(event) => handleFilterChange(event, "os")}
              renderValue={(selected) => selected.join(", ")}
              label="OS"
            >
              {options.os.map((option, idx) => (
                <MenuItem key={idx} value={option}>
                  <Checkbox checked={selectedFilters.os.indexOf(option) > -1} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>OS Versions</InputLabel>
            <Select
              multiple
              value={selectedFilters.osVersions}
              onChange={(event) => handleFilterChange(event, "osVersions")}
              renderValue={(selected) => selected.join(", ")}
              label="OS Versions"
            >
              {options.osVersions.map((option, idx) => (
                <MenuItem key={idx} value={option}>
                  <Checkbox
                    checked={selectedFilters.osVersions.indexOf(option) > -1}
                  />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        sx={{ marginBottom: "24px" }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Model Names</InputLabel>
            <Select
              multiple
              value={selectedFilters.modelNames}
              onChange={(event) => handleFilterChange(event, "modelNames")}
              renderValue={(selected) => selected.join(", ")}
              label="Model Names"
            >
              {options.modelNames.map((option, idx) => (
                <MenuItem key={idx} value={option}>
                  <Checkbox
                    checked={selectedFilters.modelNames.indexOf(option) > -1}
                  />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Plans</InputLabel>
            <Select
              multiple
              value={selectedFilters.plans}
              onChange={(event) => handleFilterChange(event, "plans")}
              renderValue={(selected) => selected.join(", ")}
              label="Plans"
            >
              {options.plans.map((option, idx) => (
                <MenuItem key={idx} value={option}>
                  <Checkbox
                    checked={selectedFilters.plans.indexOf(option) > -1}
                  />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>States</InputLabel>
            <Select
              multiple
              value={selectedFilters.states}
              onChange={(event) => handleFilterChange(event, "states")}
              renderValue={(selected) => selected.join(", ")}
              label="States"
            >
              {options.states.map((option, idx) => (
                <MenuItem key={idx} value={option}>
                  <Checkbox
                    checked={selectedFilters.states.indexOf(option) > -1}
                  />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "#fff" }}>SR Number</TableCell>
              <TableCell sx={{ color: "#fff" }}>Country</TableCell>
              <TableCell sx={{ color: "#fff" }}>Subscription</TableCell>
              <TableCell sx={{ color: "#fff" }}>OS</TableCell>
              <TableCell sx={{ color: "#fff" }}>OS Version</TableCell>
              <TableCell sx={{ color: "#fff" }}>Model Name</TableCell>
              <TableCell sx={{ color: "#fff" }}>Plan</TableCell>
              <TableCell sx={{ color: "#fff" }}>State</TableCell>
              <TableCell sx={{ color: "#fff" }}>View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((entry, index) => (
                <TableRow
                  key={index}
                  onClick={() => handleEntryClick(entry)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f1f1f1" },
                  }}
                >
                  <TableCell>{entry.srNumber}</TableCell>
                  <TableCell>{entry.country}</TableCell>
                  <TableCell>{entry.subscription}</TableCell>
                  <TableCell>{entry.os}</TableCell>
                  <TableCell>{entry.osVersion}</TableCell>
                  <TableCell>{entry.modelName}</TableCell>
                  <TableCell>{entry.plan}</TableCell>
                  <TableCell>{entry.state}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEntryClick(entry);
                      }}
                      sx={{
                        borderColor: "#1976d2",
                        color: "#1976d2",
                        "&:hover": {
                          backgroundColor: "#1976d2",
                          color: "#fff",
                        },
                      }}
                    >
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={entries.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{ mt: 2 }}
      />
      {selectedEntry && (
        <Reqres
          selectedEntry={selectedEntry}
          // Pass any necessary props to Reqres component here
        />
      )}
    </Box>
  );
};

export default LogManager;
