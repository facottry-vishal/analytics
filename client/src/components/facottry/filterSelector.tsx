
'use client'
import React, { act } from 'react'
import MultipleSelector from "../ui/select-multi"
import { activeFilterStore, userStore } from "@/lib/store";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { DateRangePicker } from "./dateRangePicker";
import { Button } from "../ui/button";
import { toast } from "react-toastify";

type Props = {}

type option = {
    value: string,
    label: string
}

type selectedValue = {
    [key: string]: string
}

const FilterSelector = (props: Props) => {
    const [activeFilter, setActiveFilter] = activeFilterStore(state => [state.activeFilter, state.setActiveFilter]);
    const activeProject = userStore(state => state.activeProject);
    const allFilters = activeProject?.filters || [];
    const [selectedValue, setSelectedValue] = React.useState<selectedValue>({});

    const handleSubmit = () => {
        setActiveFilter(selectedValue);
        toast.success("Filter Applied");
    }

    const filterCount = Object.keys(allFilters).length;
    const gridColsClass = filterCount === 1
        ? 'grid-cols-1'
        : filterCount <= 2
            ? 'grid-cols-1 sm:grid-cols-2'
            : filterCount === 3
                ? 'grid-cols-1 sm:grid-cols-2 xl:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

    return (
        <Card className="w-full">
            <CardHeader>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                    <CardTitle className="text-center md:text-left">Select Filter</CardTitle>
                    <div className="flex gap-2">
                        <DateRangePicker data={selectedValue} setData={setSelectedValue} />
                        <Button variant={"outline"} onClick={handleSubmit}>Apply</Button>
                    </div>
                </div>
            </CardHeader>

            {filterCount > 0 ? (<div className={`border-t pt-5 grid ${gridColsClass} z-0`}>
                {Object.keys(allFilters).map((key, index) => {
                    const options: option[] = allFilters[key].values.map((value: any) => ({
                        value: value,
                        label: value,
                    }));

                    options.push({
                        value: 'ALL',
                        label: 'ALL'
                    });

                    const placeHolder = activeFilter[key] ? activeFilter[key].replace(/,/g, ', ') : "Select...";

                    return (
                        <CardContent key={index}>
                            <div className="w-full flex flex-col gap-3">
                                <Label htmlFor="category">{key}</Label>
                                <MultipleSelector
                                    options={options}
                                    className="bg-background"
                                    placeholder={placeHolder}
                                    hidePlaceholderWhenSelected={true}
                                    emptyIndicator="No options available"
                                    loadingIndicator="Loading..."
                                    badgeClassName="bg-muted text-primary"
                                    onChange={(selectedOptions) => {
                                        let newSelectedValues = selectedOptions.map((option: any) => option.value);

                                        if (newSelectedValues.includes("ALL")) {
                                            newSelectedValues = options.filter(option => option.value !== "ALL").map(option => option.value);
                                        }

                                        setSelectedValue({
                                            ...selectedValue,
                                            [key]: newSelectedValues.join(',')
                                        });
                                    }}
                                />
                            </div>
                        </CardContent>
                    );
                })}
            </div>
            ) : (
            <div>
                <CardContent>
                    <div className="border-t pt-5">
                        <p className="text-center text-md font-medium text-muted-foreground">Select a project to get started...</p>
                    </div>
                </CardContent>
            </div>
            )}
        </Card>
    )
}

export default FilterSelector