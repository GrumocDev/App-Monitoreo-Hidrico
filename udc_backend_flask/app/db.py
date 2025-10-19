from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class BaseModelMixin:
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        """
        docstring
        """
        db.session.delete(self)
        db.session.commit()

    @classmethod
    def get_all(cls):
        """
        docstring
        """
        return cls.query.all()
    
    @classmethod
    def get_by_id(cls,id):
        """
        docstring
        """
        return cls.query.get(id)
    
    @classmethod
    def simple_filter(cls,**kwargs):
        """
        docstring
        """
        return cls.query.filter_by(**kwargs).all()
    
    @classmethod
    def simple_filter_first(cls,**kwargs):
        """
        docstring
        """
        return cls.query.filter_by(**kwargs).first()