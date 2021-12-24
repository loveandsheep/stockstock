import { Grid, AppBar, Toolbar } from '@mui/material';
import * as React from 'react';
import ItemCard, { IItemCardProps } from './ItemCard';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import {db_createFromURL, db_getItems} from '../util/database'
import { DocumentData, QuerySnapshot } from 'firebase/firestore';

export interface ICardViewProps {
}

interface ICardViewState {
	cards: any,
}

const StyledFab = styled(Fab)({
	position: 'absolute',
	zIndex: 1,
	top: -30,
	left: 0,
	right: 0,
	margin: '0 auto',
});

export default class CardView extends React.Component<ICardViewProps, ICardViewState> {

	constructor(props: ICardViewProps){
		super(props);
		this.state = {
			cards: [],
		};
		
		this.reloadCards();
		db_createFromURL();
	}

	createCardFromUrl() {

	}

	reloadCards() {
		db_getItems().then((query) => {
			query.forEach((doc) => {
				this.pushCard(doc.data());
			})
		});
	}

	pushCard(data: DocumentData) {
		const newCard = (
			<ItemCard 
				title={data.title} 
				detail={data.detail}
				tags={[]}
				thumb={data.thumb}
			/>
		)
		this.setState({
			cards: this.state.cards.concat(newCard),
		})
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


			<AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
			<Toolbar>
			<StyledFab color="secondary" aria-label="add">
				<AddIcon />
			</StyledFab>
			</Toolbar>
			</AppBar>
			</div>
		);
	}
}
