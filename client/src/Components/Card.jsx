/* eslint-disable react/prop-types */
'use client'
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Grid, Divider } from '@mui/material';
import "tailwindcss/tailwind.css";

const Cards = ({ result, showCountryData, showSubscriptionData, showOSData, showOSVersionData, showModelNameData, showPlanData, showStateData }) => {
  const renderCardContent = (title, items, heading) => (
    <Card className="max-w-sm mb-4 rounded-lg shadow-md" style={{ border: '1px solid #3b82f6' }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="body1" component="div" className="text-blue-900 font-medium text-center">
              {heading}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body1" component="div" className="text-blue-900 font-medium text-center">
              Count
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          {Object.entries(items).map(([key, value], index) => (
            <React.Fragment key={index}>
              <Grid item xs={6} className="flex justify-center border-r border-gray-300">
                <Typography variant="body1" component="div" className="text-gray-600">
                  {key}
                </Typography>
              </Grid>
              <Grid item xs={6} className="flex justify-center">
                <Typography variant="body1" component="div" className="text-gray-600">
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
      {showCountryData && result.countries && Object.keys(result.countries).length > 0 && renderCardContent('Countries', result.countries, 'Country')}
      {showSubscriptionData && result.subscriptions && Object.keys(result.subscriptions).length > 0 && renderCardContent('Subscriptions', result.subscriptions, 'Subscription')}
      {showOSData && result.os && Object.keys(result.os).length > 0 && renderCardContent('Operating Systems', result.os, 'OS')}
      {showOSVersionData && result.osVersions && Object.keys(result.osVersions).length > 0 && renderCardContent('OS Versions', result.osVersions, 'OS Version')}
      {showModelNameData && result.modelNames && Object.keys(result.modelNames).length > 0 && renderCardContent('Model Names', result.modelNames, 'Model Name')}
      {showPlanData && result.plans && Object.keys(result.plans).length > 0 && renderCardContent('Plans', result.plans, 'Plan')}
      {showStateData && result.states && Object.keys(result.states).length > 0 && renderCardContent('States', result.states, 'State')}
    </div>
  );
};

export default Cards;
