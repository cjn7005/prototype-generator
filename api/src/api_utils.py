import re
from flask import abort
import psycopg2


def abort500(e: Exception):
	txt = "Something went wrong"
	
	if isinstance(e, psycopg2.errors.Error):
		if t := re.search(r"DETAIL:\s*(?P<detail>.+)",str(e)):
			txt = t.group("detail")
	
	abort(500, description=txt, original_exception=e)