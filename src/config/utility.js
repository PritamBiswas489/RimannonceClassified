import moment from 'moment-timezone';
import { env } from '../../environment';
export const fileToBase64 = (file) => {
	return new Promise((resolve) => {
		let fileInfo;
		let baseURL = '';
		// Make new FileReader
		let reader = new FileReader();

		// Convert the file to base64 text
		reader.readAsDataURL(file);

		// on reader load somthing...
		reader.onload = () => {
			// Make a fileInfo Object
			baseURL = reader.result;
			// console.log(baseURL);
			resolve(baseURL);
		};
		console.log(fileInfo);
	});
};
export const getAppUrl = () =>{
	const {type, appUrls} = env;
	return appUrls[type].apiUrl;
}
export const getMediaUrl = () =>{
	const {type, mediaUrls} = env;
	return mediaUrls[type].apiUrl;

}
export const isValidUrl = (str) => {
	const pattern = new RegExp(
		'^([a-zA-Z]+:\\/\\/)?' + // protocol
			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
			'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
			'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
			'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
			'(\\#[-a-z\\d_]*)?$', // fragment locator
		'i'
	);
	if (!pattern.test(str)) {
		return false;
	}
	// fetch(str).then((res) => {
	// 	if (res.status !== 200) {
	// 		return false;
	// 	}
	// 	return true;
	// });
	// console.log(res);

	/* var request;
	if (typeof window !== 'undefined') {
		if (window.XMLHttpRequest) request = new XMLHttpRequest();
		else request = new ActiveXObject('Microsoft.XMLHTTP');
		request.open('GET', str, false);
		request.send(); // there will be a 'pause' here until the response to come.
		// the object request will be actually modified
		if (request.status === 404) {
			return false;
		}
	} */
	return true;
};

function convertImageToBase64(imgUrl, callback) {
	const image = new Image();
	image.crossOrigin = 'anonymous';
	image.onload = () => {
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		canvas.height = image.naturalHeight;
		canvas.width = image.naturalWidth;
		ctx.drawImage(image, 0, 0);
		const dataUrl = canvas.toDataURL();
		callback && callback(dataUrl);
	};
	image.src = imgUrl;
}
export function imgSrcToBase64(imagUrl) {
	return new Promise((resolve) => convertImageToBase64(imagUrl, resolve));
}

export const stringMask = (str) => {
	return `${str.slice(0, 6)}...${str.slice(-4)}`;
};

export const cardMasking = (cardNumber) => {
	if (!cardNumber) {
		return cardNumber;
	}
	const cardValue = cardNumber.replace(/\D/g, '').match(/(\d{1,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
	console.log('cardValue :>> ', cardValue);
	if (!cardValue) return '';
	const maskedValue = !cardValue[2]
		? cardValue[1]
		: `${cardValue[1]} ${cardValue[2]}${`${cardValue[3] ? ` ${cardValue[3]}` : ''}`}${`${cardValue[4] ? ` ${cardValue[4]}` : ''}`}`;
	return maskedValue;
};

export function getLastSeen(timestamp) {
	const now = new Date();
	const lastSeen = new Date(convertUtcToAsiaKolkata(timestamp));
	const timeDiff = now - lastSeen;

	const minutes = Math.floor(timeDiff / (1000 * 60));
	const hours = Math.floor(timeDiff / (1000 * 60 * 60));
	const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
	// console.log('now :>> ', now, lastSeen);
	if (minutes < 1) {
		return 'Just now';
	} else if (minutes < 60) {
		// return `${minutes}m ago`;
		return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
	} else if (hours < 24) {
		// return `${hours}h ago`;
		return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
	} else if (days < 7) {
		// return `${days}d ago`;
		return `${days} ${days === 1 ? 'day' : 'days'} ago`;
	} else {
		const options = {
			//   timeZone: 'Asia/Kolkata',
			year: 'numeric',
			month: 'short',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
		};
		return lastSeen.toLocaleString('en-US', options);
	}
}

export function getInitialChar(name) {
	const parts = name.trim().split(' ');
	const firstName = parts[0];
	const lastName = parts.length > 1 ? parts[parts.length - 1] : '';

	const firstInitial = firstName.charAt(0).toUpperCase();
	const secondInitial = lastName.charAt(0).toUpperCase();

	if (lastName === '') {
		return firstName.slice(0, 2).toUpperCase();
	} else {
		return `${firstInitial}${secondInitial}`;
	}
}
function convertUtcToAsiaKolkata(mstDate) {
	const asiaKolkataDate = moment.tz(mstDate, 'America/Denver').tz('Asia/Kolkata');
	return asiaKolkataDate.format('YYYY-MM-DD HH:mm:ss');
}

export const generatePusherChannel = (userId1, userId2) => {
	const ids = [userId1, userId2];
	const sortedId = ids.sort();
	return `presence-channel-${sortedId[0]}-${sortedId[1]}`;
};

export const determineFileType = (mimeType) => {
	if (mimeType.startsWith('audio/')) {
		return 'AUDIO';
	} else if (mimeType.startsWith('video/')) {
		return 'VIDEO';
	} else if (mimeType.startsWith('image/')) {
		return 'IMAGE';
	} else {
		return 'Unknown';
	}
};

export const formatNumberWithAbbreviation = (num) => {
	num = num.toString().replace(/[^0-9.]/g, '');
	if (num < 1000) {
		return num;
	}
	let si = [
		{ v: 1e3, s: 'K' },
		{ v: 1e6, s: 'M' },
		{ v: 1e9, s: 'B' },
		{ v: 1e12, s: 'T' },
		{ v: 1e15, s: 'P' },
		{ v: 1e18, s: 'E' },
	];
	let index;
	for (index = si.length - 1; index > 0; index--) {
		if (num >= si[index].v) {
			break;
		}
	}
	return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[index].s;
};
export const isEmptyObjectOrNull = (obj) => {
	return obj === null || Object.keys(obj).length === 0;
};
