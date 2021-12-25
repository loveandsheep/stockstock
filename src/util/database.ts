import { FirebaseApp, initializeApp } from 'firebase/app';
import { DocumentData, getFirestore, QuerySnapshot } from "firebase/firestore"
import { collection, getDocs, addDoc } from "firebase/firestore";
import axios from 'axios';


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
export const db_getItems = async (): Promise<QuerySnapshot<DocumentData> > => {
	const qsn = await getDocs(collection(db, "items-stock"));
	return qsn;
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

	console.log(JSON.stringify(meta));
	console.log("Image :" + meta[url]['og:image']);

	const docRef = await addDoc(collection(db, "items-stock"), {
		title: meta[url]['og:title'],
		detail: meta[url]['og:description'],
		thumb: meta[url]['og:image'],
		thumbRef: 'ogp',
		url: url
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


function formatDate (date: Date, format: string): string {
    format = format.replace(/yyyy/g, date.getFullYear().toString());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
    return format;
};