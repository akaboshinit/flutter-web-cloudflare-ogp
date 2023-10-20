deploy.all:
	make deploy.flutter
	make deploy.firebase

deploy.flutter:
	flutter build web --web-renderer html

deploy.firebase:
	firebase deploy --only hosting
