import { useContext, useEffect, useState } from "react";
import { AppContext, WebsocketContext } from "../../context";
import { C_API } from "@dogma-project/constants-meta";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import QuestionMarkRoundedIcon from "@mui/icons-material/QuestionMarkRounded";
import DoDisturbOffRoundedIcon from "@mui/icons-material/DoDisturbOffRounded";
import DoNotDisturbOnTotalSilenceRoundedIcon from "@mui/icons-material/DoNotDisturbOnTotalSilenceRounded";
import StarsRoundedIcon from "@mui/icons-material/StarsRounded";
import ComputerRoundedIcon from "@mui/icons-material/ComputerRounded";
import RadioButtonCheckedRoundedIcon from "@mui/icons-material/RadioButtonCheckedRounded";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

function Network() {
  const {
    state: { network },
  } = useContext(AppContext);
  const { isReady, send } = useContext(WebsocketContext);

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  useEffect(() => {
    if (isReady) {
      send({
        type: C_API.ApiRequestType.network,
        action: C_API.ApiRequestAction.get,
      });
    }
  }, [isReady]);

  return (
    <>
      <Paper
        elevation={3}
        sx={{ px: 1, py: 2, display: "flex", justifyContent: "center" }}
      >
        <Button variant="contained" startIcon={<PersonAddAltRoundedIcon />}>
          New friend
        </Button>
      </Paper>

      <Divider variant="middle" sx={{ my: 2 }} />

      <Paper elevation={3} sx={{ p: 1 }}>
        {network.map((user, i) => {
          return (
            <Accordion
              expanded={expanded === `user-${i}`}
              onChange={handleChange(`user-${i}`)}
              key={`userbox-${i}`}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Stack direction="row" alignItems="center" gap={1}>
                  {user.current ? (
                    <StarsRoundedIcon color="success" />
                  ) : user.requested ? (
                    <QuestionMarkRoundedIcon color="warning" />
                  ) : (
                    <AccountCircleRoundedIcon color="info" />
                  )}
                  <Typography sx={{ flexGrow: 1 }}>{user.name}</Typography>
                </Stack>
              </AccordionSummary>
              {user.requested ? (
                <AccordionDetails key={`nodebox-${i}`}>
                  <Typography>{user.id}</Typography>
                  <Stack direction="row" spacing={1}>
                    <Button startIcon={<PersonAddAltRoundedIcon />}>Add</Button>
                    <Button startIcon={<DoDisturbOffRoundedIcon />}>
                      Decline
                    </Button>
                    <Button
                      color="error"
                      startIcon={<DoNotDisturbOnTotalSilenceRoundedIcon />}
                    >
                      Ban
                    </Button>
                  </Stack>
                </AccordionDetails>
              ) : (
                user.nodes.map((node, j) => {
                  return (
                    <AccordionDetails key={`nodebox-${i}-${j}`}>
                      <Stack
                        direction="row"
                        alignItems="center"
                        gap={1}
                        sx={{ mx: 2, display: "flex" }}
                      >
                        {node.current ? (
                          <StarsRoundedIcon color="success" />
                        ) : (
                          <ComputerRoundedIcon color="info" />
                        )}
                        <Typography sx={{ flexGrow: 1 }}>
                          {node.name}
                        </Typography>
                        {node.online && (
                          <RadioButtonCheckedRoundedIcon color="success" />
                        )}
                      </Stack>
                    </AccordionDetails>
                  );
                })
              )}
            </Accordion>
          );
        })}
      </Paper>
    </>
  );
}

export default Network;
