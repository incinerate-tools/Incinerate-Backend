# Incinerate

### Hidden Service URL:
3mghupyalwu7gub3ncpe3tcynf54y2bliylnh6gbslrlib4liwsqlgyd.onion


### Docker run command:
docker run -d -v file-storage:/filestorage -p 443:443 -p 80:80 --name incinerate NAME

### Frontend:
https://github.com/incinerate-tools/Incinerate-Frontend

### Details:

The backend of Incinerate uses mat2 for metadata stripping which is the recommended metadata stripping tool by the Tor Project people, and comes preinstalled on Tails OS, so it is one of the best tools for metadata stripping out there. Once stripped the file will be stored on the server for maximum of 3 minutes, and can be downloaded at any time within those 3 minutes. But as soon as the file is downloaded it will be deleted regardless of whether the 3 minutes are up or not to provide maximum privacy.
