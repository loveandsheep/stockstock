import * as React from 'react';
import Card from '@mui/material/Card'
import { Button, Box, Chip, CardActionArea, CardHeader } from '@mui/material';
import { CardContent, CardActions, CardMedia, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import FullScreenIcon from '@mui/icons-material/Fullscreen';
import { Timestamp } from 'firebase/firestore';
import { myTheme } from '..';

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
	tags: Array<string>,
	tagArr: Array<tagInfo> | undefined,
	thumb: string,
	thumbRef: string,
	date: Timestamp,
	dateView: string | undefined,
	url: string, 
}

export type IItemCardProps = {
	card: cardInfo,
	detailAction: (id: any, card: cardInfo) => void,
	deleteAction: (id: any, title: string) => void,
	setTagPreset: (name: string) => void,
}

type IItemCardState = {
	title: string,
	detail: string,
	tags: Array<string>,
	tagArr: Array<tagInfo> | undefined,
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
			tagArr: props.card.tagArr,
		}
	}

	openInNewTab = (url: string) => {
		const newWindow = window.open(url)
		if (newWindow) newWindow.opener = null
	}

	public render() {

		const cardBox = {
			maxWidth: '100%',
			flexGrow: '1',
		}

		const cardStyle = {
			width: '100%',
			height: '100%',
			borderRadius: '20px',
		}

		const style_title = {
			color: myTheme.palette.text.secondary,
			display: 'block',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			overflow: 'hidden',		
		} as React.CSSProperties;

		const style_detail = {
			color: myTheme.palette.text.secondary,
			display: '-webkit-box',
			WebkitBoxOrient: 'vertical',
			WebkitLineClamp: 1,
			overflow: 'hidden',		
		} as React.CSSProperties;

		const style_header = {
			background: this.props.card.thumb,
			height: '120px',
		}

		return (
			<Box style={cardBox}>
				<Card style={cardStyle}>
					<CardActionArea>
						{this.props.card.thumbRef == 'color' ? 
						<CardHeader style={style_header}
							onClick={() => this.openInNewTab(this.props.card.url)}
						/> :
						<CardMedia
							component="img"
							height="150"
							image={this.state.thumb}
							onClick={() => this.openInNewTab(this.props.card.url)}
						/>
						}
						
					</CardActionArea>
					<Box sx={{ display: 'flex', flexDirection: 'column', justifyContent:'end'}}>
						<CardContent>
							<Typography style={style_title} variant='h6'>
								{this.state.title}
							</Typography>
							<Typography style={style_detail} variant="caption">
								{this.state.detail}
							</Typography>
							<Typography variant='caption' style={{color: '#999999'}}>
								{this.props.card.dateView}
							</Typography>
						</CardContent>

						<CardActions style={{display: 'flex', flexDirection: 'column'}}>
							<Box style={{width: '100%'}}>
								{this.state.tagArr ? 
								this.state.tagArr.map(((tag: tagInfo, index) => 
									<Chip 
										style={{margin: '2px', background: tag.color}} 
										key={index} label={tag.label} size="small" color='primary'
										onClick={() => this.props.setTagPreset(tag.label)}
										/>
								)) : <></>}
							</Box>
							<Box style={{width: '100%', display: 'flex', justifyContent: 'right', marginTop: 'auto'}}>
								<IconButton aria-label="fullSize" color='info' size="medium"
									onClick={() => this.props.detailAction(this.props.card.itemId, this.props.card)}
								>
									<FullScreenIcon fontSize="inherit" />
								</IconButton>
								<IconButton aria-label="delete" color='info' size="medium"
									onClick={() => this.props.deleteAction(this.props.card.itemId, this.props.card.title)}
								>
									<DeleteIcon fontSize="inherit" />
								</IconButton>
							</Box>
						</CardActions>
					</Box>
				</Card>
			</Box>
		);
	}
}
