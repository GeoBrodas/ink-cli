import {OrderedList} from '@inkjs/ui';
import {Text} from 'ink';
import React from 'react';

interface Props {
	items: Array<string>;
}

function DisplayItems({items}: Props) {
	return (
		<OrderedList>
			{items.map((item, index) => (
				<OrderedList.Item key={index}>
					<Text>{item}</Text>
				</OrderedList.Item>
			))}
		</OrderedList>
	);
}

export default DisplayItems;
