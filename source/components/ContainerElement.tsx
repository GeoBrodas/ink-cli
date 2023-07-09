import {Box, Text} from 'ink';
import BigText from 'ink-big-text';
import Gradient from 'ink-gradient';
import React from 'react';

function ContainerElement({children}: {children: any}) {
	return (
		<Box flexDirection="row" gap={5}>
			<Box flexDirection="column" width={'70%'}>
				<Gradient name="fruit">
					<BigText text="To-Do Bro" />
				</Gradient>

				<Text>
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. In
					cupiditate cum ad incidunt, tempora similique quaerat totam atque
					quisquam exercitationem unde deserunt, nobis tempore aperiam, rerum
					eum! Quae, aliquid placeat.
				</Text>
			</Box>

			<Box justifyContent="center" flexDirection="column">
				{children}
			</Box>
		</Box>
	);
}

export default ContainerElement;
