https://persistenceiskey.herokuapp.com/api/neymar

# persistence-is-key
Deploy a script that when a get request is made to "api/something", where something is a placeholder for a word, a file(text file/json file) is created and and the word represented by something is added to the list. if the endpoint is accessed again in a similar manner, the new word is added to the file.  If the get request is made to "api/list", an array containing every word that has been added to that file is converted to a string and sent as a response with the appropriate header.  If the get request is made to "api/delete" let the contents of the file be deleted. 
