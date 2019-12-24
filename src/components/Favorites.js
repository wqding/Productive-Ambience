import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import env from '../env.js'

const cardStyle = makeStyles({
    card: {
        minWidth: 275,
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
});

export default function Favorites(props) {
    const [favorites, setFavorites] = useState();

    const getFavorites = () => {
        var token = sessionStorage.getItem('token');
        console.log(token)
    
        axios.get(`${env.baseUrl}/savedFavorites`, {
            token: token,
            username: props.username,
        })
        .then(res => {
            if(res.status === 200){
                //get favs returned from server
                console.log(res)
                setFavorites(res.data.savedFavorites);

                //render favs
            }
        })
        .catch(err => {
            console.log(err)
            props.openSnackbar('error', err)
        });
    }
    
    const renderFavorites = (props) => {
        const classes = cardStyle();
        const bull = <span className={classes.bullet}>•</span>;

        getFavorites();
    
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Word of the Day
                    </Typography>
                    <Typography variant="h5" component="h2">
                        be
                        {bull}
                        nev
                        {bull}o{bull}
                        lent
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        adjective
                    </Typography>
                    <Typography variant="body2" component="p">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small">Learn More</Button>
                </CardActions>
            </Card>
        );
    }

    return (
       <div>
           {renderFavorites}
       </div>
    );
}