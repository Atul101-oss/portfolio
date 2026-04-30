from pathlib import Path
from hashGenerator import getHashofFile
# current_dir = Path(__file__).resolve().parent
# print(current_dir)

def signDigitally(file):
    fileHash = getHashofFile(file)
    


if __name__ == "__main__":
    file = "2652.jpg"
    print(getHashofFile(file))
    