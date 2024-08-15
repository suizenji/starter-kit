help:
	@echo foobar

# TODO: huskyの運用方針
husky: .husky .lintstagedrc.js
	@echo ここでは 、huskyを開発者個別で好きなように設定することを想定しています。
	@echo そのためには.gitignoreに次を追加する必要があります。
	@echo .husky
	@echo .lintstagedrc.js

.husky:
	npm install -D husky
	npx husky init
	echo "npx lint-staged" > .husky/pre-commit

.lintstagedrc.js:
	cp tools/lintstagedrc.js $@

# TODO: NEXTAUTH_SECRETはNextAuthで必要。値が空でエラーになる。
# openssl rand -base64 32
env: .env.development.local
.env.development.local:
	echo NEXTAUTH_SECRET=secret > $@
