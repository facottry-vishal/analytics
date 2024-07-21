/* eslint-disable react/prop-types */
"use client";
import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid, Divider } from "@mui/material";
import "tailwindcss/tailwind.css";

const Cards = () => {
  const dummyData = {
    countries: {
      USA: 120,
      India: 80,
      UK: 50,
      LK: 1000,
      USSDG: 210,
    },
    subscriptions: {
      Free: 200,
      Basic: 150,
      Premium: 100,
      USA: 120,
      India: 80,
      UK: 50,
      LK: 1000
    },
    os: {
      Windows: 300,
      MacOS: 150,
      Linux: 100,
      USA: 120,
      India: 80,
      UK: 50,
      LK: 1000,
    },
    osVersions: {
      "Windows 10": 180,
      "Windows 11": 120,
      "MacOS Catalina": 90,
      USA: 120,
      India: 80,
      UK: 50,
      LK: 1000,
    },
    modelNames: {
      "Model X": 70,
      "Model Y": 60,
      "Model Z": 50,
      USA: 120,
      India: 80,
      UK: 50,
      LK: 1000,
    },
    plans: {
      Monthly: 250,
      Yearly: 150,
      Lifetime: 50,
      USA: 120,
      India: 80,
      UK: 50,
      LK: 1000,
    },
    states: {
      California: 100,
      Texas: 80,
      "New York": 70,
      USA: 120,
      India: 80,
      UK: 50,
      LK: 1000,
    },
  };

  const renderCardContent = (items, heading) => (
    <Card
      className="max-w-sm mb-4 rounded-lg shadow-md"
      style={{ border: "1px solid #3b82f6" }}
    >
      <CardContent
        style={{
          maxHeight: "250px",
          overflowY: "auto",
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography
              variant="body1"
              component="div"
              className="text-blue-900 font-medium text-center"
            >
              {heading}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="body1"
              component="div"
              className="text-blue-900 font-medium text-center"
            >
              Count
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {Object.entries(items).map(([key, value], index) => (
            <React.Fragment key={index}>
              <Grid
                item
                xs={6}
                className="flex justify-center border-r border-gray-300"
              >
                <Typography
                  variant="body1"
                  component="div"
                  className="text-gray-600"
                >
                  {key}
                </Typography>
              </Grid>
              <Grid item xs={6} className="flex justify-center">
                <Typography
                  variant="body1"
                  component="div"
                  className="text-gray-600"
                >
                  {value}
                </Typography>
              </Grid>
              {index < Object.entries(items).length - 1 && (
                <Grid item xs={12}>
                  <Divider />
                </Grid>
              )}
            </React.Fragment>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {renderCardContent("Countries", dummyData.countries, "Country")}
      {renderCardContent(
        "Subscriptions",
        dummyData.subscriptions,
        "Subscription"
      )}
      {renderCardContent("Operating Systems", dummyData.os, "OS")}
      {renderCardContent("OS Versions", dummyData.osVersions, "OS Version")}
      {renderCardContent("Model Names", dummyData.modelNames, "Model Name")}
      {renderCardContent("Plans", dummyData.plans, "Plan")}
      {renderCardContent("States", dummyData.states, "State")}
    </div>
  );
};

export default Cards;
