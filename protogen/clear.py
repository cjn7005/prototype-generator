import argparse
import json
import os
import subprocess

from database.src import db_utils

HERE = os.path.dirname(__file__)

IGNORED_FILES = ["db_utils.py","test_utils.py",".ignoreme"]

def remove(file_path, rf = False):
    """
    Removes the file at file_path

    Args:
        file_path (str): the file path
        rf (bool, optional): the file path is a directory. Defaults to False.
    """
    try: # MacOS
        if rf:
            subprocess.run(["rm","-rf",file_path])
        else:
            subprocess.run(["rm",file_path])
    except Exception: # Windows
        if rf:
            subprocess.run(["rd","/s","/q",file_path.replace("/","\\")],shell=True)
        else:
            subprocess.run(["del",file_path.replace("/","\\")],shell=True)


def main(model_path: str):
    dirs = ["api","database"]
    subdirs = ["src","tests"]
    with open(model_path,"r") as f:
        modules = json.load(f)

    # SQL tables
    sql = "DROP TABLE IF EXISTS "
    for i,module in enumerate(modules):
        sql += module
        if i < len(modules)-1: sql += ", "
    db_utils.exec_commit(sql)

    # DB + API
    gen = ((direct, subdir) for direct in dirs for subdir in subdirs)
    for (direct, subdir) in gen:
        for file in os.listdir(os.path.join(HERE,f"../{direct}/{subdir}")):
            if file in IGNORED_FILES: continue
            
            full_path = os.path.join(HERE, f'../{direct}/{subdir}/{file}')
            remove(full_path, file == "__pycache__")
    
    # Schema files
    for file in os.listdir("database/schema"):
        if file == ".ignoreme": continue
        full_path = os.path.join(HERE, f'../database/schema/{file}')
        remove(full_path)

    # Server
    full_path = os.path.join(HERE, '../api/server.py')
    remove(full_path)

    # Frontend modules
    full_path = os.path.join(HERE, '../frontend/src/components/Modules.jsx')
    remove(full_path)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--file","-f",default="protogen/models.json",help="Input models file")
    args = parser.parse_args()

    print("Are you sure you want to delete all files in database/ and api/ (y/n)?")
    put = input()
    if put == "y":
        main(os.path.join(HERE,"../",args.file))
