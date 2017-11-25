const audit = (modified: string[], immutable: string[]) => {
	return modified.reduce((acc, path) => {
		if (immutable.includes(path)) {
			acc.push(path)
		}

		return acc
	}, [])
}

export default {
	audit
}
