import * as React from "react";
import ReactLoading from "react-loading";
import { useMutation } from "react-query";
import { ProjectAPI } from "api";

import {
  Button,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Fade,
  // Link,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";

import { useToggle } from "hooks/useToggle";
import ElasPad from "images/ElasPad.svg";

// const YouTubeVideoID = "k-a2SCq-LtA";

const PREFIX = "ReviewPageTraining";

const classes = {
  img: `${PREFIX}-img`,
  textTitle: `${PREFIX}-textTitle`,
  text: `${PREFIX}-text`,
};

const Root = styled("div")(({ theme }) => ({
  height: "inherit",
  [`& .${classes.img}`]: {
    maxWidth: 350,
    [theme.breakpoints.down("md")]: {
      maxWidth: 250,
    },
  },

  [`& .${classes.textTitle}`]: {
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
  },

  [`& .${classes.text}`]: {
    textAlign: "center",
    width: "60%",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
  },
}));

const FinishSetup = ({ project_id, refetch }) => {
  const theme = useTheme();

  const [openSkipTraining, toggleSkipTraining] = useToggle();

  // mutate and start new training
  const { mutate: startTraining, isLoading: isTraining } = useMutation(
    ProjectAPI.mutateTraining,
    {
      onSuccess: () => {
        refetch();
      },
    },
  );

  const skipTraining = (method) => {
    if (method === "random") {
      startTraining({ project_id: project_id, ranking: "random" });
    } else if (method === "top-down") {
      startTraining({ project_id: project_id, ranking: "top-down" });
    }
  };

  return (
    // <Root>
    //   <Stack spacing={3}>
    //     {/* {isTrainError && (
    //       <InlineErrorHandler
    //         message={trainError?.message}
    //         refetch={reset}
    //         button={true}
    //       />
    //     )} */}
    //     {/* {!isFetchingStatus && isStatusError && (
    //       <Stack className={classes.root} spacing={3}>
    //         <InlineErrorHandler message={statusError?.message} />
    //         <Button
    //         // onClick={}

    //         >Return to previous step</Button>
    //       </Stack>
    //     )} */}
    //     {/* {isError && (
    //       <InlineErrorHandler
    //         message={error?.message}
    //         // refetch={}
    //         button={true}
    //       />
    //     )} */}
    //   </Stack>
    //   <Stack spacing={3} className={classes.root}>
    //     {/* {!isTrainError && !isStatusError && (
    //       <YouTube
    //         videoId={YouTubeVideoID}
    //         opts={{
    //           height: "315",
    //           width: width < 560 ? width - 48 : "560",
    //           playerVars: {
    //             rel: 0,
    //           },
    //         }}
    //       />
    //     )} */}
    //     {/* {!isTrainError && !isStatusError && training && ( */}

    // </Root>
    <Root aria-label="review page training">
      <Fade in>
        <Stack
          spacing={1}
          sx={{
            alignItems: "center",
            height: "inherit",
            justifyContent: "center",
          }}
        >
          <img src={ElasPad} alt="ElasPad" className={classes.img} />
          <Typography className={classes.textTitle} variant="h5">
            Warming up the AI!
          </Typography>
          <ReactLoading
            type="bubbles"
            color={theme.palette.primary.main}
            height={60}
            width={60}
          />
          {/* <Typography className={classes.text}>
            ASReview LAB extracts information from the text in your dataset and
            ranks the records for you according to your model.{" "}
          </Typography> */}
          {/* Button to skip this and start reviewing */}
          <Button onClick={toggleSkipTraining} disabled={isTraining}>
            I can't wait
          </Button>
        </Stack>
      </Fade>
      {/* {isError && (
        <ActionsFeedbackBar
          feedback={error?.message + " Please try again."}
          open={isError}
          onClose={reset}
        />
      )} */}
      <Dialog
        open={openSkipTraining}
        onClose={toggleSkipTraining}
        aria-labelledby="skip-training-dialog"
      >
        <DialogTitle id="skip-training-dialog">
          Review already? Let's get started!
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to review already? Your model will be trained in the
            background. Once the model is finished training, you see better
            results. Choose one of the following options to start reviewing:
          </DialogContentText>
          <Button onClick={() => skipTraining("random")} disabled={isTraining}>
            Random
          </Button>
          <Button
            onClick={() => skipTraining("top-down")}
            disabled={isTraining}
          >
            Top down
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleSkipTraining}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Root>
  );
};

export default FinishSetup;
