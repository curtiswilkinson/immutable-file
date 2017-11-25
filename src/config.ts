import * as fs from 'mz/fs'
import * as path from 'path'
export interface Config {
	error: string
	lock: string[]
}

const configPath = path.join(process.cwd(), 'immutable-file.json')

const resolvePaths = (config: Config) => ({
	...config,
	lock: config.lock.map(immutablePath => path.resolve(immutablePath))
})

const read = () =>
	fs
		.readFile(configPath, 'utf8')
		.then(JSON.parse)
		.catch(e => {
			console.error('Unable to find immutable-file.json')
		}) as Promise<Config>

const write = (config: Config) =>
	fs.writeFile(configPath, JSON.stringify(config, null, 2))

const add = (config: Config, newImmutable: string | string[]) => {
	const newLockedFilesArray = Array.isArray(newImmutable)
		? newImmutable
		: [newImmutable]

	return write({
		...config,
		lock: Array.from(new Set([...config.lock, ...newLockedFilesArray]))
	})
}

export default { read, write, resolvePaths, add }
