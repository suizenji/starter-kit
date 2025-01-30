GID := com.example
PJ := demo-app

help:
	@echo TODO

project: $(PJ)
$(PJ):
	mvn archetype:generate \
	-DinteractiveMode=false \
	-DgroupId=$(GID) \
	-DartifactId=$(PJ)

compile:
	mvn compile

exec:
	mvn exec:java -D exec.mainClass=com.example.App
