import asyncio
from functools import lru_cache
from typing import AsyncGenerator
from fastapi.middleware.cors import CORSMiddleware
from fastapi import Depends, FastAPI
from fastapi.responses import StreamingResponse
from langchain.callbacks import AsyncIteratorCallbackHandler
from langchain.chains import ConversationChain
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.prompts import (
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    MessagesPlaceholder,
    SystemMessagePromptTemplate,
)
from pydantic import BaseModel
from pydantic_settings import BaseSettings
import uvicorn
import os
from dotenv import load_dotenv

class Settings(BaseSettings):
    openai_api_key: str = ""
    load_dotenv()
    openai_api_key = os.environ.get('openai_api_key')

@lru_cache()
def get_settings():
    return Settings()

class StreamingConversationChain:

    def __init__(self, openai_api_key: str, temperature: float = 0.0):
        self.memories = {}
        self.openai_api_key = openai_api_key
        self.temperature = temperature

    async def generate_response(
        self, conversation_id: str, message: str
    ) -> AsyncGenerator[str, None]:

        callback_handler = AsyncIteratorCallbackHandler()
        llm = ChatOpenAI(
            callbacks=[callback_handler],
            streaming=True,
            temperature=self.temperature,
            openai_api_key=self.openai_api_key,
        )

        memory = self.memories.get(conversation_id)
        if memory is None:
            memory = ConversationBufferMemory(return_messages=True)
            self.memories[conversation_id] = memory

        chain = ConversationChain(
            memory=memory,
            prompt=CHAT_PROMPT_TEMPLATE,
            llm=llm,
        )

        run = asyncio.create_task(chain.arun(input=message))

        async for token in callback_handler.aiter():
            yield token

        await run


class ChatRequest(BaseModel):

    conversation_id: str
    message: str


CHAT_PROMPT_TEMPLATE = ChatPromptTemplate.from_messages(
    [
        SystemMessagePromptTemplate.from_template(
            "You are an AI that helps children aged 8 to 13 study economics. Please answer in a way that even children aged 8 to 13 can easily understand. If your friend asks you a conversation or question about something other than economics, don't answer. When asked a question about the economy, answer kindly, briefly, and in a cute tone. If you don't know what to ask, give a friendly example. don't add Brother, sister, cute AI stuff to your answer. answer in korean."
        "Don't say things that aren't true" "When answering, check your answer one last time and say you don't know if it's not related to the economy.""It's okay to ask questions about the answers to the quiz."
        ),
        MessagesPlaceholder(variable_name="history"),
        HumanMessagePromptTemplate.from_template("{input}"),
    ]
)

app = FastAPI(dependencies=[Depends(get_settings)])

streaming_conversation_chain = StreamingConversationChain(
    openai_api_key=get_settings().openai_api_key
)

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def main():
    return {"message": "Hello World"}

@app.post("/chat", response_class=StreamingResponse)
async def generate_response(data: ChatRequest) -> StreamingResponse:

    return StreamingResponse(
        streaming_conversation_chain.generate_response(
            data.conversation_id, data.message
        ),
        media_type="text/event-stream",
    )


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app)