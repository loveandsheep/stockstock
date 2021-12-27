import * as React from 'react';
import Card from '@mui/material/Card'
import { Button, Box, Chip, CardActionArea } from '@mui/material';
import { CardContent, CardActions, CardMedia, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FullScreenIcon from '@mui/icons-material/Fullscreen';

export type tagInfo = {
	color: string,
	label: string,
	id: string,
}

/**
 * カード情報…データベースと一致するプロパティ
 *
 */
export type cardInfo = {
	itemId: string,
	title: string,
	detail: string,
	tags: Array<tagInfo>,
	thumb: string,
	thumbRef: string,
	date: string,
	url: string, 
}

export type IItemCardProps = {
	card: cardInfo,
	detailAction: (id: any, card: cardInfo) => void,
	deleteAction: (id: any, title: string) => void,
}

type IItemCardState = {
	title: string,
	detail: string,
	tags: Array<tagInfo>,
	thumb: string,
}

export default class ItemCard extends React.Component<IItemCardProps, IItemCardState> {

	constructor(props: IItemCardProps){
		super(props);

		this.state = {
			title: props.card.title,
			detail: props.card.detail,
			thumb: props.card.thumb,
			tags: props.card.tags,
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
							onClick={() => this.openInNewTab(this.props.card.url)}
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
								{this.props.card.date}
							</Typography>

						</CardContent>

						<CardActions style={{display: 'flex', flexDirection: 'column'}}>
							<Box style={{width: '100%'}}>
								{this.state.tags ? 
								this.state.tags.map(((tag: tagInfo, index) => 
									<Chip style={{margin: '2px', background: tag.color}} key={index} label={tag.label} size="small" color='primary'/>
								)) : <></>}
							</Box>
							<Box style={{width: '100%', display: 'flex', justifyContent: 'right'}}>
								<IconButton aria-label="edit" size="small">
									<EditIcon fontSize="inherit" />
								</IconButton>
								<IconButton aria-label="fullSize" size="small"
									onClick={() => this.props.detailAction(this.props.card.itemId, this.props.card)}
								>
									<FullScreenIcon fontSize="inherit" />
								</IconButton>
								<IconButton aria-label="delete" size="small"
									onClick={() => this.props.deleteAction(this.props.card.itemId, this.props.card.title)}
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
