import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import MicIcon from '@material-ui/icons/Mic';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import EventIcon from '@material-ui/icons/Event';


const divStyle = {
    bottom: "0",
};

class Footer extends Component {

    state = {
        value: 0,
        pathMap: [
            '/audio-recognition',
            '/Songs',
            '/events',
        ],
    };

    componentWillReceiveProps(newProps) {
        const {pathname} = newProps.location;
        const {pathMap} = this.state;

        const value = pathMap.indexOf(pathname);

        if (value > -1) {
            this.setState({
                value
            });
        }
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const {value, pathMap} = this.state;

        return (
            <BottomNavigation
                style={divStyle} className="nav bottom"
                value={value}
                onChange={this.handleChange}
                showLabels
            >
                <BottomNavigationAction label="AudioRecognition" icon={<MicIcon />} component={Link} to={pathMap[0]} />
                <BottomNavigationAction label="Songs" icon={<QueueMusicIcon />} component={Link} to={pathMap[1]} />
                <BottomNavigationAction label="Events" icon={<EventIcon />} component={Link} to={pathMap[2]} />
            </BottomNavigation>
        );
    }
}

export default withRouter(Footer);