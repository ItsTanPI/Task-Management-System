import { openDB } from './database/db.js'
import { AuthModel } from './database/AuthModel.js'
import { hashString } from './util/hash.js'

async function start() 
{
	try 
	{
		const db = await openDB();
		console.log('Server started!');

		const username = 'admin';
		// const password = '1234';
		// const hashedPassword = hashString(password);

		// const userId = await AuthModel.register(username, hashedPassword);
		// console.log(`User registered with ID: ${userId}`);

		const user = await AuthModel.findByUsername(username);
		console.log('User found:', user);
	} 
	catch (error) 
	{
		console.error('Error:', error);
	}
}

start();