import { Box, Chip, Card, Typography, CardContent, CardMedia, Dialog, CardActionArea, CardActions, Button, TextField } from '@mui/material';
import * as React from 'react';
import { cardInfo, tagInfo } from '../view/ItemCard';
import DetailEditor from './DetailEditorComponent';

export interface IItemDetailViewProps {
    card: cardInfo,
    open: boolean,
    onClose: VoidFunction,
}

export interface IItemDetailViewState {
    tempCard: cardInfo, //編集した情報を保存しておく
}

export default class ItemDetailView extends React.Component<IItemDetailViewProps, IItemDetailViewState> {
    constructor(props: IItemDetailViewProps) {
        super(props);

        this.state = {
            tempCard: this.props.card,
        }
    }

    changeTitle = (value: string) => {
        const nc: cardInfo = this.state.tempCard;
        nc.title = value;
        this.setState({tempCard: nc});
    }
    changeDetail = (value: string) => {
        const nc: cardInfo = this.state.tempCard;
        nc.detail = value;
        this.setState({tempCard: nc});
    }
    
    componentDidUpdate() {
    }

    public render() {
        return (
        <Dialog open={this.props.open} onClose={this.props.onClose} maxWidth='lg'>
            <Card>
                <CardMedia 
                    component="img"
                    height={250}
                    image={this.props.card.thumb}
                />
                <CardContent>
                        
                    <DetailEditor 
                        onChange={this.changeTitle}
                        default = {this.state.tempCard.title}
                        label = {'title'}
                        multiline = {false}
                        element = {(
                            <Typography variant='h6'>
                            {this.state.tempCard.title}
                            </Typography>        
                        )}
                    />
                    <DetailEditor
                        onChange={this.changeDetail}
                        default = {this.state.tempCard.detail}
                        label = {'detail'}
                        multiline = {true}
                        element = {(
                            <Typography variant="caption">
                            {this.state.tempCard.detail}
                            </Typography>    
                        )}
                    />


                </CardContent>
                <Box style={{marginLeft: '10px', marginRight: '10px'}}>
								{this.props.card.tags ? 
								this.props.card.tags.map(((tag: tagInfo, index) => 
									<Chip 
                                        style={{margin: '2px', background: tag.color}} key={index} label={tag.label} size="small" color='primary'/>
								)) : <></>}
                </Box>
                <CardActions style={{display: 'flex', justifyContent: 'right'}}>
                    <Button variant='outlined' size='small' onClick={this.props.onClose}>Cancel</Button>
                    <Button variant='contained' color='primary' size='small'>Save</Button>
                </CardActions>
            </Card>
        </Dialog>
        );
    }
}
