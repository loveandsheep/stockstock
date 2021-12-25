import * as React from 'react';
import Card from '@mui/material/Card'
import { Button, Box, Chip, CardActionArea } from '@mui/material';
import { CardContent, CardActions, CardMedia, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FullScreenIcon from '@mui/icons-material/Fullscreen';


export type IItemCardProps = {
	title: string,
	detail: string,
	tags: Array<string>,
	thumb: string,
	itemId: string,
	date: string,
	url: string,
	deleteAction: (id: any, title: string) => void,
}

type IItemCardState = {
	title: string,
	detail: string,
	tags: Array<string>,
	thumb: string,
}

export default class ItemCard extends React.Component<IItemCardProps, IItemCardState> {

	constructor(props: IItemCardProps){
		super(props);

		this.state = {
			title: props.title,
			detail: props.detail,
			thumb: props.thumb,
			tags: props.tags,
		}
	}

	openInNewTab = (url: string) => {
		const newWindow = window.open(url)
		if (newWindow) newWindow.opener = null
	}

	public render() {
		const cardStyle = {
			margin: '10px',
			borderRadius: '10px',
		}

		const style_title = {
			display: 'block',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			overflow: 'hidden',		
		} as React.CSSProperties;

		const style_detail = {
			display: '-webkit-box',
			WebkitBoxOrient: 'vertical',
			WebkitLineClamp: 3,
			overflow: 'hidden',		
		} as React.CSSProperties;

		return (
			<div>
				<Card style={cardStyle}>
					<CardActionArea>
						<CardMedia
							component="img"
							height="150"
							image={this.state.thumb}
							onClick={() => this.openInNewTab(this.props.url)}
						/>
					</CardActionArea>
					<Box sx={{ display: 'flex', flexDirection: 'column' }}>
						<CardContent>
							<Typography style={style_title} variant='h6'>
								{this.state.title}
							</Typography>
							<Typography style={style_detail} variant="caption">
								{this.state.detail}
							</Typography>
							<Typography variant='caption' style={{color: '#999999'}}>
								{this.props.date}
							</Typography>

						</CardContent>

						<CardActions style={{display: 'flex', flexDirection: 'column'}}>
							<Box style={{width: '100%'}}>
								{this.state.tags ? 
								this.state.tags.map(((tag: string) => 
									<Chip style={{margin: '2px'}} key={tag} label={tag} size="small" color='primary'/>
								)) : <></>}
							</Box>
							<Box style={{width: '100%', display: 'flex', justifyContent: 'right'}}>
								<IconButton aria-label="edit" size="small">
									<EditIcon fontSize="inherit" />
								</IconButton>
								<IconButton aria-label="fullSize" size="small">
									<FullScreenIcon fontSize="inherit" />
								</IconButton>
								<IconButton aria-label="delete" size="small"
									onClick={() => this.props.deleteAction(this.props.itemId, this.props.title)}
								>
									<DeleteIcon fontSize="inherit" />
								</IconButton>
							</Box>
						</CardActions>
					</Box>
				</Card>
			</div>
		);
	}
}
