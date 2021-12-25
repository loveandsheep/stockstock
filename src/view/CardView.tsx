import { Grid, AppBar, Toolbar, Modal, Dialog } from '@mui/material';
import * as React from 'react';
import ItemCard, { IItemCardProps } from './ItemCard';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import {db_createFromURL, db_createNewCardFromURL, db_deleteItem, db_getItems, formatDate} from '../util/database'
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import CreateCardModalView from './CreateCardModalView';
import { IronTwoTone } from '@mui/icons-material';
import DeleteCardModalView from './DeleteCardModal';

export interface ICardViewProps {
}

interface ICardViewState {
	cards: any,
	createModal: boolean,
	deleteModal: boolean,
	deleteTarget: string,
	deleteTitle: string,
}

const StyledFab = styled(Fab)({
	position: 'absolute',
	zIndex: 1,
	top: -30,
	left: 0,
	right: 0,
	margin: '0 auto',
});

/**
 * カードの一覧を表示するためのクラス
 */
export default class CardView extends React.Component<ICardViewProps, ICardViewState> {
	
	constructor(props: ICardViewProps){
		super(props);
		this.state = {
			cards: [],
			createModal: false,
			deleteModal: false,
			deleteTarget: '',
			deleteTitle: '',
		};
	}

	componentDidMount(){
		this.reloadCards();
		// db_createNewCardFromURL('https://ryohin-keikaku.jp/').then(id => {
		// 	console.log("id :" + id);
		// });
	}

	createCardFromUrl() {

	}

	reloadCards() {
		this.setState({
			cards: [],
		}, () => {
			db_getItems().then((query) => {
				query.forEach((doc) => {
					this.pushCard(doc.data(), doc.id);
				})
			});	
		})
	}

	/**
	 * ビューにカード情報のコンポーネントItem Cardを追加する
	 *
	 * @param {DocumentData} data
	 * @memberof CardView
	 */
	pushCard = (data: DocumentData, id: any) => {
		const newCard = [(
			<ItemCard 
				title={data.title} 
				detail={data.detail}
				tags={data.tags}
				thumb={data.thumb}
				key={id}
				itemId={id}
				url={data.url}
				date={formatDate(new Date(data.date), "yyyy.MM.dd-HH:mm:ss")}
				deleteAction={this.openDeleteModal}
			/>
		)];
		this.setState({
			cards: newCard.concat(this.state.cards),
		})
	}

	/**
	 * ビューからカードの削除
	 *
	 * @param {*} id
	 * @memberof CardView
	 */
	deleteCard = () => {
		db_deleteItem(this.state.deleteTarget).then(() => {
			this.closeDeleteModal();
			this.reloadCards();
		})
	}

	openCreateModal = () => {this.setState({createModal: true});};
	closeCreateModal = () => {this.setState({createModal: false})};
	openDeleteModal = (id: any, title: string) => {
		this.setState({
			deleteModal: true,
			deleteTarget: id,
			deleteTitle: title,
		})
	};
	closeDeleteModal = () => {this.setState({deleteModal: false})};

	public render() {

		return (
			<div>
				<DeleteCardModalView
					open={this.state.deleteModal}
					onClose={this.closeDeleteModal}
					onDelete={this.deleteCard}
					title={this.state.deleteTitle}
				/>
				<CreateCardModalView 
					open={this.state.createModal} 
					onClose={this.closeCreateModal}
					onNewCard={this.pushCard}
				/>

			<Grid container>
				{this.state.cards.map(((card: any, index: number) => 
				<Grid item xs={12} md={4} lg={3} key={"grid" + index}>
					{card}
				</Grid>
				))}				
			</Grid>


			<AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0 }}>
			<Toolbar>

			<StyledFab color="secondary" aria-label="add" onClick={this.openCreateModal}>
				<AddIcon  />
			</StyledFab>
			</Toolbar>
			</AppBar>
			</div>
		);
	}
}
