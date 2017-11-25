import * as chalk from 'chalk'

const formatPaths = (paths: string[]) =>
	paths.map(path => '- ' + path + '\n').join('')

const violation = (error: string, violationPaths: string[]) => {
	const formattedViolation = formatPaths(violationPaths)

	console.log(
		error +
			'\n\n' +
			chalk.bold.cyan('The following immutable paths were modified: \n\n') +
			formattedViolation
	)
}

const immutable = (immutablePaths: string[]) => {
	const formattedImmutable = formatPaths(immutablePaths)

	console.log(
		chalk.bold.cyan('The following Paths have been added as immutable: \n\n') +
			formattedImmutable
	)
}

export default { violation, immutable }
