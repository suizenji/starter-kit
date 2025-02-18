build:
	npx tsc
	npx tsc-alias

watch:
	npx tsc -w & \
	npx nodemon --watch dist/**/* --exec 'npx tsc-alias' & \
	wait
