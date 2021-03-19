import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import LibraryMusicIcon from '@material-ui/icons/LibraryMusic';
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
        textAlign: "center",
        verticalAlign: "middle"
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    gridItem: {
        verticalAlign: 'inherit'
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
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
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default function NavBar(LoggedIn) {
    const classes = useStyles();
    // const [anchorEl, setAnchorEl] = React.useState(null);
    //
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        // setAnchorEl(event.currentTarget);
    };

    // const handleClose = () => {
    //     setAnchorEl(null);
    // };

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Grid container className={classes.gridItem}>
                        <Grid item>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleClick}
                    >
                        <MenuIcon />
                    </IconButton>
                        </Grid>
                        <Grid item>

                        <Typography className={classes.title} variant="h6"  style={{marginTop: "10px"}} >
                        Liederbuch App Elferrat
                    </Typography>
                        </Grid>
                        <Grid item xs />
                            <Grid item>

                    <MenuBookIcon className={classes.menuButton} style={{marginTop: "10px"}} />
                    <LibraryMusicIcon />
                            </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </div>
    );
}
