FROM python:3.9.13

RUN ln -snf /usr/share/zoneinfo/Asia/Seoul /etc/localtime
RUN echo Asia/Seoul > /etc/timezone

ARG OPENAI_KEY

ENV openai_api_key=$OPENAI_KEY

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

EXPOSE 8000

CMD python main.py