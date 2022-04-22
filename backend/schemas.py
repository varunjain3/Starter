from pydantic import BaseModel
from typing import Optional

class Lnccancer(BaseModel):
    id: int
    lncrna_name: str
    cancer_name: str
    methods: str
    expression_pattern: str
    pubmed_id: str
    n_transcript_vars: str

    class Config:
        orm_mode = True

class Qgrsdata(BaseModel):
    id: int
    lncrna_name: str
    n_transcript_vars: str
    ncbi_ref_id: str
    n2g: str
    n3g: str
    n4g: str

    class Config:
        orm_mode = True