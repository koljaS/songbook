import React from "react";
import Typography from "@material-ui/core/Typography";
import Event from "./Event";
import {eventsData} from "../../data/data";
import {createStyles, List} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
            alignItems: 'center',
            justifyContent: 'center',
            margin: '10px'
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },

        title: {
            textAlign: "center"
        }
    }),
);

export default function Events() {
    const classes = useStyles();
    const events = eventsData.Events;

    return (
        <>
        <Typography variant={"h3"} className={classes.title}>
            Events
        </Typography>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                className={classes.root}
            >
            {events.map(function(event) {
                return (
                    <Event key={event.id} event={event} />
                );
            })}
            </List>
        </>
    );
}
