# stackoverflow-fanatic

Command for visit Stack Overflow:

```
$ docker run \
	-e EMAIL=inbox@example.com \
	-e PASSWORD=12345678 \
	-e CUSTOM_URLS=https://ru.stackoverflow.com \
	maximzasorin/stackoverflow-fanatic \
	npm start
```

You can add it to crontab with desired frequency.