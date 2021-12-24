import * as React from 'react';
import Card from '@mui/material/Card'
import { Button, Box } from '@mui/material';
import { CardContent, CardActions, CardMedia, Typography } from '@mui/material';

export type IItemCardProps = {
	title: string,
	detail: string,
	tags: Array<string>,
	thumb: string,
}

export default class ItemCard extends React.Component<IItemCardProps> {

	constructor(props: IItemCardProps){
		super(props);

		this.state = {
			title: props.title,
			detail: props.detail,
			thumb: props.thumb,
		}
	}

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
						image={this.props.thumb}
					/>
					<Box sx={{ display: 'flex', flexDirection: 'column' }}>
						<CardContent>
							<Typography sx={{ mb: 1.5 }} color="text.secondary">
								{this.props.title}
							</Typography>
							<Typography variant="body2">
								{this.props.detail}
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
