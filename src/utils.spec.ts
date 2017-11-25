import Utils from './utils'

describe('utils', () => {
	describe('audit', () => {
		test('it returns an empty array if no immutable files', () => {
			const result = Utils.audit(['./src/test', './src/test2'], [])

			expect(result).toEqual([])
		})

		test('it returns and empty arrry if no modified files', () => {
			const result = Utils.audit([], ['./src/migrations/one.js'])

			expect(result).toEqual([])
		})

		test('it returns an array of audit failures', () => {
			const result = Utils.audit(
				['./src/test/one', './src/migration/two'],
				['./src/migration/two']
			)

			expect(result).toEqual(['./src/migration/two'])
		})

		test('it returns multiple audit failures', () => {
			const result = Utils.audit(['src/one', 'src/two'], ['src/one', 'src/two'])

			expect(result).toEqual(['src/one', 'src/two'])
		})
		test('it passes if there none of the immutable files were modified', () => {
			const result = Utils.audit(['./src/test'], ['./src/test2'])

			expect(result).toEqual([])
		})
	})
})
