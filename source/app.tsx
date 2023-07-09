import React, {useState} from 'react';
import {Box, Text} from 'ink';
import {ConfirmInput, Select, TextInput} from '@inkjs/ui';
import fs from 'fs';
import ContainerElement from './components/ContainerElement.js';
import DisplayItems from './components/DisplayItems.js';
// import Table from 'ink-table';
// import GoBack from './components/GoBack.js';

type Props = {
	name: string | undefined;
};

export default function App({name = 'Stranger'}: Props) {
	const [feature, setFeature] = useState('');

	const [readData, setReadData] = useState([]);

	if (feature === 'create-task') {
		return (
			<ContainerElement>
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
			</ContainerElement>
		);
	} else if (feature === 'complete-task') {
		fs.readFile('task.txt', 'utf-8', (err, data) => {
			if (err) throw err;

			let split = data.split('\n');

			//@ts-ignore
			setReadData(split);
		});

		return (
			<ContainerElement>
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

				{/* <GoBack /> */}
			</ContainerElement>
		);
	} else if (name === 'Geo') {
		return (
			<Text>
				Bye, <Text color="green">{name}</Text>
			</Text>
		);
	} else if (feature === 'view-task') {
		fs.readFile('task.txt', 'utf-8', (err, data) => {
			if (err) throw err;

			let split = data.split('\n');

			//@ts-ignore
			setReadData(split);
		});

		return (
			<ContainerElement>
				<DisplayItems items={readData} />

				<Box marginTop={1} flexDirection="row" gap={2}>
					<Text>Go back?</Text>
					<ConfirmInput
						onCancel={() => setFeature('view-task')}
						onConfirm={() => setFeature('')}
					/>
				</Box>
			</ContainerElement>
		);
	} else {
		return (
			<ContainerElement>
				<Select
					options={[
						{label: 'Help', value: 'help'},
						{label: 'Create Task', value: 'create-task'},
						{label: 'Delete Task', value: 'delete-task'},
						{label: 'Complete Task', value: 'complete-task'},
						{label: 'View tasks', value: 'view-task'},
						{label: 'Exit', value: 'exit'},
					]}
					onChange={value => {
						setFeature(value);
						if (value === 'exit') process.exit();
					}}
				/>
			</ContainerElement>
		);
	}
}
