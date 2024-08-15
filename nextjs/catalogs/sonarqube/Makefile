# https://docs.sonarsource.com/sonarqube/latest/try-out-sonarqube/
sq-run:
	sudo docker run -d --name sonarqube -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true -p 9000:9000 sonarqube:latest

sq-scan:
	sudo docker run --rm -v ".:/usr/src" sonarsource/sonar-scanner-cli -X
