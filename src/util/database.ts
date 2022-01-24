import { FirebaseApp, initializeApp } from 'firebase/app';
import { DocumentData, getFirestore, QueryConstraint, QuerySnapshot, updateDoc } from "firebase/firestore"
import { collection, getDocs, addDoc, query, orderBy, limit, where, Timestamp } from "firebase/firestore";
import axios from 'axios';
import { getDoc } from 'firebase/firestore';
import { doc } from 'firebase/firestore';
import { DocumentSnapshot } from 'firebase/firestore';
import { deleteDoc } from 'firebase/firestore';
import { cardInfo } from '../view/ItemCard';
import { createTypePredicateNodeWithModifier } from 'typescript';

const name_collection = "items-stock";
const name_tagCollection = "tags";

const firebaseConfig = {
	apiKey: "AIzaSyDq020-qPzBu87XT6Qibu9Zdwgm2Ox-zMI",
	authDomain: "stockstock-67299.firebaseapp.com",
	projectId: "stockstock-67299",
	storageBucket: "stockstock-67299.appspot.com",
	messagingSenderId: "928186110072",
	appId: "1:928186110072:web:ff3c1007708a85a2ff5d8d"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const db_initialize = () => {
}

/**
 * 
 *　コレクションからカードの一覧を取得
 * @return {*}  {Promise<QuerySnapshot<DocumentData> >}
 */
export const db_getItems = async (_whereQuery: QueryConstraint): Promise<QuerySnapshot<DocumentData> > => {
	
	const q = query(collection(db, name_collection), orderBy('date', 'desc'), limit(100), _whereQuery);
	
	const qsn = await getDocs(q);
	return qsn;
	
}

/**
 *
 * IDを元に単一アイテムを取得
 * @return {*}  {Promise<QuerySnapshot<DocumentData> >}
 */
export const db_getItem = async (id: any): Promise<DocumentSnapshot<DocumentData> > => {
	const docRef = doc(db, name_collection, id)
	const qsn: DocumentSnapshot<DocumentData> = await getDoc(docRef);
	return qsn;
}

/**
 * カード情報を更新する
 *
 * @param {cardInfo} card - id含む新たなカード情報
 * @return {*}  {Promise<DocumentSnapshot<DocumentData> >}
 */
export const db_updateCard = async(card: cardInfo): Promise<void> => {
	const id = card.itemId;
	delete card.tagArr;
	delete card.dateView;
	const cardDoc = doc(db, name_collection, id);
	return await updateDoc(cardDoc, card);
}

/**
 * アイテムの消去
 *
 * @param {*} id - ターゲットとなるアイテムのID
 */
export const db_deleteItem = async (id: any) => {
	await deleteDoc(doc(db, name_collection, id));
}

/**
 *
 * URLからメタ情報を拾ってきて新規カードを作成する
 * @param {string} url - 取得先のURL
 * @return {*}  {Promise<string>} - 作成したカードのドキュメントID
 */
export const db_createNewCardFromURL = async (url: string): Promise<string> => {
	//TODO: OGPが無かった場合のフォロー
	const meta = await db_createFromURL(url);

	const tags = await makeTagByMetaInfo(url, meta[url]);
	const newTag = await db_getTag('未整理');
	tags.push(newTag);

	if (meta[url]['og:description'] === undefined) meta[url]['og:description'] = '';

	const now = Timestamp.fromDate(new Date());
	const docRef = await addDoc(collection(db, name_collection), {
		title: meta[url]['og:title'],
		detail: meta[url]['og:description'],
		thumb: meta[url]['og:image'],
		thumbRef: 'ogp',
		tags: tags,
		url: url,
		date: now,
	});

	return docRef.id;
}

/**
 *
 * Cloud function経由でメタ情報を引っ張ってくる
 * @param {string} url
 * @return {*}  {Promise<any>}
 */
export const db_createFromURL = async (url: string): Promise<any> => {
	const res = await axios.get('https://us-central1-stockstock-67299.cloudfunctions.net/getOgpFromExternalWebsite?url=' + url)
	return res.data;
}


/**
 *
 * タグの新規作成
 * @param {string} label
 * @param {string} color
 * @return {*}  {Promise<any>}
 */
const db_createNewTag = async(label: string, color: string): Promise<any> => {

	console.log("label: "+ label);
	const docRef = await addDoc(collection(db, name_tagCollection), {
		label: label,
		color: color,
	});

	return docRef.id;
}

/**
 *
 * タグの一覧を取得
 * @return {*}  {Promise<QuerySnapshot<DocumentData> >}
 */
export const db_getTagList = async(): Promise<QuerySnapshot<DocumentData> > => {
	const c = collection(db, name_tagCollection);
	const q = query(c);
	const qsn = await getDocs(q);
	return qsn;
}

/**
 *
 * タグIDからラベルを取得
 * @param {string} id
 * @return {*}  {Promise<string>}
 */
export const db_getTagLabel = async(id: string): Promise<string> => {
	const docRef = doc(db, name_tagCollection, id)
	const qsn: DocumentSnapshot<DocumentData> = await getDoc(docRef);
	const ret: string = qsn.data()!.label;
	return ret;
}

/**
 *
 * ラベル名からタグのドキュメントを探索してIDを返す。該当が無ければ新規に発行してIDを返す
 * @param {string} label
 * @return {Primise<string>} - ドキュメントID
 */
export const db_getTag = async(label: string): Promise<string> => {
	let ret: string = "";

	const c = collection(db, name_tagCollection)
	const q = query(c, where("label", "==", label));
	const doc: QuerySnapshot<DocumentData> = await getDocs(q);
	
	if (doc.size > 0)
	{
		ret = doc.docs[0].id;
	}
	else
	{
		ret = await db_createNewTag(label, '#333');
	}
	
	return ret;
}

/**
 *
 * URLからタグを推測してIDの一覧を発行
 * @param {string} url
 * @param {*} info
 * @return {*}  {Array<string>}
 */
const makeTagByMetaInfo = async(url: string, info: any): Promise<Array<string> > => {
	let ret: Array<string> = [];
	let tagNames: Array<string> = [];

	if (url.match(/youtu\.be/)) tagNames.push('YouTube');
	else if (url.match(/youtube/)) tagNames.push('YouTube');
	
	if (url.match(/twitter/)) tagNames.push('Twitter');

	if (info['og:description'] !== undefined && info['og:title'] !== undefined)
	{
		if (info['og:description'].match(/tutorial/)) tagNames.push('Tutorial');
		else if (info['og:description'].match(/entagma/)) tagNames.push('Tutorial');
		
		if (info['og:description'].match(/Houdini/)) tagNames.push('Houdini');
		else if (info['og:title'].match(/Houdini/)) tagNames.push('Houdini');	
	}
	
	for (var tag of tagNames)
	{
		console.log(tag);
		const retId = await db_getTag(tag);
		ret.push(retId);
	}
	return ret;
}

export function formatDate (date: Date, format: string): string {
    format = format.replace(/yyyy/g, date.getFullYear().toString());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
    return format;
};

export const req_kabutan = async(stock: number): Promise<string> =>{
	const st = stock;
	const res = await axios.get('https://kabutan.jp/stock/?code=7453');
	console.log(res);
	// 
	return JSON.stringify(res);
};