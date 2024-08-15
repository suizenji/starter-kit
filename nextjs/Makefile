PJ := app

help:
	@echo Next.js starter kit
	@echo example:
	@echo '	quick start : make project core sample PJ=quick-start'
	@echo '	standard    : make project core base jest mock playwright'

all: project core base sample jest mock prisma storybook playwright nextauth aws-ses docker markuplint

project: $(PJ)
$(PJ):
	echo '' | npx create-next-app --ts --tailwind --eslint --app --import-alias '@/*' $(PJ)
	-cd $(PJ) && git init && git add . && git commit -m 'create-next-app'
	cp src/tailwind.config.ts $(PJ)

core: env provider
env: $(PJ)/.env $(PJ)/config
$(PJ)/.env:
	cp src/.env $(PJ)
$(PJ)/config:
	cp -r src/config $(PJ)

provider: $(PJ)/providers
$(PJ)/providers:
	cp -r src/providers $(PJ)
	cp src/app/layout.tsx $(PJ)/app

base: $(PJ)/Makefile $(PJ)/tools $(PJ)/.eslintrc.js prettier
$(PJ)/Makefile:
	cp src/Makefile $@
$(PJ)/tools:
	cp -r src/tools $(PJ)
$(PJ)/.eslintrc.js:
	cd $(PJ) && npm install -D eslint-config-prettier
	cp src/.eslintrc.js $@
	-rm $(PJ)/.eslintrc.json

prettier: $(PJ)/.prettierrc $(PJ)/.prettierignore
$(PJ)/.prettierrc:
	cd $(PJ) && npm install -D prettier
	cp src/.prettierrc $@
$(PJ)/.prettierignore:
	cp src/.prettierignore $@

sample: $(PJ)/app/dev $(PJ)/repositories $(PJ)/components $(PJ)/types
$(PJ)/app/dev:
	cp -r ./src/app/dev $(PJ)/app
$(PJ)/repositories:
	cp -r ./src/repositories $(PJ)
$(PJ)/components:
	cp -r ./src/components $(PJ)
$(PJ)/types:
	cp -r ./src/types $(PJ)

jest: $(PJ)/__tests__ $(PJ)/jest.config.ts
$(PJ)/__tests__:
	cd $(PJ) && npm install -D jest jest-environment-jsdom @testing-library/react @testing-library/jest-dom
	cd $(PJ) && npm install -D @types/jest ts-node cross-fetch
	cp -r ./src/__tests__ $(PJ)
$(PJ)/jest.config.ts:
	cp ./src/jest.config.ts $@

mock: $(PJ)/mocks $(PJ)/lib/msw.tsx
$(PJ)/mocks:
	cd $(PJ) && npm install -D msw@latest @mswjs/data && npx msw init public --save
	cp -r ./src/mocks $(PJ)
$(PJ)/lib/msw.tsx:
	mkdir -p $(PJ)/lib
	cp ./src/lib/msw.tsx $@

prisma: $(PJ)/prisma $(PJ)/lib/prisma.ts
$(PJ)/prisma:
	cd $(PJ) && npm install -D prisma && npx prisma init --datasource-provider sqlite
	cd $(PJ) && npm install @prisma/client && npm install -D ts-node
	cp -r ./src/prisma $(PJ)
$(PJ)/lib/prisma.ts:
	mkdir -p $(PJ)/lib
	cp ./src/lib/prisma.ts $@

storybook: $(PJ)/.storybook
$(PJ)/.storybook:
	cd $(PJ) && npx storybook@latest init --no-dev
	cp src/.storybook/* $@

playwright: $(PJ)/__e2e__
$(PJ)/__e2e__:
	cd $(PJ) && npm init playwright@latest
	mkdir -p $@
	cp -r src/__e2e__/* $@

nextauth: $(PJ)/middleware.ts $(PJ)/features/auth $(PJ)/app/api
$(PJ)/middleware.ts:
	cd $(PJ) && npm install next-auth
	cp src/middleware.ts $@
$(PJ)/features/auth:
	mkdir -p $(PJ)/features/auth
	cp -r src/features/auth/* $@
$(PJ)/app/api:
	cp -r src/app/api $@

aws-ses: $(PJ)/features/mail
$(PJ)/features/mail:
	cd $(PJ) && npm install @aws-sdk/client-ses nodemailer && npm install -D @types/nodemailer
	mkdir -p $(PJ)/features/mail
	cp -r src/features/mail/* $@

docker: $(PJ)/Dockerfile $(PJ)/dev.Dockerfile $(PJ)/docker-compose.yml
$(PJ)/Dockerfile:
	cp src/Dockerfile $@
$(PJ)/dev.Dockerfile:
	cp src/dev.Dockerfile $@
$(PJ)/docker-compose.yml:
	cp src/docker-compose.yml $@

markuplint: $(PJ)/.markuplintrc
$(PJ)/.markuplintrc:
	cd $(PJ) && npm install -D markuplint @markuplint/jsx-parser @markuplint/react-spec
	cp src/.markuplintrc $@
