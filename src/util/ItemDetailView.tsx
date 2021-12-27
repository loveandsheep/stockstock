import { Dialog } from '@mui/material';
import * as React from 'react';
import { cardInfo, tagInfo } from '../view/ItemCard';

export interface IItemDetailViewProps {
    card: cardInfo,
    open: boolean,
    onClose: VoidFunction,
}

export interface IItemDetailViewState {
    edit_title: string,
    edit_detail: string,
}

export default class ItemDetailView extends React.Component<IItemDetailViewProps, IItemDetailViewState> {
    constructor(props: IItemDetailViewProps) {
        super(props);

        this.state = {
            edit_title: this.props.card.title!,
            edit_detail: this.props.card.detail!,
        }
    }

    public render() {
        return (
        <Dialog open={this.props.open} onClose={this.props.onClose} maxWidth='lg'>
            ItemDetailView
        </Dialog>
        );
    }
}
