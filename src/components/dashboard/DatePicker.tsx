import { Transition } from "@headlessui/react";
import { useState, useRef, useEffect } from "react";
import { DateRangePicker, DefinedRange } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { activeFilterStore } from "@/lib/store";

const DateRange = () => {
  const [activeFilter, setActiveFilter] = activeFilterStore(state => [state.activeFilter, state.setActiveFilter]);

  const [selectedRange, setSelectedRange] = useState({
    selection: {
      startDate: new Date(),
      endDate: undefined,
      key: "selection",
    },
  });

  useEffect(() => {
    if (selectedRange.selection.endDate) {
      setActiveFilter({
        ...activeFilter,
        startDate: selectedRange.selection.startDate,
        endDate: selectedRange.selection.endDate,
      });
    }
  }, [selectedRange]);

  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const pickerRef2 = useRef<HTMLDivElement>(null);

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target) &&
        showPicker
      ) {
        setShowPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  return (
    <div className="relative">
      <button
        className="inline-flex justify-between gap-x-1.5 rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50"
        onClick={togglePicker}
      >
        <label className="cursor-pointer">Select Date Range</label>
      </button>

      <Transition
        show={showPicker}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        {(ref) => (
          <div
            ref={ref as any}
            className="absolute mt-3 -right-1 flex items-center justify-center z-50"
            onClick={(event) => {
              if (
                pickerRef.current &&
                !pickerRef.current.contains(event.target as Node)
              ) {
                togglePicker();
              }
            }}
          >
            <div
              ref={pickerRef}
              className="hidden lg:block bg-white rounded-xl p-2 border shadow-card-shadow"
            >
              <DateRangePicker
                onChange={(item) =>
                  setSelectedRange({ ...selectedRange, ...item })
                }
                months={1}
                minDate={addDays(new Date(), -300)}
                maxDate={addDays(new Date(), 900)}
                direction="vertical"
                scroll={{ enabled: true }}
                ranges={[selectedRange.selection]}
                showMonthAndYearPickers={false}
                rangeColors={["#0ea5e9", "#0ea5e9"]}
              />
            </div>
            <div
              ref={pickerRef2}
              className="lg:hidden bg-white rounded-xl p-2 border shadow-card-shadow"
            >
              <DefinedRange
                onChange={(item) =>
                  setSelectedRange({ ...selectedRange, ...item })
                }
                ranges={[selectedRange.selection]}
              />
            </div>
          </div>
        )}
      </Transition>
    </div>
  );
};

export default DateRange;
