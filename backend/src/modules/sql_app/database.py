from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# SQLALCHEMY_DATABASE_URL = "sqlite:///./sql_app.db"
SQLALCHEMY_DATABASE_URL = "postgresql://zyzlrgdp:PGyAv4HLXWxz4RAUn3dK68QMJv4cerOn@kandula.db.elephantsql.com/zyzlrgdp"
engine = create_engine(
    SQLALCHEMY_DATABASE_URL
    )
# engine = create_engine(
    # SQLALCHEMY_DATABASE_URL,
    # connect_args={"check_same_thread": False}
# )
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()