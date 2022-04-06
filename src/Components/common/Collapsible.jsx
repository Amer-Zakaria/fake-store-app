import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Collabsible = (props) => {
  const { id, header, defaultExpanded } = props;

  return (
    <Accordion
      sx={{ marginBottom: 0, marginTop: 0 }}
      defaultExpanded={defaultExpanded}
    >
      <AccordionSummary
        aria-controls={`panel${id}a-content`}
        id={`panel${id}a-header`}
        expandIcon={<ExpandMoreIcon />}
      >
        {header}
      </AccordionSummary>
      <AccordionDetails>{props.children}</AccordionDetails>
    </Accordion>
  );
};

export default Collabsible;
