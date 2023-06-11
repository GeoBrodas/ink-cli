#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import App from './app.js';

const cli = meow(
	`
	Usage
	  $ ink-cli

	Options
		--name  Your name
		--start 

	Examples
	  $ ink-cli --name=Jane
	  Hello, Jane
`,
	{
		importMeta: import.meta,
		flags: {
			name: {
				type: 'string',
			},
			start: {
				type: 'boolean',
			},
			task: {
				type: 'boolean',
			},
		},
	},
);

render(
	<App name={cli.flags.name} start={cli.flags.start} task={cli.flags.task} />,
);
