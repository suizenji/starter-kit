help:
	@echo TODO

project: $(PJ)
$(PJ):
	mvn archetype:generate

compile:
	mvn compile

exec:
	mvn exec:java -D exec.mainClass=myPackage.App
