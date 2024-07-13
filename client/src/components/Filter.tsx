/* eslint-disable react/prop-types */
'use client'
import { activeFilterStore, userStore } from "@/lib/store";
import React from 'react';
import { IoPencilSharp } from "react-icons/io5";
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { toast } from "react-toastify";

type Props = {};

const Filter = ({ }: Props) => {
    const [activeFilter, setActiveFilter] = activeFilterStore(state => [state.activeFilter, state.setActiveFilter]);
    const activeProject = userStore(state => state.activeProject);
    const allFilters = activeProject?.filters || [];
    const animatedComponents = makeAnimated();
    const [selectedValue, setSelectedValue] = React.useState(activeFilter);
    const [isFilterEditable, setIsFilterEditable] = React.useState(true);
    const [isCollapsed, setIsCollapsed] = React.useState(false);

    const handleChange = (selectedOptions: any, { name }: any) => {
        const allSelected = selectedOptions.some((option: { value: string; }) => option.value === "ALL");

        if (allSelected) {
            selectedOptions = [{ value: "ALL", label: "ALL" }];
        } else {
            selectedOptions = selectedOptions.filter((option: { value: string; }) => option.value !== "ALL");
        }

        const selectedValues = selectedOptions.map((option: { value: string; }) => option.value).join(', ');

        setSelectedValue((prev: any) => ({
            ...prev,
            [name]: selectedValues || ''
        }));
    };

    return (
        <div className="w-fit text-sm min-w-[300px] sm:min-w-[500px] lg:min-w-[600px] border rounded-md mt-8">
            <div className="flex justify-between items-center px-5">
                <h1 className="text-lg font-bold text-center my-4">Select Filters</h1>
                <div className="flex items-center justify-center gap-4">
                    {isCollapsed === false &&
                        <button className="p-2 rounded-full text-white bg-primary600 hover:bg-primary700 transition-all" onClick={() =>
                            setIsFilterEditable(prev => !prev)
                        }>
                            <IoPencilSharp />
                        </button>
                    }
                    <button className="font-medium border my-4 p-2 px-3 rounded-md shadow-sm hover:bg-gray-100 transition-all"
                        onClick={() => setIsCollapsed(prev => !prev)}
                    >{
                            isCollapsed === false ? 'Collapse' : 'Expand'
                        }
                    </button>
                </div>
            </div>

            {!isCollapsed && <div>
                <div className="px-10 py-2 bg-white border-gray-100 w-full border-t text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {Object.keys(allFilters).map((key, index) => {
                            const options = allFilters[key].values.map((value: any) => ({
                                value: value,
                                label: value,
                            }));

                            options.push({ value: "ALL", label: "ALL" });

                            const defaultValue = activeFilter[key] ? activeFilter[key].split(',').map((value: string) => ({
                                value: value,
                                label: value,
                            })) : [];

                            return (
                                <div key={index} className="flex flex-col">
                                    <label className="mb-2 font-semibold">{key}:</label>
                                    <Select
                                        closeMenuOnSelect={true}
                                        components={animatedComponents}
                                        isMulti
                                        options={options}
                                        name={key}
                                        className="min-w-[200px] sm:min-w-[300px] lg:min-w-[400px]"
                                        onChange={handleChange}
                                        defaultValue={defaultValue}
                                        isDisabled={isFilterEditable}
                                        styles={{
                                            container: (provided) => ({
                                                ...provided,
                                                maxWidth: '400px'
                                            }),
                                            control: (provided) => ({
                                                ...provided,
                                                display: 'flex',
                                                flexWrap: 'nowrap', // Prevent wrapping
                                                overflow: 'hidden', // Hide overflow content
                                                maxHeight: '38px' // Fix the height to ensure no change
                                            }),
                                            valueContainer: (provided) => ({
                                                ...provided,
                                                maxHeight: '38px', // Fix the height to ensure no change
                                                overflowY: 'scroll', // Enable vertical scroll
                                                scrollbarWidth: 'none' /* Firefox */,
                                                '::-webkit-scrollbar': { /* Chrome, Safari, Opera */
                                                    display: 'none'
                                                }
                                            }),
                                            multiValue: (provided) => ({
                                                ...provided,
                                                maxWidth: '300px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }),
                                            multiValueLabel: (provided) => ({
                                                ...provided,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            })
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex justify-center gap-5">
                        <button
                            onClick={() => {
                                setActiveFilter(selectedValue);
                                toast.success("Filter Updated");
                            }}
                            disabled={isFilterEditable}
                            className="font-medium border my-4 p-2 px-3 rounded-md shadow-sm hover:bg-gray-100 transition-all cursor-pointer disabled:bg-gray-200 disabled:cursor-text disabled:text-gray-500 disabled:border-gray-200"
                        >
                            Apply Filter
                        </button>
                        <button
                            onClick={() => {
                                setActiveFilter(selectedValue);
                                toast.success("Filter Updated");
                            }}
                            disabled={isFilterEditable}
                            className="font-medium border my-4 p-2 px-3 rounded-md shadow-sm hover:bg-gray-100 transition-all cursor-pointer disabled:bg-gray-200 disabled:cursor-text disabled:text-gray-500 disabled:border-gray-200"
                        >
                            Update filters
                        </button>
                    </div>
                </div>
            </div>}
        </div>
    )
}

export default Filter;
