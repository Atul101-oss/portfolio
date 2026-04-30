import hashlib

def getHashofFile(file):
    print(file)
    hash_md5 = hashlib.md5()
    for chunk in iter(lambda: file.read(4096), b""):
        hash_md5.update(chunk)
    return hash_md5.hexdigest()

def getHashofString(string):
    hash_md5 = hashlib.md5()
    hash_md5.update(string.encode('utf-8'))
    return hash_md5.hexdigest()