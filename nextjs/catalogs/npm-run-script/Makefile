ci:
	npm install --no-audit
	npm audit --omit=dev --audit-level=moderate
	npm run format:check
	npm run lint:es
	npm run lint:markup
	npx tsc --noEmit
	npm run test:report
	npm run build
	npm run sb:test
	npm run sb:build
