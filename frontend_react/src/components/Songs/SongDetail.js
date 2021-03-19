import React, {useEffect, useState} from "react";
import { makeStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import {useParams} from "react-router";
import {songData} from "../../data/data";
import {Card} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles({
    root: {
        width: '100%',
        maxWidth: 500,
    },
});

export default function SongDetail() {
    const { id } = useParams();
    const songs = songData.Songs;
    const filteredSongs = songs.filter(function(songToFilter){
        return songToFilter.id === parseInt(id);
    })
    const song = filteredSongs[0]
    const classes = useStyles();

    const [finishStatus, setfinishStatus] = useState(false);


    useEffect(() => {
        const onBackButtonEvent = (e) => {
            console.log('kdfjlsdjfds')
            e.preventDefault();
            if (!finishStatus) {
                if (window.confirm("Do you want to go back ?")) {
                    setfinishStatus(true)
                    // your logic
                    // props.history.push("/");
                } else {
                    window.history.pushState(null, null, window.location.pathname);
                    setfinishStatus(false)
                }
            }
        }

        window.history.pushState(null, null, window.location.pathname);
        window.addEventListener('popstate', onBackButtonEvent);
        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);
        };
    });

    return (
        <div className={classes.root}>
            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h4" component="h2" gutterBottom>
                        <b>{song.name}</b>, von {song.author}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                        Orig: <b>{song.origtitle}</b>, {song.originterpret}
                    </Typography>
                    <Typography variant="h6" gutterBottom>
                        Songtext:
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {song.text}
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
