import { FirebaseApp, initializeApp } from 'firebase/app';
import { DocumentData, getFirestore, QuerySnapshot } from "firebase/firestore"
import { collection, getDocs } from "firebase/firestore";

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

export const db_getItems = async (): Promise<QuerySnapshot<DocumentData> > => {
	const qsn = await getDocs(collection(db, "items-stock"));
	return qsn;
}

export const db_createFromURL = () => {
	const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
	const url = "https://zenn.dev/mattn/articles/d16e9c8bb6138c";

	fetch(url).then(res => res.text()).then(text => {
		const el = new DOMParser().parseFromString(text, "text/html")
		const headEls = (el.head.children)
		Array.from(headEls).map(v => {
			const prop = v.getAttribute('property')
			if (!prop) return;
			console.log(prop, v.getAttribute("content"))
		})
	})
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