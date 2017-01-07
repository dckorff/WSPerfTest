/* global io */

export default class Connection {

	constructor() {
		this.socket = io();
		console.log('this.socket');
		// console.log(this.socket);
	}

}