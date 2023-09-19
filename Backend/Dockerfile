FROM openjdk:11-jdk
EXPOSE 8080

COPY ${JAR_FILE} teentech.jar
ENTRYPOINT ["java","-Duser.timezone=\"Asia/Seoul\"", "-Dspring.profiles.active=oauth, jwt, prod", "-jar","/teentech.jar","&"]