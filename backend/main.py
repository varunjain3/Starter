from fastapi import FastAPI
import qgrs
import tools
import g4hunter

import time
import psycopg2
from psycopg2.extras import RealDictCursor
from database import get_db, engine
import models
import table_data

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

models.Base.metadata.create_all(bind=engine)

origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

while True:
    try:
        conn = psycopg2.connect(host='localhost', database='bioproj', user='postgres', password='password123', cursor_factory=RealDictCursor)
        cursor = conn.cursor()
        print('[Info] Database connection was successful!')
        break
    except Exception as e:
        print(f'[Error] Could not connect to the database \n[Error] {e}\nRetrying...')
        time.sleep(2)

app.include_router(qgrs.router,tags=["QGRS"],)
app.include_router(tools.router,tags=["TOOLS"],)
app.include_router(g4hunter.router,tags=["G4Hunter"],)
app.include_router(table_data.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, debug='true')