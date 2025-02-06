import React, { useState } from "react";
import Select, { SingleValue } from "react-select";
import countries from "world-countries";

interface CountryOption {
    label: JSX.Element;
    value: string;
}

// Format country data for react-select
const countryOptions: CountryOption[] = countries.map((country) => ({
  label: (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={`https://flagcdn.com/w40/${country.cca2.toLowerCase()}.png`}
        alt={country.name.common}
        style={{ width: 25, marginRight: 10 }}
      />
      {country.name.common}
    </div>
  ),
  value: country.cca2, // Country code (e.g., "US", "PH")
}));


const CountrySelector: React.FC = () => {
    const [selectedCountry, setSelectedCountry] = useState<CountryOption | null>(null);

    const handleChange = (newValue: SingleValue<CountryOption>) => {
        setSelectedCountry(newValue);
    };

    return (
        <div className="w-full outline-none text-xs mt-1">
        <Select
            className=""
            options={countryOptions}
            value={selectedCountry}
            onChange={handleChange}
            placeholder="Philippines"
        />
        </div>
    );
};

export default CountrySelector;
