import React from "react";
import {Collapse, List, ListItem, ListItemIcon, ListItemText} from "@material-ui/core";
import {ExpandLess, ExpandMore} from "@material-ui/icons";
import InboxIcon from '@material-ui/icons/MoveToInbox';
import EventSong from "./EventSong";

export default function Event(event) {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
 <>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>
                    <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={event.event.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
             <Collapse in={open} timeout="auto" unmountOnExit>
                     <List component="div" disablePadding>
                         {event.event.songs.map(function(song) {
                             return (
                                 <EventSong key={song.id} id={song.id} />
                             )
                         })}
                     </List>
                   </Collapse>
 </>
    );
}