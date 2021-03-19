import React from "react";
import {ListItem, ListItemAvatar, ListItemText} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import {useHistory} from "react-router-dom";

export default function Song({Song}) {
    const history = useHistory();

    const OpenSongDetail = (song) => {
        history.push('/song/'+ song.id);
    }

    return (
    <>
        <ListItem  onClick={() => OpenSongDetail(Song)}>
            <ListItemAvatar>
                <Avatar>
                    <ImageIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={Song.name ? Song.name : ""}
                secondary={Song.author && Song.year ? Song.author + " | " + Song.year
                    : Song.author && Song.year === undefined ? Song.author
                        : Song.author === undefined && Song.year ? Song.year
                            : ""}  />
        </ListItem>
            </>
    )
}
