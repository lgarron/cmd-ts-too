.PHONY: build
build: setup
	bun run ./script/build.ts
	bun x tsc --project ./tsconfig.build.json

.PHONY: test
test: setup
	bun test

.PHONY: test-update-snapshots
test-update-snapshots:
	bun test --update-snapshots

.PHONY: lint
lint: setup
	bun x @biomejs/biome check
	bun x tsc --noEmit --project ./tsconfig.build.json

.PHONY: format
format: setup
	bun x @biomejs/biome check --write

.PHONY: publish
publish:
	npm publish

.PHONY: clean
clean:
	rm -rf ./dist ./public

.PHONY: setup
setup:
	bun install --frozen-lockfile

.PHONY: reset
reset: clean
	rm -rf ./node_modules

.PHONY: prepublishOnly
prepublishOnly: test clean build

.PHONY: build-book
build-book: setup
	bun x cargo-mdbook build --dest-dir=dist/web
