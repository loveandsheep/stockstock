import { Grid, AppBar, Toolbar, Button } from '@mui/material';
import * as React from 'react';
import ItemCard, { cardInfo, IItemCardProps, tagInfo } from './ItemCard';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import {db_createFromURL, db_createNewCardFromURL, db_deleteItem, db_getItem, db_getItems, db_getTag, db_getTagLabel, db_getTagList, formatDate} from '../util/database'
import { DocumentData, QuerySnapshot } from 'firebase/firestore';
import CreateCardModalView from './CreateCardModalView';
import { IronTwoTone } from '@mui/icons-material';
import DeleteCardModalView from './DeleteCardModal';
import ItemDetailView from '../util/ItemDetailView';

export interface ICardViewProps {
}

export type cardUnit = {
	comp: React.ReactElement,
	id: string,
}

interface ICardViewState {
	cards: Array<cardUnit>,
	createModal: boolean,
	deleteModal: boolean,
	detailModal: boolean,
	detailCard: cardInfo,
	deleteTarget: string,
	deleteTitle: string,
	tagList: {[name: string]: tagInfo},
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
			detailModal: false,
			detailCard: undefined!,
			deleteTarget: '',
			deleteTitle: '',
			tagList: {},
		};
	}

	componentDidMount(){
		this.reloadCards();
	}

	/**
	 * cardViewのカード一覧を更新する
	 *
	 * @memberof CardView
	 */
	reloadCards() {
		this.setState({
			cards: [],
		}, () => {
			db_getTagList().then((query) => {
				const tagList: {[name: string]: tagInfo} = {};
				for (var doc of query.docs)
				{
					const newTag: tagInfo = { //カード一覧のクエリを元にタグのリストを作成
						label: doc.data().label,
						color: doc.data().color,
						id: doc.id,
					}
					tagList[doc.id] = newTag;
				}

				this.setState({
					tagList: tagList //タグリストをstateに登録
				}, () => {
					db_getItems().then((query) => {//タグの取得完了後、カード一覧を取得
						this.pushCardMult(query);
					});
				})
			});
		})
	}

	/**
	 * アイテム情報からカードのReactElementを作る
	 *
	 * @param {DocumentData} data
	 * @param {string} id
	 * @memberof CardView
	 */
	cardFromDocumentData = (data: DocumentData, id: string):cardUnit => {
		const ci: cardInfo = {
			title: data.title,
			detail: data.detail,
			tags: data.tags,
			tagArr: this.getTagObjList(data.tags),
			thumb: data.thumb,
			thumbRef: data.thumbRef,
			itemId: id,
			url: data.url,
			date: data.date,
			dateView: formatDate(new Date(data.date.toDate()), "yyyy.MM.dd HH:mm:ss")
		}
		const newUnit = {
			id: id,
			comp: (
				<ItemCard 
				key={id}
				deleteAction={this.openDeleteModal}
				detailAction={this.openDetailModal}
				card={ci}
				/>				
			),
		}
		return newUnit;
	}

	/**
	 * 複数カードを一括で登録
	 *
	 * @param {QuerySnapshot<DocumentData>} query
	 * @memberof CardView
	 */
	pushCardMult = (query: QuerySnapshot<DocumentData>) => {
		let cardArr: Array<cardUnit> = [];
		query.forEach((doc) => {
			const newCard: cardUnit = this.cardFromDocumentData(doc.data(), doc.id);
			cardArr.push(newCard);
		})
		this.setState({
			cards: cardArr.concat(this.state.cards),
		})
	}

	/**
	 * ビューにカード情報のコンポーネントItem Cardを追加する
	 *
	 * @param {DocumentData} data
	 * @memberof CardView
	 */
	pushCard = (data: DocumentData, id: string) => {
		const newCard = [this.cardFromDocumentData(data, id)];
		this.setState({
			cards: newCard.concat(this.state.cards),
		})
	}

	/**
	 * カード情報をサーバーから再取得して更新する
	 *
	 * @param {string} id
	 * @memberof CardView
	 */
	updateCard = (id: string) => {
		db_getItem(id).then((data) => {
			const newCard = this.cardFromDocumentData(data.data()!, id);
			var index = this.state.cards.findIndex( (v) => v.id == id);

			if (index >= 0)
			{
				var cardArr = this.state.cards.slice();
				cardArr.splice(index, 1, newCard);
				
				this.setState({cards: []}, () => {
					this.setState({cards: cardArr});
				})
			}
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

	/**
	 * タグIDのリスト情報からtagInfo型のリストを作成する
	 *
	 * @memberof CardView
	 */
	getTagObjList = (idList: Array<string>): Array<tagInfo> => {
		let ret: Array<tagInfo> = [];
		for (var idx of idList)
		{
			ret.push(this.state.tagList[idx]);
		}
		return ret;
	}

	openCreateModal = () => {this.setState({createModal: true});};
	closeCreateModal = () => {this.setState({createModal: false})};
	closeDetailModal = () => {this.setState({detailModal: false})};
	
	openDetailModal = (id: any, card: cardInfo) => {
		id = id;
		this.setState({
			detailModal: true,
			detailCard: card,
		});
	}
	
	openDeleteModal = (id: any, title: string) => {
		this.setState({
			deleteModal: true,
			deleteTarget: id,
			deleteTitle: title,
		})
	};
	closeDeleteModal = () => {this.setState({deleteModal: false})};

	testMethod = () => {
		db_getTag("Houdini").then((id) => {
			console.log(id);
		})

		db_getTagLabel("xbvThOvIyZNlqqi6FBKb").then((label) => {
			console.log("label :" + label);
		});

		
	}

	public render() {

		return (
			<div>
			<Button onClick={this.testMethod} >test</Button>
			{
				this.state.detailCard !== undefined ? 
				<ItemDetailView 
					card={this.state.detailCard}
					open={this.state.detailModal}
					onClose={this.closeDetailModal}
					onUpdate={this.updateCard}
				/>
				:
				<></>
			}
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
				defaultUrl=''
			/>

			<Grid container>
				{this.state.cards.map(((card: cardUnit, index: number) => 
				<Grid item xs={12} md={4} lg={3} key={"grid" + index}>
					{card.comp}
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
