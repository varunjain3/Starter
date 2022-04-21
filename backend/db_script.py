from models import LncCancer
import pandas as pd

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLALCHEMY_DATABASE_URL = ""
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:password123@localhost/bioproj"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


db = SessionLocal()

df = pd.read_csv('colorectal_stripped.csv', header=None)
print(df[5])
df[5] = df[5].astype(int)

for index, row in df.iterrows():
    cur = LncCancer(id=row[0], lncrna_name = row[1], cancer_name = row[2], methods=row[3], expression_pattern=row[4], pubmed_id=row[5], n_transcript_vars=row[6])
    
    print(cur.__dict__)
    db.add(cur)
    db.commit()
