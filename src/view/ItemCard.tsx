import * as React from 'react';
import Card from '@mui/material/Card'
import { Button } from '@mui/material';
import { CardContent, CardActions, Typography } from '@mui/material';

export interface IItemCardProps {
}

export default class ItemCard extends React.Component<IItemCardProps> {
	public render() {
		return (
			<div>
				<Card style={{maxWidth: 400, borderRadius: '10px'}}>
					<CardContent>
						<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
							Word of the Day
						</Typography>
						<Typography variant="h5" component="div">
							日本語だよ
						</Typography>
						<Typography sx={{ mb: 1.5 }} color="text.secondary">
							これも日本語だよ
						</Typography>
						<Typography variant="body2">
							well meaning and kindly.
							<br />
							{'"a benevolent smile"'}
						</Typography>
					</CardContent>
					<CardActions>
						<Button size="small">Learn More</Button>
					</CardActions>
				</Card>
			</div>
		);
	}
}
