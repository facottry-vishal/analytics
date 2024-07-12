"use client";
import { useState } from "react";
import "tailwindcss/tailwind.css";
import Cards from "@/components/Card";
import ShowFields from "@/components/ShowFields";
import {
  Button,
  Typography,
} from "@mui/material";
import Filter from "@/Components/Filter";

const Home = () => {
  const [result, setResult] = useState(null);

  const [showFields, setShowFields] = useState([
    { value: "showCountryData", label: "Country Data", checked: false },
    {
      value: "showSubscriptionData",
      label: "Subscription Data",
      checked: false,
    },
    { value: "showOSData", label: "OS Data", checked: false },
    { value: "showOSVersionData", label: "OS Version Data", checked: false },
    { value: "showModelNameData", label: "Model Name Data", checked: false },
    { value: "showPlanData", label: "Plan Data", checked: false },
    { value: "showStateData", label: "State Data", checked: false },
  ]);

  const handleFieldChange = (fieldValue) => {
    setShowFields((prevFields) =>
      prevFields.map((field) =>
        field.value === fieldValue
          ? { ...field, checked: !field.checked }
          : field
      )
    );
  };

  const handleFilter = async () => {
    const query = new URLSearchParams();

    const filters = {
      countries: selectedCountries,
      subscriptions: selectedSubscriptions,
      os: selectedOS,
      osVersions: selectedOSVersions,
      modelNames: selectedModelNames,
      plans: selectedPlans,
      states: selectedStates,
    };

    showFields.forEach((field) => {
      if (!field.checked)
        delete filters[field.value.replace("show", "").toLowerCase()];
    });

    Object.keys(filters).forEach((key) => {
      const filterString = filters[key].join(",");
      if (filterString) query.append(key, filterString);
    });

    const response = await fetch(
      `http://localhost:5173/api/data?${query.toString()}`
    );
    const result = await response.json();
    setResult({
      data: result,
      filters: {
        showCountryData: showFields.find(
          (field) => field.value === "showCountryData"
        ).checked,
        showSubscriptionData: showFields.find(
          (field) => field.value === "showSubscriptionData"
        ).checked,
        showOSData: showFields.find((field) => field.value === "showOSData")
          .checked,
        showOSVersionData: showFields.find(
          (field) => field.value === "showOSVersionData"
        ).checked,
        showModelNameData: showFields.find(
          (field) => field.value === "showModelNameData"
        ).checked,
        showPlanData: showFields.find((field) => field.value === "showPlanData")
          .checked,
        showStateData: showFields.find(
          (field) => field.value === "showStateData"
        ).checked,
      },
    });
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between my-10">
        <Typography variant="h4" className="font-bold mb-4">
          Filter Data
        </Typography>
        <Button onClick={handleFilter} variant="contained" color="primary">
          Submit
        </Button>
      </div>
      <div className="flex flex-col gap-10 mt-10">
        <div className="flex w-full justify-center">
          <Filter />
        </div>
      </div>
      <div className="flex flex-col items-center gap-10 mt-10">
        <div className="flex gap-10 justify-center">
          <ShowFields
            fields={showFields}
            handleFieldChange={handleFieldChange}
          />
        </div>
      </div>
      <div className="py-12">
        {selectedCountries.length === 0 &&
          selectedSubscriptions.length === 0 &&
          selectedOS.length === 0 &&
          selectedOSVersions.length === 0 &&
          selectedModelNames.length === 0 &&
          selectedPlans.length === 0 &&
          selectedStates.length === 0 &&
          !result && (
            <div className="text-center text-gray-500">
              <h2 className="text-xl font-semibold">Welcome to Analytics</h2>
              <p>Please choose the data you would like to view.</p>
            </div>
          )}
        {result && (
          <Cards
            result={result.data}
            showCountryData={result.filters.showCountryData}
            showSubscriptionData={result.filters.showSubscriptionData}
            showOSData={result.filters.showOSData}
            showOSVersionData={result.filters.showOSVersionData}
            showModelNameData={result.filters.showModelNameData}
            showPlanData={result.filters.showPlanData}
            showStateData={result.filters.showStateData}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
