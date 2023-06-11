import React, {useEffect, useState} from 'react';
import {Text} from 'ink';
import {TextInput} from '@inkjs/ui';
import fs from 'fs';

type Props = {
	name: string | undefined;
	start: boolean | undefined;
	task: boolean | undefined;
};

export default function App({
	name = 'Stranger',
	start = true,
	task = true,
}: Props) {
	const [count, setCount] = useState(100);

	const [message, setMessage] = useState('');

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
	} else if (task) {
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
	} else if (name === 'Geo') {
		return (
			<Text>
				Bye, <Text color="green">{name}</Text>
			</Text>
		);
	} else {
		return (
			<Text>
				Hi, <Text color="green">{name}</Text>
			</Text>
		);
	}
}
