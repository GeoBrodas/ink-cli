import React, {useEffect, useState} from 'react';
import {Text} from 'ink';
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

	const [readData, setReadData] = useState([]);

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
						if (err || data.length === 0) {
							fs.writeFile('task.txt', name, err => {
								if (err) throw err;
							});
						}

						fs.appendFile('task.txt', `\n${name}`, err => {
							if (err) throw err;
						});
					});

					setFeature('');
				}}
			/>
		);
	} else if (feature === 'complete-task') {
		fs.readFile('task.txt', 'utf-8', (err, data) => {
			if (err) throw err;

			let split = data.split('\n');

			//@ts-ignore
			setReadData(split);
		});

		return (
			<Select
				options={readData?.map((item: any, index: number) => ({
					label: item,
					value: index.toString(),
				}))}
				onChange={value => {
					//@ts-ignore
					let data = readData.filter((item: any, index) => index !== +value);

					if (data) {
						//@ts-ignore
						fs.writeFile('task.txt', data.join('\n'), err => {
							if (err) throw err;
						});

						setFeature('');
					}
				}}
			/>
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
					{label: 'Exit', value: 'exit'},
				]}
				onChange={value => {
					setFeature(value);
					if (value === 'exit') process.exit();
				}}
			/>
		);
	}
}
