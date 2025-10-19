class AppErrorBaseClass(Exception):
    pass
class ObjectNotFound(AppErrorBaseClass):
    pass
class Error400(AppErrorBaseClass):
    pass