import { Button } from '@mui/material';
import * as React from 'react';
import ItemCard from './ItemCard';

export interface IcardViewProps {
}

export default class cardView extends React.Component<IcardViewProps> {



	public render() {
		return (
			<div>
			<Button variant="contained"> aaa </Button>
			<ItemCard/>
			</div>
		);
	}
}
