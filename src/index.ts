#!/usr/bin/env node
import * as cli from 'cli'
import * as fs from 'mz/fs'
import * as path from 'path'
const stagedGit = require('staged-git-files')

import Config from './config'
import Utils from './utils'
import Glob from './glob'

const flags = {
	file: ['f', 'A path to the file being locked', 'file'],
	init: ['i', 'Creates an immutable-file.json in the current path', 'bool'],
	glob: [
		'g',
		'allows you provide a glob, all files paths matching will be made immutable',
		'string'
	]
} as any

interface StagedFile {
	filename: string // actually a path, lol,
	status: string
}

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

	stagedGit('', (err: Error, files: Array<StagedFile>) => {
		const modifiedFiles = files.map(file => path.resolve(file.filename))
		const auditResult = Utils.audit(
			modifiedFiles,
			Config.resolvePaths(config).lock
		)

		if (auditResult) {
			return process.exit(0)
		}

		console.error(config.error)
		return process.exit(1)
	})
}

main()
