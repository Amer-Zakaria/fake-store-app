import React, { useState, useEffect } from "react";

import { FormControlLabel, Checkbox, Box } from "@mui/material";

const CheckboxGroupWithAll = ({
  checkboxGroupName,
  checkboxGroup,
  updateCheckboxGroup,
}) => {
  const [checkboxAll, setCheckboxAll] = useState(true);

  const handleAllBecomeTrue = () => {
    updateCheckboxGroup(checkboxGroupName, checkboxGroup, true);
    setCheckboxAll(true);
  };

  //dealing with the checkbox "All"
  useEffect(() => {
    const atLeastOneCheckboxChecked = checkboxGroup.some(
      (checkbox) => checkbox.checked
    );
    const allCheckboxesChecked = checkboxGroup.every(
      (checkbox) => checkbox.checked
    );
    if (!atLeastOneCheckboxChecked) setCheckboxAll(true);
    else if (atLeastOneCheckboxChecked && !allCheckboxesChecked)
      setCheckboxAll(false);
    else if (allCheckboxesChecked) {
      updateCheckboxGroup(checkboxGroupName, checkboxGroup, true);
      setCheckboxAll(true);
    }
  }, [checkboxGroup]);

  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={checkboxAll}
              onChange={!checkboxAll ? handleAllBecomeTrue : () => {}}
            />
          }
          label="All"
        />
        {checkboxGroup.map((checkbox) => (
          <FormControlLabel
            key={checkbox.displayName}
            label={checkbox.CheckboxLabelIcon || checkbox.displayName}
            control={
              <Checkbox
                checked={checkbox.checked}
                onChange={() =>
                  updateCheckboxGroup(checkboxGroupName, checkbox.displayName)
                }
              />
            }
          />
        ))}
      </Box>
    </>
  );
};

export default CheckboxGroupWithAll;
