import Config, { Config as ConfigT } from './config'
import * as glob from 'glob'
import * as path from 'path'
import * as fs from 'mz/fs'

export default (config: ConfigT, pattern: string) => {
	glob(pattern, { dot: true }, (err, files) => {
		Promise.all(files.map(async match => processMatch(config, match)))
	})
}

const processMatch = async (config: ConfigT, match: string) =>
	await fs.lstat(match).then(stat => {
		// If there entire directory needs to be added
		if (stat.isDirectory()) {
			return fs.readdir(match).then(dirFiles => {
				const relativeDirFiles = dirFiles.map(file =>
					path.relative(process.cwd(), path.join(match, file))
				)
				return Config.add(config, relativeDirFiles)
			})
		} else {
			Config.add(config, match)
		}
	})
