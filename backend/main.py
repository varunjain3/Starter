from fastapi import FastAPI
import qgrs
import tools
import g4hunter

app = FastAPI()
app.include_router(qgrs.router,tags=["QGRS"],)
app.include_router(tools.router,tags=["TOOLS"],)
app.include_router(g4hunter.router,tags=["G4Hunter"],)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app)