help:
	@echo foobar

# TODO: huskyの運用方針
husky: .husky lint-staged.config.mjs
	@echo huskyは開発者個別で好きなように設定することを想定しています。

.husky:
	npm install -D husky
	npx husky init
	echo "npx lint-staged" > .husky/pre-commit

lint-staged.config.mjs:
        cp tools/_lint-staged.config.mjs $@

# TODO: NEXTAUTH_SECRETはNextAuthで必要。値が空でエラーになる。
# openssl rand -base64 32
env: .env.development.local
.env.development.local:
	echo NEXTAUTH_SECRET=secret > $@
