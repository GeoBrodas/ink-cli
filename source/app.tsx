import React, {useEffect, useState} from 'react';
import {Box, Text} from 'ink';
import {Select, TextInput} from '@inkjs/ui';
import fs from 'fs';

type Props = {
	name: string | undefined;
	start: boolean | undefined;
};

export default function App({name = 'Stranger', start = true}: Props) {
	const [count, setCount] = useState(100);

	const [message, setMessage] = useState('');

	const [feature, setFeature] = useState('');

	// const [readData, setReadData] = useState('');

	useEffect(() => {
		let timer: any;
		if (count < 0) {
			setMessage('Completed!');

			return;
		}

		if (start && count > 0) {
			setInterval(() => {
				timer = setCount(count => count - 1);
			}, 100);
		}
		return () => clearInterval(timer);
	}, []);

	if (start) {
		if (message.length > 0) {
			return <Text>{message}</Text>;
		} else {
			return (
				<Text color="black" backgroundColor={'yellow'}>
					Starting in {count}
				</Text>
			);
		}
	} else if (feature === 'create-task') {
		return (
			<TextInput
				placeholder="Enter your task"
				onSubmit={name => {
					fs.readFile('task.txt', (err, data) => {
						if (err) {
							fs.writeFile('task.txt', name, err => {
								if (err) throw err;
								process.exit();
							});
						}

						if (data) {
							fs.appendFile('task.txt', `\n${name}`, err => {
								if (err) throw err;

								process.exit();
							});
						}
					});
				}}
			/>
		);
	} else if (feature === 'complete-task') {
		fs.readFile('task.txt', 'utf-8', (err, data) => {
			if (err) throw err;

			let split = data.split('\n');

			console.log(split);
		});

		return (
			<Box>
				<Text>{'readData'}</Text>
			</Box>
		);
	} else if (name === 'Geo') {
		return (
			<Text>
				Bye, <Text color="green">{name}</Text>
			</Text>
		);
	} else {
		return (
			<Select
				options={[
					{label: 'Help', value: 'help'},
					{label: 'Create Task', value: 'create-task'},
					{label: 'Delete Task', value: 'delete-task'},
					{label: 'Complete Task', value: 'complete-task'},
				]}
				onChange={value => setFeature(value)}
			/>
		);
	}
}
