import * as React from 'react';
import Card from '@mui/material/Card'
import { Button, Box } from '@mui/material';
import { CardContent, CardActions, CardMedia, Typography } from '@mui/material';

export interface IItemCardProps {
}

export default class ItemCard extends React.Component<IItemCardProps> {
	public render() {
		const cardStyle = {
			margin: '10px',
			borderRadius: '10px',
		}

		return (
			<div>
				<Card style={cardStyle}>
					<CardMedia
						component="img"
						height="194"
						image="https://tenari.jp/wp-content/uploads/2019/08/header_cat-e1565445515390.jpg"
					/>
					<Box sx={{ display: 'flex', flexDirection: 'column' }}>
						<CardContent>
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
					</Box>
				</Card>
			</div>
		);
	}
}
