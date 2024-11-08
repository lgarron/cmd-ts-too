# This Makefile is a wrapper around the scripts from `package.json`.
# https://github.com/lgarron/Makefile-scripts

# Note: the first command becomes the default `make` target.
NPM_COMMANDS = build test build-book prepublishOnly

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

BIOME_PATHS = *.json ./batteries ./example ./script ./src ./test

.PHONY: lint
lint:
	npx @biomejs/biome check ${BIOME_PATHS}
	npx tsc --noEmit

.PHONY: format
format:
	npx @biomejs/biome format --write ${BIOME_PATHS}

.PHONY: publish
publish:
	npm publish

.PHONY: clean
clean:
	rm -rf ./dist

.PHONY: setup
setup:
	npm install
