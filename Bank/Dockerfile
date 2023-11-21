FROM openjdk:11-jdk
EXPOSE 8080
ARG JAR_FILE=build/libs/teentech-0.0.1-SNAPSHOT.jar

COPY ${JAR_FILE} teentech.jar
ENTRYPOINT ["java","-Duser.timezone=\"Asia/Seoul\"", "-Dspring.profiles.active=prod", "-jar","/teentech.jar","&"]