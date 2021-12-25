import * as React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';

export interface IDeleteCardModalViewProps {
    open: boolean,
    onClose: VoidFunction,
    onDelete: VoidFunction,
    title: string,
}

export interface IDeleteCardModalViewState {
    deleteAwait: boolean
}

export default class DeleteCardModalView extends React.Component<IDeleteCardModalViewProps, IDeleteCardModalViewState> {
    constructor(props: IDeleteCardModalViewProps) {
        super(props);

        this.state = {
            deleteAwait: false,
        }
    }

    onDelete = () => {
        this.setState({
            deleteAwait: true
        }, () => {
            this.props.onDelete();
        })
    }

    public render() {

        const mesStyle = {
            margin: '10px',
        }

        return (
            <Dialog open={this.props.open} onClose={this.props.onClose} maxWidth='sm'>
                <DialogTitle id="alert-dialog-title">
                    {"Delete this Item?"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <p><b>"{this.props.title}"</b>を消去しますか？</p>
                    <p>一度消すと元に戻せません。</p>
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={this.props.onClose}>Cancel</Button>
                <Button onClick={this.props.onDelete} color='error' autoFocus>
                    {this.state.deleteAwait ? 
                    <CircularProgress size={30} thickness={6} color='error'/> :
                    <>Delete</>
                    }
                </Button>
            </DialogActions>
            </Dialog>
        );
    }
}