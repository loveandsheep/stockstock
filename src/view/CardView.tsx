import { Button, cardClasses, Grid } from '@mui/material';
import * as React from 'react';
import ItemCard from './ItemCard';

export interface ICardViewProps {
}

interface ICardViewState {
	cards: any,
}

export default class CardView extends React.Component<ICardViewProps, ICardViewState> {

	constructor(props: ICardViewProps){
		super(props);
		this.state = {
			cards: [(<ItemCard/>), (<ItemCard/>), (<ItemCard/>), (<ItemCard/>)],
		};
	}

	public render() {
		return (
			<div>
			<Grid container>
				{this.state.cards.map(((card: any) => 
				<Grid item xs={4}>
					{card}
				</Grid>
				))}				
			</Grid>
			</div>
		);
	}
}
