import React from "react";
import Typography from "@mui/material/Typography";
import Consonants from "../components/ipa/Consonants";
import SyllabicConsonants from "../components/ipa/SyllabicConsonants";
import StrongVowels from "../components/ipa/StrongVowels";
import WeakVowels from "../components/ipa/WeakVowels";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";

const EnglishPortugueseIpa = () => {
  const [expanded, setExpanded] = React.useState("");

  const handleChangeExpanded = (newExpanded: any) => {
    setExpanded(newExpanded !== expanded ? newExpanded : false);
  };

  return (
    <div className="p-3">
      <Accordion
        square
        expanded={expanded === "consonants"}
        onChange={() => handleChangeExpanded("consonants")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Consoantes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Consonants />]{" "}
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === "strongVowels"}
        onChange={() => handleChangeExpanded("strongVowels")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Vogais Fortes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <StrongVowels />
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === "weakVowels"}
        onChange={() => handleChangeExpanded("weakVowels")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Vogais Fracas</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <WeakVowels />
        </AccordionDetails>
      </Accordion>
      <Accordion
        square
        expanded={expanded === "syllabicConsonants"}
        onChange={() => handleChangeExpanded("syllabicConsonants")}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Consoante silábica</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <SyllabicConsonants />
        </AccordionDetails>
      </Accordion>
      <br />
      <br />
      <Typography gutterBottom variant="h5" component="h2"></Typography>
      <b>Fontes:</b>{" "}
      <a href="https://en.wikipedia.org/wiki/Help:IPA/English" target="_blank">
        Inglês
      </a>
      ,{" "}
      <a
        href="https://en.wikipedia.org/wiki/Help:IPA/Portuguese"
        target="_blank"
      >
        Português
      </a>
      <a
        href="https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:AFI_para_ingl%C3%AAs"
        target="_blank"
      >
        Português
      </a>
      <a
        href="https://pt.wikipedia.org/wiki/Wikip%C3%A9dia:Alfabeto_fon%C3%A9tico_internacional"
        target="_blank"
      >
        Explicação
      </a>
      <a href="https://www.youtube.com/watch?v=9E6F57s-V7U">You Tube Vogais</a>
    </div>
  );
};

export default EnglishPortugueseIpa;
