POST request with 'raw' data:

1)no file 'tmp.txt':
response status - 200;
response - empty.

2)file 'tmp.txt' exists, empty:
response status - 200;
response - empty.

3)file 'tmp.txt' exists, not empty:
response status - 200;
response - json object.

request method not "POST" - response status '404'.
