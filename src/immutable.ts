import * as path from 'path'
const stagedGit = require('staged-git-files')

import Config, { Config as ConfigT } from './config'
import Utils from './utils'

interface StagedFile {
	filename: string // actually a path, lol,
	status: string
}

export default (config: ConfigT) => {
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
