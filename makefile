clean:
	rm -rf build

build:
	mkdir -p build
	cp -r src/* build/
	jsx --no-cache-dir --es6module build/js build/js -x jsx
	rm build/js/{**/*,*}.jsx
	babel build/js -d build/js -c false
ifneq ("$(uglify)", "false")
	recursive-uglifyjs build/js
endif
	webpack build/js/main.js build/js/main.js
