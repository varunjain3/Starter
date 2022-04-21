from ctypes.wintypes import tagRECT
from fastapi import APIRouter, Depends
from typing import List

from database import get_db
from sqlalchemy.orm import Session
import schemas
import models

router = APIRouter(
    prefix='/table_data',
    tags=['table_data']
)

@router.get('/lnccancer', response_model=List[schemas.Lnccancer])
async def get_lnccancer(db: Session = Depends(get_db)):
    lnccancer_data = db.query(models.LncCancer).all()
    return lnccancer_data