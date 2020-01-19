# This is an simple python-3 based Web Application

In this app we have used the Flask library which allows us to
write micro web apps.And apart from these we also using two more
libraries.
- [MusicBrainz Link](https://www.programmableweb.com/api/musicbrainz).
- [Bit.ly API Link](https://www.programmableweb.com/api/bitly/libraries).

## Installation

- Download python 3.x version and install it.
- Clone the project into user/any of the directory.
- Now create a [Virtual env](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/) inside the root folder.
- update the pip version which is shown the above link.
- Install the two libraries that we are using using pip command.
   - [Flask](https://pypi.org/project/Flask/).
   - [MusicBrainz](https://python-musicbrainzngs.readthedocs.io/en/latest/installation/).
   - [Bit.ly API](https://github.com/bitly/bitly-api-python) or 'pip install git+git://github.com/jimmy927/bitly-api-python'.
- Now open the terminal and run the 'musicapi.py' file like 'py musicapi.py'.
- If the above step got success then you must see a link in the terminal on which port it runs.
- Open any browser select the link which is showed in the terminal and past it in the browser URL section and press enter.
  It show say somethinglinke the 'server is up and running'.

## Usage Guides

We have two Rest Endpoints

- The first one will return the list of artist and albums based on the search paramertes.
  - [Click here to run](http://127.0.0.1:5000/music/linkinpark/meteora/100).
  - Replace the host name and port in case you have changed.
  - replace the path parameters '/music/&lt;string:artist&gt;/&lt;string:album&gt;/&lt;int:limit&gt;'.
- The second one will provide the tiny url of the URL that we need/pass to the server.
  - [Click her to run ](http://127.0.0.1:5000/tiny/).
  - The request type is POST.
  - And the input for this end point is of type JSON.
    - Example {
                 "long_url": "http://127.0.0.1:5000/tiny/"
              } 
