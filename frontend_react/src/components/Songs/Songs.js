import React, {useEffect} from "react";
import {createStyles, Theme, makeStyles, fade} from "@material-ui/core/styles";
import {InputBase, List} from "@material-ui/core";
import {songData} from "../../data/data";
import Song from "./Song";
import SearchIcon from "@material-ui/icons/Search";

const rows = songData.Songs;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: 360,
            backgroundColor: theme.palette.background.paper,
            display: 'flex',
            flexWrap: 'wrap',
            minWidth: 300,
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            marginLeft: 0,
            marginTop: 25,
            marginBottom: 25,
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputRoot: {
            color: 'inherit',
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: '12ch',
                '&:focus': {
                    width: '20ch',
                },
            },
        },
    }),
);

export default function Songs() {
    const classes = useStyles();
    const [searchTerm, setSearchTerm] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);

    const handleChange = event => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    useEffect(() => {
        const results = rows.filter(song => {
                if (song.name !== undefined) {
                    if (song.name.toLowerCase().includes(searchTerm)) {
                        return true;
                    }
                }
                if (song.author !== undefined) {
                    if (song.author.toLowerCase().includes(searchTerm)) {
                        return true;
                    }
                }
                if (song.year !== undefined) {
                    if (song.year.toLowerCase().includes(searchTerm)) {
                        return true
                    }
                }
            });
        setSearchResults(results);
    }, [searchTerm]);


    return (
        <>
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    type="text"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}

                    inputProps={{ 'aria-label': 'search' }}
                    value={searchTerm}
                    onChange={handleChange}

                />
            </div>
            <List className={classes.root}>
                {searchResults.map((song) => {
                    return (
                        <Song key={song.id} Song={song} />
                    );
                })}
            </List>
        </>
    );
}
