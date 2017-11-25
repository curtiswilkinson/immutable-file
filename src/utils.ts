const audit = (modified: string[], immutable: string[]) =>
	modified.every(path => !immutable.includes(path))

export default {
	audit
}
