import Utils from './utils'

describe('utils', () => {
	describe('audit', () => {
		test('it passes if there are no immutable files', () => {
			const result = Utils.audit(['./src/test', './src/test2'], [])

			expect(result).toBe(true)
		})
		test('it passes if there are no modified files', () => {
			const result = Utils.audit([], ['./src/migrations/one.js'])

			expect(result).toBe(true)
		})
		test('it fails if there are files in the immutable list modified', () => {
			const result = Utils.audit(
				['./src/test/one', './src/migration/two'],
				['./src/migration/two']
			)

			expect(result).toBe(false)
		})
		test('it passes if there none of the immutable files were modified', () => {
			const result = Utils.audit(['./src/test'], ['./src/test2'])

			expect(result).toBe(true)
		})
	})
})
