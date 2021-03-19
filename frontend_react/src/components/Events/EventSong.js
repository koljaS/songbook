import React from "react";
import {createStyles, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {StarBorder} from "@material-ui/icons";
import {songData} from "../../data/data";
import {useHistory} from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
        },
        nested: {
            paddingLeft: theme.spacing(4),
        },
    }),
);

const songs = songData.Songs;

export default function EventSong(song) {
    const classes = useStyles();
    const history = useHistory();
    const songToDisplay = songs.find(function(songToCheck) {
        return songToCheck.id === song.id;
    })

    const changeViewToSongDetail = (id) => {
        history.push('/song/' + id)
    }

    return (
        <ListItem button className={classes.nested} onClick={() => changeViewToSongDetail(song.id)}>
            <ListItemIcon>
                <StarBorder/>
            </ListItemIcon>
            <ListItemText primary={songToDisplay.name}/>
        </ListItem>

    );
}