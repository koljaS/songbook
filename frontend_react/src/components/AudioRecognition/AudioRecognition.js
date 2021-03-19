import {useEffect, useState} from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import {createStyles, fade, Theme} from "@material-ui/core/styles";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
// import {exampleAuddApiResponseLiquidoNarcotic, songData} from "../../data/data";
import {songData} from "../../data/data";
import axios from "axios";
import SearchIcon from '@material-ui/icons/Search';
import {Card, CardActions, CircularProgress, Collapse, Divider, InputBase, Typography} from "@material-ui/core";
import {Alert, Skeleton} from "@material-ui/lab";
import CardContent from "@material-ui/core/CardContent";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';
import elferrat_logo from './../../img/elferrat-logo.png';

const Mp3Recorder = new MicRecorder({bitRate: 128});
// const narcoticSong = exampleAuddApiResponseLiquidoNarcotic;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            minWidth: 300,
            width: '100%',
        },
        auddError: {
            width: '100%',
            '& > * + *': {
                marginTop: theme.spacing(2),
            }
        },
        bullet: {
            display: 'inline-block',
            margin: '0 2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        auddsongtext: {
            width: '100%',
            maxWidth: 500,
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
        audiorecording: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            margin: '10px'
        },
        audioplayer: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            margin: '10px'
        },
        large: {
            width: theme.spacing(20),
            height: theme.spacing(20),
        },
        image: {
            position: 'relative',
            height: 200,
            [theme.breakpoints.down('xs')]: {
                width: '100% !important', // Overrides inline-style
                height: 100,
            },
            '&:hover, &$focusVisible': {
                zIndex: 1,
                '& $imageBackdrop': {
                    opacity: 0.15,
                },
                '& $imageMarked': {
                    opacity: 0,
                },
                '& $imageTitle': {
                    border: '4px solid currentColor',
                },
            },
        },
        focusVisible: {},
        imageButton: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: theme.palette.common.white,
        },
        imageSrc: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundSize: 'cover',
            backgroundPosition: 'center 40%',
        },
        imageBackdrop: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: theme.palette.common.black,
            opacity: 0.4,
            transition: theme.transitions.create('opacity'),
        },
        imageTitle: {
            position: 'relative',
            padding: `${theme.spacing(2)}px ${theme.spacing(4)}px ${theme.spacing(1) + 6}px`,
        },
        imageMarked: {
            height: 3,
            width: 18,
            backgroundColor: theme.palette.common.white,
            position: 'absolute',
            bottom: -2,
            left: 'calc(50% - 9px)',
            transition: theme.transitions.create('opacity'),
        },
    }),
);

function AudioRecognition() {
    const classes = useStyles();
    const [blobURL, setBlobURL] = useState('');
    const [auddResponse, setAuddResponse] = useState('');
    const [/*auddError, */ setAuddError] = useState('');
    const [elferratSong, setElferratSong] = useState('');
    const [open, setOpen] = useState(false);

    // const [auddResponse, setAuddResponse] = useState(narcoticSong);
    const [isBlocked, setIsBlocked] = useState(false);
    const [isRecording, setIsRecording] = useState(false);

    useEffect(() => {
        navigator.getUserMedia({audio: true},
            () => {
                console.log('Permission Granted');
                setIsBlocked(false);
            },
            () => {
                console.log('Permission Denied');
                setIsBlocked(true);
            },
        );
    });

    const updateAuddResponse = (response) => {
        if (Object.keys(response.data).length === 0 && response.data.constructor === Object){
            // setAuddError('Error: No title found to your audio recording.')
            setElferratSong('')
            setAuddResponse('')
            setOpen(true)
            return
        }
        setOpen(false)

        setAuddResponse(response.data)

        let foundSong = songData.Songs.find(function(song) {
            return song.origtitle === response.data.title;
        })

        if (foundSong !== undefined) {
            setElferratSong(foundSong);
        } else {
            setElferratSong('')
        }

    };

    const start = () => {
        setIsRecording(true);

        console.log("in start() ");
        if (isBlocked) {
            console.log('Permission Denied');

            setIsRecording(false)
        } else {

            if (isRecording) {
                return;
            }
            setIsRecording(true)
            Mp3Recorder
                .start()
                .then(() => {
                    // setIsRecording(true);
                }).catch((e) => console.error(e));


            setTimeout(function () {
                console.log("stopping the recording after 10 secs")
                stop();
            }, 6000);
            setIsRecording(false)

        }

    };

    const stop = () => {
        console.log("in stop()");

        Mp3Recorder
            .stop()
            .getMp3()
            .then(([buffer, blob]) => {

                const file = new File(buffer, 'testfile.mp3', {
                    type: blob.type,
                    lastModified: Date.now()
                });

                // play audio in frontend
                const blobURL = URL.createObjectURL(file)
                // const player = new Audio(blobURL);
                setBlobURL(blobURL);

                const formData = new FormData();
                formData.append('testfile.mp3', file)

                // same token has to be set in golang backend
                const authToken = "";

                // change url to deployed url
                axios.post('http://localhost:7770/recognize-audio', formData, {
                    'headers': {
                        'Authorization': authToken
                    }
                }).then(res => {
                    updateAuddResponse(res)
                })
            }).catch((e) => {
            alert('We could not retrieve your message');
            console.log(e);
        })
                // setAuddResponse(narcoticSong)
                // responseAudd = narcoticSong;
        // setAuddResponse(responseAudd)
    };

    return (
        <div className={classes.root}>
            <audio src={blobURL} controls="controls" className={classes.audioplayer}/>
            <Button onClick={() => start()} className={classes.audiorecording}>
                <Avatar
                    alt="Example Alt"
                    src={elferrat_logo}
                    className={classes.large}
                />
            </Button>

            {isRecording &&
                <>
                <CircularProgress color="secondary" />

                <div className={classes.root}>
                <Skeleton />
                <Skeleton animation={false} />
                <Skeleton animation="wave" />
                </div>
                </>
            }

            {/*{auddError !== '' &&*/}
            <div className={classes.auddError}>
                <Collapse in={open}>
                    <Alert
                        severity="warning"
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        Kein Song gefunden!
                    </Alert>
                </Collapse>
            </div>

            {/*}*/}

            {console.log(auddResponse)}
            {auddResponse !== '' &&

            <Card className={classes.root}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {auddResponse.title} | {auddResponse.artist}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        <Link href={"https://lis.tn/NarcoticLongVersion"} title={"link"}/>
                    </Typography>
                </CardContent>
                <CardActions>
                    <a href={auddResponse.song_link} target="_blank" rel="noreferrer">
                      Hör dir den Originalsong an
                    </a>
                </CardActions>
            </Card>
            }

            {elferratSong !== '' &&
<>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>


                <Card className={classes.root}>
                <Divider />
                <br />
                <br />
                <br />
                <CardContent>
                    <Typography variant="h4" component="h2">
                        Lied gefunden!
                    </Typography>
                    <Typography variant="h5" component="h2">
                            {elferratSong.name} | {elferratSong.author}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary" variant="body1">
                        {elferratSong.text}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        <Link href={"https://lis.tn/NarcoticLongVersion"} title={"link"}/>
                    </Typography>
                </CardContent>
            </Card>
                </>
            }

            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                    // onChange={}
                />
            </div>
        </div>
    )
}

export default AudioRecognition;