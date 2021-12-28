import { Box, Chip, Card, Typography, CardContent, CardMedia, Dialog, CardActionArea, CardActions, Button, TextField } from '@mui/material';
import * as React from 'react';
import { cardInfo, tagInfo } from '../view/ItemCard';
import DetailEditor from './DetailEditorComponent';
import { useState } from 'react';

export interface IItemDetailViewProps {
    card: cardInfo,
    open: boolean,
    onClose: VoidFunction,
}


export default function ItemDetailView (props: IItemDetailViewProps) {

    const [tempCard, setCard] = useState(props.card);

    React.useEffect(() => {
        setCard(props.card);
    }, [props.card]);

    const changeTitle = (value: string) => {
        const nc: cardInfo = tempCard;
        nc.title = value;
        setCard(nc);
    }

    const changeDetail = (value: string) => {
        const nc: cardInfo = tempCard;
        nc.detail = value;
        setCard(nc);
    }


    return (
        <Dialog open={props.open} onClose={props.onClose} maxWidth='lg'>
            <Card>
                <CardMedia 
                    component="img"
                    height={250}
                    image={props.card.thumb}
                />
                <CardContent>
                        
                    <DetailEditor 
                        onChange={changeTitle}
                        default = {tempCard.title}
                        label = {'title'}
                        multiline = {false}
                        variant='h6'
                    />
                    <DetailEditor
                        onChange={changeDetail}
                        default = {tempCard.detail}
                        label = {'detail'}
                        multiline = {true}
                        variant='caption'
                    />


                </CardContent>
                <Box style={{marginLeft: '10px', marginRight: '10px'}}>
								{tempCard.tags ? 
								tempCard.tags.map(((tag: tagInfo, index) => 
									<Chip 
                                        style={{margin: '2px', background: tag.color}} key={index} label={tag.label} size="small" color='primary'/>
								)) : <></>}
                </Box>
                <CardActions style={{display: 'flex', justifyContent: 'right'}}>
                    <Button variant='outlined' size='small' onClick={props.onClose}>Cancel</Button>
                    <Button variant='contained' color='primary' size='small'>Save</Button>
                </CardActions>
            </Card>
        </Dialog>
    );
};