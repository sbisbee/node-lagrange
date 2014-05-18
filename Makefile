NODE_MODULES := ./node_modules

VOWS := ${NODE_MODULES}/vows/bin/vows

all: check

${NODE_MODULES}:
	npm install

check: ${NODE_MODULES}
	${VOWS} ./tests/*.js

.PHONY: check
