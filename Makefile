# This Makefile is a wrapper around the scripts from `package.json`.
# https://github.com/lgarron/Makefile-scripts

# Note: the first command becomes the default `make` target.
NPM_COMMANDS = test build-book prepublishOnly

.PHONY: $(NPM_COMMANDS)
$(NPM_COMMANDS):
	npm run $@

# We write the npm commands to the top of the file above to make shell autocompletion work in more places.
DYNAMIC_NPM_COMMANDS = $(shell node -e 'console.log(Object.keys(require("./package.json").scripts).join(" "))')
UPDATE_MAKEFILE_SED_ARGS = "s/^NPM_COMMANDS = .*$$/NPM_COMMANDS = ${DYNAMIC_NPM_COMMANDS}/" Makefile
.PHONY: update-Makefile
update-Makefile:
	@echo "Updating Makefile…"
	@if [ "$(shell uname -s)" = "Darwin" ] ; then sed -i "" ${UPDATE_MAKEFILE_SED_ARGS} ; fi
	@if [ "$(shell uname -s)" != "Darwin" ] ; then sed -i"" ${UPDATE_MAKEFILE_SED_ARGS} ; fi

.PHONY: build
build:
	bun run ./script/build.ts
	npx tsc --project ./tsconfig.build.json

.PHONY: lint
lint:
	npx @biomejs/biome check
	npx tsc

.PHONY: format
format:
	npx @biomejs/biome format --write

.PHONY: publish
publish:
	npm publish

.PHONY: clean
clean:
	rm -rf ./dist ./public

.PHONY: setup
setup:
	npm install
