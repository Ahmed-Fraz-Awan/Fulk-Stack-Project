from fastapi import APIRouter
from ..schemas.predictions import ChatInput, ChatOutput
from ..services.assistant import reply_for

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("/assistant", response_model=ChatOutput)
def assistant(inp: ChatInput):
    return ChatOutput(reply=reply_for(inp.message))
