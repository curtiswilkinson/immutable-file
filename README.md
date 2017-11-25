# immutable-file

A tool to lock down commits against project files you don't want touched.

## Purpose

This tool allows files to be marked as "immutable" by storing their paths in a
config file, these will then be checked against any staged git changes.

This is useful to add a precommit check for collaborative projects (or even just
you!), where you want to guarantee things like database migrations don't get
edited.

## Getting Started

### Installation

You can install immutable-file directly into your project with:

`npm i immutable-file --save-dev` or `yarn add immutable-file --dev`

If you also install globally, there is other useful CLI functionality

`npm i -f immutable-file` or `yarn global add immutable-file`

If you have the global install above, you can now run `immutable-file --init` in
your project to automatically create a `immutable-file.json` in your root.

Alternatively, you can just make an `immutable-file.json` in your project (And
configure as explained in the next section)

### Configuration

Immutable-file config is JSON in the following shape:

```javascript
{
  "error": "These migrations should not be edited!",
  "lock": [
    "./relative/path/to/file/you/want/locked"
  ]
}
```

This config file should be kept in your project version control to allow the
auditing between collaborators.

The `error` key is a string that will get cited as the reason for failing an
immutable-file audit (They've tried to commit with a file in the lock array
staged).

The `lock` key is just an array of relative paths to the files you want to block
commits against.

## Precommit git hook

This library best used as a precommit hook, so that the audit is run
automatically. To do this, install [Husky](https://github.com/typicode/husky) to
your project and add the following to your `package.json`

```javascript
"scripts": {
  "precommit": "immutable-file"
}
```

## Marking a file as immutable

If you have immutable-file installed globally, you can just run `immutable-file
-f <path>` to have it automatically inserted into the `immutable-file.json`
file, or you can do this manually of course.

If you'd like to add multiple files, you can add them by calling `immutable-file
--glob <glob>` flag. This will calculate the relevant paths to add **at that
point in time** and add them seperately to the lock list.
