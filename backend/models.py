from sqlalchemy import Column, Integer, String, ForeignKey
from database import Base

class LncCancer(Base):
    __tablename__ = "lnccancer"

    id = Column(Integer, primary_key = True, nullable=False)
    lncrna_name = Column(String, nullable=False)
    cancer_name = Column(String, nullable=False)
    methods = Column(String, nullable=False)
    expression_pattern = Column(String, nullable=False)
    pubmed_id = Column(String, nullable=False)
    n_transcript_vars = Column(String, nullable=False)