FROM python:3.9.13

RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
RUN echo Asia/Seoul > /etc/timezone

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

EXPOSE 8000

CMD python src/main.py