#!/usr/bin/env node
import * as cli from 'cli'
import * as fs from 'mz/fs'
import * as path from 'path'

import Config from './config'
import Utils from './utils'
import Glob from './glob'
import Immutable from './immutable'

const flags = {
	file: ['f', 'A path to the file being locked', 'file'],
	init: ['i', 'Creates an immutable-file.json in the current path', 'bool'],
	glob: [
		'g',
		'allows you provide a glob, all files paths matching will be made immutable',
		'string'
	]
} as any

const main = async () => {
	const options = cli.parse(flags)

	if (options.init) {
		return await Config.write({ error: '', lock: [] })
	}

	const config = await Config.read()

	if (options.glob) {
		return Glob(config, options.glob)
	}

	if (options.file) {
		return await Config.add(config, options.file)
	}

	return Immutable(config)
}

main()
